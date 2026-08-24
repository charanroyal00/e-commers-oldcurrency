import { apiService, ApiError, type LoginResponse, type User } from './api'
import { API_CONFIG } from '../config/api'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
  phone?: string
  role: 'admin' | 'seller' | 'customer'
}

// Authentication Service
class AuthService {
  
  // Login user
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await apiService.post<LoginResponse>('/login/', {
        email: credentials.email,
        password: credentials.password,
      })

      // Store tokens
      if (response.access) {
        apiService.setToken(response.access)
        localStorage.setItem(API_CONFIG.REFRESH_TOKEN_KEY, response.refresh)
      }

      return response
    } catch (error) {
      if (error instanceof ApiError) {
        // Extract detailed error message from backend
        const errorMessage = error.response?.detail 
          || error.response?.email?.[0]
          || error.response?.password?.[0]
          || error.response?.non_field_errors?.[0]
          || error.message 
          || 'Login failed'
        
        throw new ApiError(errorMessage, error.status, error.response)
      }
      throw new ApiError('Network error. Please check your connection.', 500, error)
    }
  }

  // Register user
  async register(data: RegisterData): Promise<User> {
    try {
      const response = await apiService.post<User>('/register/', data)
      return response
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError('Registration failed', 500, error)
    }
  }

  // Logout user
  logout(): void {
    apiService.clearToken()
    // Optionally call backend logout endpoint if available
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem(API_CONFIG.TOKEN_KEY)
  }

  // Get current user from token (you may want to decode JWT or call API)
  getCurrentUser(): User | null {
    // For now, return null - you can implement JWT decoding or call user info API
    return null
  }

  // Refresh token
  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem(API_CONFIG.REFRESH_TOKEN_KEY)
    if (!refreshToken) {
      throw new ApiError('No refresh token available', 401)
    }

    try {
      const response = await apiService.post<{ access: string }>('/token/refresh/', {
        refresh: refreshToken,
      })

      apiService.setToken(response.access)
      return response.access
    } catch (error) {
      // If refresh fails, logout user
      this.logout()
      throw error
    }
  }
}

// Export singleton instance
export const authService = new AuthService()