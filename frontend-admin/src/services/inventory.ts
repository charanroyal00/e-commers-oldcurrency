import { apiService, ApiError } from './api'
import { Product } from './products'

export interface InventoryItem {
  id: number
  product: Product
  quantity: number
  reserved_quantity: number
  available_quantity: number
  low_stock_threshold: number
  is_low_stock: boolean
  last_updated: string
}

export interface InventoryStats {
  total_products: number
  low_stock_count: number
  out_of_stock_count: number
  total_inventory_value: number
}

export interface StockMovement {
  id: number
  product: number
  movement_type: 'in' | 'out' | 'adjustment'
  quantity: number
  reason: string
  created_at: string
}

// Inventory Service
class InventoryService {
  
  // Get inventory items
  async getInventory(params?: {
    page?: number
    limit?: number
    low_stock_only?: boolean
    out_of_stock_only?: boolean
    seller?: number
  }): Promise<{ results: InventoryItem[], count: number }> {
    try {
      const searchParams = new URLSearchParams()
      if (params?.page) searchParams.set('page', params.page.toString())
      if (params?.limit) searchParams.set('limit', params.limit.toString())
      if (params?.low_stock_only) searchParams.set('low_stock', 'true')
      if (params?.out_of_stock_only) searchParams.set('out_of_stock', 'true')
      if (params?.seller) searchParams.set('seller', params.seller.toString())

      const queryString = searchParams.toString()
      const endpoint = queryString ? `/inventory/?${queryString}` : '/inventory/'
      
      return await apiService.get<{ results: InventoryItem[], count: number }>(endpoint)
    } catch (error) {
      throw new ApiError('Failed to fetch inventory', 500, error)
    }
  }

  // Get inventory statistics
  async getInventoryStats(): Promise<InventoryStats> {
    try {
      return await apiService.get<InventoryStats>('/inventory/stats/')
    } catch (error) {
      throw new ApiError('Failed to fetch inventory statistics', 500, error)
    }
  }

  // Update stock quantity
  async updateStock(productId: number, data: {
    quantity?: number
    low_stock_threshold?: number
    movement_type?: 'in' | 'out' | 'adjustment'
    reason?: string
  }): Promise<InventoryItem> {
    try {
      return await apiService.patch<InventoryItem>(`/inventory/${productId}/`, data)
    } catch (error) {
      throw new ApiError('Failed to update stock', 500, error)
    }
  }

  // Add stock
  async addStock(productId: number, quantity: number, reason: string = 'Stock replenishment'): Promise<InventoryItem> {
    try {
      return await apiService.patch<InventoryItem>(`/inventory/${productId}/add/`, {
        quantity,
        reason
      })
    } catch (error) {
      throw new ApiError('Failed to add stock', 500, error)
    }
  }

  // Remove stock
  async removeStock(productId: number, quantity: number, reason: string = 'Stock reduction'): Promise<InventoryItem> {
    try {
      return await apiService.patch<InventoryItem>(`/inventory/${productId}/remove/`, {
        quantity,
        reason
      })
    } catch (error) {
      throw new ApiError('Failed to remove stock', 500, error)
    }
  }

  // Get stock movements
  async getStockMovements(productId?: number, params?: {
    page?: number
    limit?: number
    movement_type?: 'in' | 'out' | 'adjustment'
  }): Promise<{ results: StockMovement[], count: number }> {
    try {
      const searchParams = new URLSearchParams()
      if (productId) searchParams.set('product', productId.toString())
      if (params?.page) searchParams.set('page', params.page.toString())
      if (params?.limit) searchParams.set('limit', params.limit.toString())
      if (params?.movement_type) searchParams.set('movement_type', params.movement_type)

      const queryString = searchParams.toString()
      const endpoint = queryString ? `/inventory/movements/?${queryString}` : '/inventory/movements/'
      
      return await apiService.get<{ results: StockMovement[], count: number }>(endpoint)
    } catch (error) {
      throw new ApiError('Failed to fetch stock movements', 500, error)
    }
  }

  // Bulk stock update
  async bulkUpdateStock(updates: Array<{
    product_id: number
    quantity: number
    movement_type: 'in' | 'out' | 'adjustment'
    reason?: string
  }>): Promise<{ success: number, errors: any[] }> {
    try {
      return await apiService.post<{ success: number, errors: any[] }>('/inventory/bulk-update/', {
        updates
      })
    } catch (error) {
      throw new ApiError('Failed to bulk update stock', 500, error)
    }
  }
}

// Export singleton instance
export const inventoryService = new InventoryService()