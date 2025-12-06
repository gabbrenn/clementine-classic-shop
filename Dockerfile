# syntax=docker/dockerfile:1.6

# ----- Build stage --------------------------------------------------------
FROM node:20.11.1-alpine AS builder
WORKDIR /app

# Install root dependencies (for shared tooling like concurrently)
COPY package.json package-lock.json ./
RUN npm install

# Install backend dependencies
COPY backend/package*.json backend/
RUN cd backend && npm install

# Install frontend dependencies
COPY frontend/package*.json frontend/
RUN cd frontend && npm install

# Copy source
COPY backend backend
COPY frontend frontend

# Build frontend (Next.js)
RUN cd frontend && npm run build

# Build backend (TypeScript -> dist)
RUN cd backend && npm run build

# ----- Runtime stage ------------------------------------------------------
FROM node:20.11.1-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000

# Copy root runtime deps
COPY --from=builder /app/node_modules ./node_modules
COPY package.json package-lock.json ./

# Copy backend runtime files
COPY --from=builder /app/backend/node_modules ./backend/node_modules
COPY backend/package.json backend/package-lock.json ./backend/
COPY --from=builder /app/backend/dist ./backend/dist
COPY backend/prisma ./backend/prisma

# Copy frontend built output and assets
COPY --from=builder /app/frontend/.next ./frontend/.next
COPY frontend/package.json frontend/package-lock.json ./frontend/
COPY frontend/public ./frontend/public

CMD ["node", "backend/dist/server.js"]
