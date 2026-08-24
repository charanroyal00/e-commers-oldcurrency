import { apiService, ApiError } from './api'

export interface Order {
  id: number
  order_number: string
  customer: {
    id: number
    username: string
    email: string
  }
  items: OrderItem[]
  status: 'placed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total_amount: number
  shipping_address: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: number
  product: {
    id: number
    name: string
    price: number
    images: string[]
  }
  quantity: number
  price: number
  subtotal: number
}

// Orders Service
class OrdersService {
  
  // Get all orders
  async getOrders(params?: {
    page?: number
    limit?: number
    status?: string
    customer?: number
    date_from?: string
    date_to?: string
  }): Promise<{ results: Order[], count: number }> {
    try {
      const searchParams = new URLSearchParams()
      if (params?.page) searchParams.set('page', params.page.toString())
      if (params?.limit) searchParams.set('limit', params.limit.toString())
      if (params?.status) searchParams.set('status', params.status)
      if (params?.customer) searchParams.set('customer', params.customer.toString())
      if (params?.date_from) searchParams.set('date_from', params.date_from)
      if (params?.date_to) searchParams.set('date_to', params.date_to)

      const queryString = searchParams.toString()
      const endpoint = queryString ? `/orders/?${queryString}` : '/orders/'
      
      return await apiService.get<{ results: Order[], count: number }>(endpoint)
    } catch (error) {
      throw new ApiError('Failed to fetch orders', 500, error)
    }
  }

  // Get single order
  async getOrder(id: number): Promise<Order> {
    try {
      return await apiService.get<Order>(`/orders/${id}/`)
    } catch (error) {
      throw new ApiError('Failed to fetch order', 500, error)
    }
  }

  // Update order status
  async updateOrderStatus(id: number, status: Order['status']): Promise<Order> {
    try {
      return await apiService.patch<Order>(`/orders/${id}/`, { status })
    } catch (error) {
      throw new ApiError('Failed to update order status', 500, error)
    }
  }

  // Cancel order
  async cancelOrder(id: number, reason?: string): Promise<Order> {
    try {
      return await apiService.patch<Order>(`/orders/${id}/cancel/`, { reason })
    } catch (error) {
      throw new ApiError('Failed to cancel order', 500, error)
    }
  }

  // Get orders by seller
  async getSellerOrders(sellerId: number, params?: {
    page?: number
    limit?: number
    status?: string
  }): Promise<{ results: Order[], count: number }> {
    try {
      const searchParams = new URLSearchParams()
      searchParams.set('seller', sellerId.toString())
      if (params?.page) searchParams.set('page', params.page.toString())
      if (params?.limit) searchParams.set('limit', params.limit.toString())
      if (params?.status) searchParams.set('status', params.status)

      const queryString = searchParams.toString()
      const endpoint = `/orders/?${queryString}`
      
      return await apiService.get<{ results: Order[], count: number }>(endpoint)
    } catch (error) {
      throw new ApiError('Failed to fetch seller orders', 500, error)
    }
  }
}

// Export singleton instance
export const ordersService = new OrdersService()