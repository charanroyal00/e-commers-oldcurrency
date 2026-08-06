// Export all services
export { apiService, ApiError } from './api'
export { authService } from './auth'
export { productsService } from './products'
export { ordersService } from './orders'
export { inventoryService } from './inventory'

// Export types
export type { 
  ApiResponse, 
  User, 
  AuthTokens, 
  LoginResponse 
} from './api'

export type {
  LoginCredentials,
  RegisterData
} from './auth'

export type {
  Product,
  Category,
  CreateProductData,
  UpdateProductData
} from './products'

export type {
  Order,
  OrderItem,
  OrderStats
} from './orders'

export type {
  InventoryItem,
  InventoryStats,
  StockMovement
} from './inventory'