// API Response Types

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Product Types

export interface ProductFilter {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  tags?: string[];
  search?: string;
  isFeatured?: boolean;
  isActive?: boolean;
}

export interface ProductSort {
  field: 'createdAt' | 'price' | 'name';
  order: 'asc' | 'desc';
}

// Order Types

export interface CreateOrderDto {
  addressId: string;
  items: Array<{
    productId: string;
    quantity: number;
    size?: string;
    color?: string;
  }>;
  paymentMethod: string;
  notes?: string;
}

// User Types

export interface RegisterDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}
