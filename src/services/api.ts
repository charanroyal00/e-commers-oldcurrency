// API client for communicating with Django backend (/api/)

const API_BASE = '/api'

export interface LoginPayload {
  username?: string
  email?: string
  password: string
}

export interface RegisterPayload {
  username: string
  email: string
  password: string
  role?: string
}

export const getAuthToken = (): string | null => {
  return localStorage.getItem('access_token')
}

export const setAuthTokens = (access: string, refresh?: string) => {
  localStorage.setItem('access_token', access)
  if (refresh) {
    localStorage.setItem('refresh_token', refresh)
  }
}

export const clearAuthTokens = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken()
  const isFormData = options.body instanceof FormData
  const headers: Record<string, string> = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers as Record<string, string>),
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const errorMessage =
      errorData.detail ||
      errorData.message ||
      Object.values(errorData).flat().join(', ') ||
      `Request failed with status ${response.status}`
    throw new Error(errorMessage)
  }

  return response.json()
}

export const authAPI = {
  login: async (credentials: LoginPayload) => {
    const data = await apiRequest<{ access: string; refresh: string }>('/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
    setAuthTokens(data.access, data.refresh)
    return data
  },

  register: async (user: RegisterPayload) => {
    return await apiRequest('/register/', {
      method: 'POST',
      body: JSON.stringify(user),
    })
  },
}

export const categoriesAPI = {
  list: async () => apiRequest('/categories/'),
  get: async (id: number) => apiRequest(`/categories/${id}/`),
}

export const productsAPI = {
  list: async (params?: { category?: string; search?: string }) => {
    const query = new URLSearchParams()
    if (params?.category) query.append('category', params.category)
    if (params?.search) query.append('search', params.search)
    const queryString = query.toString()
    return apiRequest(`/products/${queryString ? `?${queryString}` : ''}`)
  },
  get: async (id: number | string) => apiRequest(`/products/${id}/`),
  create: async (data: FormData) => apiRequest('/products/', {
    method: 'POST',
    body: data,
  }),
  update: async (id: number | string, data: FormData) => apiRequest(`/products/${id}/`, {
    method: 'PUT',
    body: data,
  }),
  delete: async (id: number | string) => apiRequest(`/products/${id}/`, {
    method: 'DELETE',
  }),
}

export const ordersAPI = {
  list: async () => apiRequest('/orders/'),
  get: async (id: number | string) => apiRequest(`/orders/${id}/`),
  create: async (data: any) => apiRequest('/orders/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateStatus: async (id: number | string, status: string) => apiRequest(`/orders/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  }),
}
