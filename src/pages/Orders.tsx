import { useState, useEffect } from 'react'
import { ShoppingCart, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ordersService, ApiError, type Order } from '../services'
import PageHeader from '../components/ui/PageHeader'
import StatusBadge from '../components/ui/StatusBadge'

const Orders = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({
    total_orders: 0,
    pending_orders: 0,
    completed_orders: 0,
    total_revenue: 0,
    monthly_revenue: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const ordersResponse = await ordersService.getOrders()
      const orders = ordersResponse.results || []
      
      setOrders(orders)
      
      // Calculate stats from orders
      const totalOrders = orders.length
      const pendingOrders = orders.filter(o => o.status === 'placed' || o.status === 'processing').length
      const completedOrders = orders.filter(o => o.status === 'delivered').length
      const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0)
      const thisMonth = new Date().getMonth()
      const monthlyRevenue = orders
        .filter(o => new Date(o.created_at).getMonth() === thisMonth)
        .reduce((sum, order) => sum + order.total_amount, 0)
      
      setStats({
        total_orders: totalOrders,
        pending_orders: pendingOrders,
        completed_orders: completedOrders,
        total_revenue: totalRevenue,
        monthly_revenue: monthlyRevenue
      })
    } catch (error) {
      // Silent error handling - no messages shown
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader category="Transactions" title="Order Management"
        description="View and manage all customer orders." />

      {/* Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Orders',    value: stats.total_orders.toString() },
          { label: 'Processing',      value: stats.pending_orders.toString() },
          { label: 'Completed',       value: stats.completed_orders.toString() },
          { label: 'Revenue',         value: `₹${stats.total_revenue.toLocaleString()}` },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border-2 border-cream-300 bg-white p-4 shadow-md text-center">
            <p className="font-sans text-xs uppercase tracking-widest text-ink-500">{s.label}</p>
            <p className="mt-1 font-serif text-3xl font-bold text-ink-900">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border-2 border-cream-300 bg-white shadow-md">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-gold-600 mb-4" />
            <p className="font-sans text-sm text-ink-500">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-cream-300 bg-cream-100">
              <ShoppingCart className="h-7 w-7 text-ink-400" />
            </div>
            <p className="font-serif text-base text-ink-600">No orders yet</p>
            <p className="mt-1 font-sans text-sm text-ink-400">Orders will appear here once customers start buying.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-cream-300 bg-cream-50">
                  {['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Date', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-sans text-xs font-semibold uppercase tracking-widest text-ink-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-cream-50">
                    <td className="px-4 py-3 font-sans text-sm font-medium text-gold-700">#{o.order_number}</td>
                    <td className="px-4 py-3 font-sans text-sm text-ink-800">{o.customer.username}</td>
                    <td className="px-4 py-3 font-sans text-sm text-ink-600">
                      {o.items.length > 1 ? `${o.items.length} items` : o.items[0]?.product.name || 'N/A'}
                    </td>
                    <td className="px-4 py-3 font-sans text-sm font-semibold text-ink-900">₹{o.total_amount.toLocaleString()}</td>
                    <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                    <td className="px-4 py-3 font-sans text-sm text-ink-500">
                      {new Date(o.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => navigate(`/orders/${o.id}`)}
                        className="rounded-lg border border-cream-300 px-3 py-1.5 font-sans text-xs text-ink-700 hover:bg-cream-100">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
