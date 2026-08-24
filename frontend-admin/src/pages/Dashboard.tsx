import { useState, useEffect } from 'react'
import { DollarSign, Package, ShoppingCart, Store, Loader2 } from 'lucide-react'
import { ordersService, productsService, ApiError } from '../services'

interface StatCardProps {
  title: string
  value: string
  icon: React.ElementType
  isLoading?: boolean
}

const StatCard = ({ title, value, icon: Icon, isLoading = false }: StatCardProps) => (
  <div className="rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
    <div className="flex items-start justify-between">
      <div>
        <p className="font-sans text-xs font-medium uppercase tracking-widest text-ink-500">
          {title}
        </p>
        {isLoading ? (
          <div className="mt-3 flex items-center">
            <Loader2 className="h-6 w-6 animate-spin text-gold-600" />
          </div>
        ) : (
          <p className="mt-3 font-serif text-4xl font-bold text-ink-900">{value}</p>
        )}
      </div>
      <div className="rounded-full border-2 border-gold-400 bg-gold-500/10 p-3">
        <Icon className="h-6 w-6 text-gold-600" aria-hidden="true" />
      </div>
    </div>
    {/* Decorative bottom bar */}
    <div className="mt-6 h-px bg-cream-300" />
    <p className="mt-3 font-sans text-xs text-ink-400">
      {isLoading ? 'Loading...' : 'Live marketplace data'}
    </p>
  </div>
)

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lowStock: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch data - silent error handling
      const [ordersResponse, productsResponse] = await Promise.all([
        ordersService.getOrders({ limit: 100 }).catch(() => null),
        productsService.getProducts({ limit: 100 }).catch(() => null)
      ])

      // Calculate stats from fetched data
      const orders = ordersResponse?.results || []
      const products = productsResponse?.results || []

      const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0)
      const lowStock = products.filter(p => p.stock < 10).length

      setStats({
        totalProducts: productsResponse?.count || 0,
        totalOrders: ordersResponse?.count || 0,
        totalRevenue: totalRevenue,
        lowStock: lowStock
      })
    } catch (error) {
      // Complete silence - no error messages at all
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      {/* Page heading */}
      <div className="mb-8">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-gold-600">
          Overview
        </p>
        <h1 className="mt-1 font-serif text-3xl font-bold text-ink-900">Dashboard</h1>
        <p className="mt-2 font-sans text-sm text-ink-500">
          Welcome back. Here's the current state of your marketplace.
        </p>
      </div>

      {/* Decorative divider */}
      <div className="mb-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-cream-300" />
        <span className="font-serif text-xs italic text-ink-400">The Archive Awaits</span>
        <div className="h-px flex-1 bg-cream-300" />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Revenue" 
          value={`₹${stats.totalRevenue.toLocaleString()}`} 
          icon={DollarSign} 
          isLoading={loading} 
        />
        <StatCard 
          title="Total Products" 
          value={stats.totalProducts.toString()} 
          icon={Package} 
          isLoading={loading} 
        />
        <StatCard 
          title="Total Orders" 
          value={stats.totalOrders.toString()} 
          icon={ShoppingCart} 
          isLoading={loading} 
        />
        <StatCard 
          title="Low Stock Items" 
          value={stats.lowStock.toString()} 
          icon={Store} 
          isLoading={loading} 
        />
      </div>

      {/* Recent Activity */}
      <div className="mt-8 rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-ink-900">Recent Activity</h2>
          <span className="font-sans text-xs text-ink-400 uppercase tracking-widest">Live Feed</span>
        </div>
        <div className="h-px bg-cream-300" />
        <div className="flex flex-col items-center justify-center py-12">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-cream-300 bg-cream-200">
            <Package className="h-7 w-7 text-ink-400" aria-hidden="true" />
          </div>
          <p className="font-serif text-base text-ink-600">No activity yet</p>
          <p className="mt-1 font-sans text-sm text-ink-400">
            Data will appear here once the marketplace is live.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
