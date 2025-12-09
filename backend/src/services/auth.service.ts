import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { PrismaClient, User, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  private static readonly ACCESS_TOKEN_SECRET: string = process.env.JWT_SECRET || 'your-secret-key';
  private static readonly REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret';
  private static readonly ACCESS_TOKEN_EXPIRY: string = process.env.JWT_EXPIRES_IN || '15m';
  private static readonly REFRESH_TOKEN_EXPIRY: string = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

  /**
   * Hash password using bcrypt
   */
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Compare password with hashed password
   */
  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  /**
   * Generate access token
   */
  static generateAccessToken(payload: TokenPayload): string {
    const options: SignOptions = {
      expiresIn: this.ACCESS_TOKEN_EXPIRY as any,
    };
    return jwt.sign(payload, this.ACCESS_TOKEN_SECRET, options);
  }

  /**
   * Generate refresh token
   */
  static generateRefreshToken(payload: TokenPayload): string {
    const options: SignOptions = {
      expiresIn: this.REFRESH_TOKEN_EXPIRY as any,
    };
    return jwt.sign(payload, this.REFRESH_TOKEN_SECRET, options);
  }

  /**
   * Verify access token
   */
  static verifyAccessToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, this.ACCESS_TOKEN_SECRET) as TokenPayload;
    } catch (error) {
      throw new Error('Invalid or expired access token');
    }
  }

  /**
   * Verify refresh token
   */
  static verifyRefreshToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, this.REFRESH_TOKEN_SECRET) as TokenPayload;
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  /**
   * Generate both access and refresh tokens
   */
  static async generateTokens(user: User): Promise<AuthTokens> {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    // Calculate expiry date for refresh token
    const expiresAt = new Date();
    const expiryDays = this.REFRESH_TOKEN_EXPIRY.includes('d')
      ? parseInt(this.REFRESH_TOKEN_EXPIRY)
      : 7;
    expiresAt.setDate(expiresAt.getDate() + expiryDays);

    // Store refresh token in database
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt,
      },
    });

    return { accessToken, refreshToken };
  }

  /**
   * Rotate refresh token (invalidate old, generate new)
   */
  static async rotateRefreshToken(oldToken: string): Promise<AuthTokens> {
    // Verify the old refresh token
    const payload = this.verifyRefreshToken(oldToken);

    // Check if token exists and is not revoked
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: oldToken },
      include: { user: true },
    });

    if (!storedToken || storedToken.isRevoked) {
      throw new Error('Invalid refresh token');
    }

    if (new Date() > storedToken.expiresAt) {
      throw new Error('Refresh token expired');
    }

    // Revoke old token
    await prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { isRevoked: true },
    });

    // Generate new tokens
    return this.generateTokens(storedToken.user);
  }

  /**
   * Revoke all refresh tokens for a user (logout from all devices)
   */
  static async revokeAllUserTokens(userId: string): Promise<void> {
    await prisma.refreshToken.updateMany({
      where: {
        userId,
        isRevoked: false,
      },
      data: {
        isRevoked: true,
      },
    });
  }

  /**
   * Revoke a specific refresh token
   */
  static async revokeToken(token: string): Promise<void> {
    await prisma.refreshToken.updateMany({
      where: { token },
      data: { isRevoked: true },
    });
  }

  /**
   * Clean up expired tokens (can be run as a cron job)
   */
  static async cleanupExpiredTokens(): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: {
        OR: [
          { expiresAt: { lt: new Date() } },
          { isRevoked: true },
        ],
      },
    });
  }

  /**
   * Register a new user
   */
  static async register(data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    role?: UserRole;
  }): Promise<{ user: Omit<User, 'password'>; tokens: AuthTokens }> {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await this.hashPassword(data.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        role: data.role || UserRole.CUSTOMER,
      },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, tokens };
  }

  /**
   * Login user
   */
  static async login(
    email: string,
    password: string
  ): Promise<{ user: Omit<User, 'password'>; tokens: AuthTokens }> {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isValidPassword = await this.comparePassword(password, user.password);

    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, tokens };
  }

  /**
   * Get user by ID
   */
  static async getUserById(userId: string): Promise<Omit<User, 'password'> | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return null;
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Update user profile
   */
  static async updateProfile(
    userId: string,
    data: {
      firstName?: string;
      lastName?: string;
      phone?: string;
      avatar?: string;
    }
  ): Promise<Omit<User, 'password'>> {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Change password
   */
  static async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Verify old password
    const isValidPassword = await this.comparePassword(oldPassword, user.password);

    if (!isValidPassword) {
      throw new Error('Invalid old password');
    }

    // Hash new password
    const hashedPassword = await this.hashPassword(newPassword);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    // Revoke all refresh tokens (force re-login on all devices)
    await this.revokeAllUserTokens(userId);
  }
}
