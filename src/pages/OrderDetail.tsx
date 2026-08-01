import { useNavigate, useParams } from 'react-router-dom'
import { Package, User, MapPin, CreditCard } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import StatusBadge from '../components/ui/StatusBadge'

type OrderStatus = 'placed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

const STATUS_STEPS: OrderStatus[] = ['placed', 'processing', 'shipped', 'delivered']

const ic =
  'w-full rounded-lg border border-cream-300 bg-cream-100 py-2.5 px-3 font-sans text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-500/40'

const OrderDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  // TODO: fetch from GET /api/orders/:id/
  const order = {
    id: id ?? 'N/A',
    status: 'processing' as OrderStatus,
    date: '—',
    customer: { name: '—', email: '—', phone: '—' },
    address: { line1: '—', city: '—', state: '—', pincode: '—' },
    product: { name: '—', category: '—', price: '—', quantity: 1 },
    payment: { method: '—', transactionId: '—', status: '—' },
  }

  const handleStatusChange = (newStatus: string) => {
    // TODO: PATCH /api/orders/:id/ { status: newStatus }
    console.log('Update status to:', newStatus)
  }

  return (
    <div>
      <PageHeader category="Transactions" title={`Order ${order.id}`}
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
              <select defaultValue={order.status} onChange={(e) => handleStatusChange(e.target.value)} className={ic}>
                <option value="placed">Placed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button className="rounded-lg bg-gold-600 px-5 py-2.5 font-sans text-sm font-semibold text-ink-900 hover:bg-gold-500 whitespace-nowrap">
                Update
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
            <div className="flex justify-between"><span className="font-sans text-sm text-ink-500">Name</span><span className="font-sans text-sm font-medium text-ink-900">{order.customer.name}</span></div>
            <div className="flex justify-between"><span className="font-sans text-sm text-ink-500">Email</span><span className="font-sans text-sm font-medium text-ink-900">{order.customer.email}</span></div>
            <div className="flex justify-between"><span className="font-sans text-sm text-ink-500">Phone</span><span className="font-sans text-sm font-medium text-ink-900">{order.customer.phone}</span></div>
          </div>
        </div>

        {/* Shipping */}
        <div className="rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gold-600" />
            <h2 className="font-serif text-lg font-bold text-ink-900">Shipping Address</h2>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><span className="font-sans text-sm text-ink-500">Address</span><span className="font-sans text-sm font-medium text-ink-900">{order.address.line1}</span></div>
            <div className="flex justify-between"><span className="font-sans text-sm text-ink-500">City</span><span className="font-sans text-sm font-medium text-ink-900">{order.address.city}</span></div>
            <div className="flex justify-between"><span className="font-sans text-sm text-ink-500">State</span><span className="font-sans text-sm font-medium text-ink-900">{order.address.state}</span></div>
            <div className="flex justify-between"><span className="font-sans text-sm text-ink-500">Pincode</span><span className="font-sans text-sm font-medium text-ink-900">{order.address.pincode}</span></div>
          </div>
        </div>

        {/* Product */}
        <div className="rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-gold-600" />
            <h2 className="font-serif text-lg font-bold text-ink-900">Product</h2>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><span className="font-sans text-sm text-ink-500">Name</span><span className="font-sans text-sm font-medium text-ink-900">{order.product.name}</span></div>
            <div className="flex justify-between"><span className="font-sans text-sm text-ink-500">Category</span><span className="font-sans text-sm font-medium text-ink-900">{order.product.category}</span></div>
            <div className="flex justify-between"><span className="font-sans text-sm text-ink-500">Quantity</span><span className="font-sans text-sm font-medium text-ink-900">{order.product.quantity}</span></div>
            <div className="h-px bg-cream-200" />
            <div className="flex justify-between"><span className="font-sans text-sm font-semibold text-ink-700">Total</span><span className="font-sans text-sm font-bold text-ink-900">₹{order.product.price}</span></div>
          </div>
        </div>

        {/* Payment */}
        <div className="rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-gold-600" />
            <h2 className="font-serif text-lg font-bold text-ink-900">Payment</h2>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><span className="font-sans text-sm text-ink-500">Method</span><span className="font-sans text-sm font-medium text-ink-900">{order.payment.method}</span></div>
            <div className="flex justify-between"><span className="font-sans text-sm text-ink-500">Transaction ID</span><span className="font-sans text-sm font-medium text-ink-900">{order.payment.transactionId}</span></div>
            <div className="flex justify-between"><span className="font-sans text-sm text-ink-500">Status</span><span className="font-sans text-sm font-medium text-ink-900">{order.payment.status}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
