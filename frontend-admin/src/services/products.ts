import { apiService, ApiError } from './api'

export interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  images: string[]
  stock: number
  status: 'active' | 'inactive' | 'out_of_stock'
  seller: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  description?: string
  products_count?: number
}

export interface CreateProductData {
  name: string
  description: string
  price: number
  category: string
  stock: number
  images?: File[]
}

export interface UpdateProductData extends Partial<CreateProductData> {
  status?: 'active' | 'inactive'
}

// Products Service
class ProductsService {
  
  // Get all products
  async getProducts(params?: {
    page?: number
    limit?: number
    category?: string
    seller?: number
    status?: string
  }): Promise<{ results: Product[], count: number }> {
    try {
      const searchParams = new URLSearchParams()
      if (params?.page) searchParams.set('page', params.page.toString())
      if (params?.limit) searchParams.set('limit', params.limit.toString())
      if (params?.category) searchParams.set('category', params.category)
      if (params?.seller) searchParams.set('seller', params.seller.toString())
      if (params?.status) searchParams.set('status', params.status)

      const queryString = searchParams.toString()
      const endpoint = queryString ? `/products/?${queryString}` : '/products/'
      
      return await apiService.get<{ results: Product[], count: number }>(endpoint)
    } catch (error) {
      throw new ApiError('Failed to fetch products', 500, error)
    }
  }

  // Get single product
  async getProduct(id: number): Promise<Product> {
    try {
      return await apiService.get<Product>(`/products/${id}/`)
    } catch (error) {
      throw new ApiError('Failed to fetch product', 500, error)
    }
  }

  // Create product
  async createProduct(data: CreateProductData): Promise<Product> {
    try {
      if (data.images && data.images.length > 0) {
        // Handle file upload
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('price', data.price.toString())
        formData.append('category', data.category)
        formData.append('stock', data.stock.toString())
        
        data.images.forEach((file, index) => {
          formData.append(`images[${index}]`, file)
        })

        return await apiService.uploadFile<Product>('/products/', formData)
      } else {
        // Regular JSON post
        const { images, ...productData } = data
        return await apiService.post<Product>('/products/', productData)
      }
    } catch (error) {
      throw new ApiError('Failed to create product', 500, error)
    }
  }

  // Update product
  async updateProduct(id: number, data: UpdateProductData): Promise<Product> {
    try {
      if (data.images && data.images.length > 0) {
        // Handle file upload
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
          if (key !== 'images') {
            formData.append(key, value.toString())
          }
        })
        
        data.images.forEach((file, index) => {
          formData.append(`images[${index}]`, file)
        })

        return await apiService.uploadFile<Product>(`/products/${id}/`, formData)
      } else {
        // Regular JSON patch
        const { images, ...productData } = data
        return await apiService.patch<Product>(`/products/${id}/`, productData)
      }
    } catch (error) {
      throw new ApiError('Failed to update product', 500, error)
    }
  }

  // Delete product
  async deleteProduct(id: number): Promise<void> {
    try {
      await apiService.delete(`/products/${id}/`)
    } catch (error) {
      throw new ApiError('Failed to delete product', 500, error)
    }
  }

  // Get categories
  async getCategories(): Promise<Category[]> {
    try {
      return await apiService.get<Category[]>('/categories/')
    } catch (error) {
      throw new ApiError('Failed to fetch categories', 500, error)
    }
  }

  // Create category
  async createCategory(data: { name: string; description?: string }): Promise<Category> {
    try {
      return await apiService.post<Category>('/categories/', data)
    } catch (error) {
      throw new ApiError('Failed to create category', 500, error)
    }
  }

  // Update category
  async updateCategory(id: number, data: { name?: string; description?: string }): Promise<Category> {
    try {
      return await apiService.patch<Category>(`/categories/${id}/`, data)
    } catch (error) {
      throw new ApiError('Failed to update category', 500, error)
    }
  }

  // Delete category
  async deleteCategory(id: number): Promise<void> {
    try {
      await apiService.delete(`/categories/${id}/`)
    } catch (error) {
      throw new ApiError('Failed to delete category', 500, error)
    }
  }
}

// Export singleton instance
export const productsService = new ProductsService()