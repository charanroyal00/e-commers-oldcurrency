import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Package, User, MapPin, CreditCard, Loader2 } from 'lucide-react'
import { ordersService, ApiError, type Order } from '../services'
import PageHeader from '../components/ui/PageHeader'
import StatusBadge from '../components/ui/StatusBadge'

type OrderStatus = 'placed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

const STATUS_STEPS: OrderStatus[] = ['placed', 'processing', 'shipped', 'delivered']

const ic =
  'w-full rounded-lg border border-cream-300 bg-cream-100 py-2.5 px-3 font-sans text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-500/40'

const OrderDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      loadOrder(parseInt(id))
    }
  }, [id])

  const loadOrder = async (orderId: number) => {
    try {
      setLoading(true)
      const orderData = await ordersService.getOrder(orderId)
      setOrder(orderData)
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message)
      } else {
        setError('Failed to load order')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (newStatus: string) => {
    if (!order) return
    
    try {
      setUpdating(true)
      const updatedOrder = await ordersService.updateOrderStatus(
        order.id, 
        newStatus as Order['status']
      )
      setOrder(updatedOrder)
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message)
      } else {
        setError('Failed to update order status')
      }
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-gold-600 mb-4" />
        <p className="font-sans text-sm text-ink-500">Loading order details...</p>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="mb-4 rounded-lg border border-red-400/20 bg-red-400/10 p-4">
          <p className="font-sans text-sm text-red-600" role="alert">
            {error || 'Order not found'}
          </p>
        </div>
        <button onClick={() => navigate('/orders')}
          className="rounded-lg border-2 border-cream-300 px-4 py-2 font-sans text-sm font-semibold text-ink-700 hover:bg-cream-200">
          ← Back to Orders
        </button>
      </div>
    )
  }

  return (
    <div>
      <PageHeader category="Transactions" title={`Order #${order.order_number}`}
        description="View order details and update the delivery status."
        action={
          <button onClick={() => navigate('/orders')}
            className="rounded-lg border-2 border-cream-300 px-4 py-2 font-sans text-sm font-semibold text-ink-700 hover:bg-cream-200">
            ← Back to Orders
          </button>
        }
      />

      {/* Status Tracker */}
      <div className="mb-6 rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-ink-900">Order Status</h2>
          <StatusBadge status={order.status} />
        </div>
        <div className="flex items-center justify-between">
          {STATUS_STEPS.map((step, i) => {
            const stepIndex = STATUS_STEPS.indexOf(order.status)
            const done = i <= stepIndex
            return (
              <div key={step} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 font-sans text-xs font-bold ${done ? 'border-gold-600 bg-gold-600 text-ink-900' : 'border-cream-300 bg-white text-ink-400'}`}>
                    {i + 1}
                  </div>
                  <span className={`mt-1 font-sans text-xs capitalize ${done ? 'font-semibold text-ink-800' : 'text-ink-400'}`}>{step}</span>
                </div>
                {i < STATUS_STEPS.length - 1 && (
                  <div className={`mx-1 mb-4 h-0.5 flex-1 ${i < stepIndex ? 'bg-gold-600' : 'bg-cream-300'}`} />
                )}
              </div>
            )
          })}
        </div>

        {order.status !== 'delivered' && order.status !== 'cancelled' && (
          <div className="mt-4 border-t border-cream-200 pt-4">
            <label className="mb-1.5 block font-sans text-sm font-medium text-ink-700">Update Status</label>
            <div className="flex gap-3">
              <select 
                defaultValue={order.status} 
                onChange={(e) => handleStatusChange(e.target.value)} 
                disabled={updating}
                className={ic}
              >
                <option value="placed">Placed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button 
                disabled={updating}
                className="rounded-lg bg-gold-600 px-5 py-2.5 font-sans text-sm font-semibold text-ink-900 hover:bg-gold-500 whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50"
              >
                {updating ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Customer */}
        <div className="rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-gold-600" />
            <h2 className="font-serif text-lg font-bold text-ink-900">Customer</h2>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><span className="font-sans text-sm text-ink-500">Name</span><span className="font-sans text-sm font-medium text-ink-900">{order.customer.username}</span></div>
            <div className="flex justify-between"><span className="font-sans text-sm text-ink-500">Email</span><span className="font-sans text-sm font-medium text-ink-900">{order.customer.email}</span></div>
            <div className="flex justify-between"><span className="font-sans text-sm text-ink-500">Order Date</span><span className="font-sans text-sm font-medium text-ink-900">{new Date(order.created_at).toLocaleDateString()}</span></div>
          </div>
        </div>

        {/* Shipping */}
        <div className="rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gold-600" />
            <h2 className="font-serif text-lg font-bold text-ink-900">Shipping Address</h2>
          </div>
          <div className="space-y-2">
            <div className="font-sans text-sm text-ink-900">
              {order.shipping_address || 'Address not provided'}
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-gold-600" />
            <h2 className="font-serif text-lg font-bold text-ink-900">Order Items</h2>
          </div>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="border-b border-cream-200 pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between"><span className="font-sans text-sm text-ink-500">Product</span><span className="font-sans text-sm font-medium text-ink-900">{item.product.name}</span></div>
                <div className="flex justify-between"><span className="font-sans text-sm text-ink-500">Price</span><span className="font-sans text-sm font-medium text-ink-900">₹{item.product.price.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="font-sans text-sm text-ink-500">Quantity</span><span className="font-sans text-sm font-medium text-ink-900">{item.quantity}</span></div>
                <div className="flex justify-between"><span className="font-sans text-sm text-ink-500">Subtotal</span><span className="font-sans text-sm font-medium text-ink-900">₹{item.subtotal.toLocaleString()}</span></div>
              </div>
            ))}
            <div className="h-px bg-cream-200" />
            <div className="flex justify-between"><span className="font-sans text-sm font-semibold text-ink-700">Total Amount</span><span className="font-sans text-sm font-bold text-ink-900">₹{order.total_amount.toLocaleString()}</span></div>
          </div>
        </div>

        {/* Payment */}
        <div className="rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-gold-600" />
            <h2 className="font-serif text-lg font-bold text-ink-900">Payment & Order Info</h2>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><span className="font-sans text-sm text-ink-500">Order Number</span><span className="font-sans text-sm font-medium text-ink-900">#{order.order_number}</span></div>
            <div className="flex justify-between"><span className="font-sans text-sm text-ink-500">Status</span><StatusBadge status={order.status} /></div>
            <div className="flex justify-between"><span className="font-sans text-sm text-ink-500">Created</span><span className="font-sans text-sm font-medium text-ink-900">{new Date(order.created_at).toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="font-sans text-sm text-ink-500">Last Updated</span><span className="font-sans text-sm font-medium text-ink-900">{new Date(order.updated_at).toLocaleString()}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
