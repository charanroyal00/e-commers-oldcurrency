import { useState, useEffect } from 'react'
import { ShoppingCart, Eye, Check, X, Clock, User, Mail, Phone, MapPin } from 'lucide-react'
import { ordersAPI } from '../services/api'

interface Order {
  id: number
  order_id: string
  customer_name: string
  customer_phone: string
  customer_email: string
  delivery_address: string
  city: string
  state: string
  pin_code: string
  product: number
  product_name?: string
  quantity: number
  original_price: string
  discount_percentage: string
  selling_price: string
  total_amount: string
  status: string
  created_at: string
  whatsapp_url?: string
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await ordersAPI.list()
      setOrders(res)
    } catch (err: any) {
      showToast(err.message || 'Error fetching orders', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleStatusChange = async (orderId: number | string, newStatus: string) => {
    try {
      await ordersAPI.updateStatus(orderId, newStatus)
      showToast(`Order status updated to ${newStatus}`)
      
      // Update local state
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
      
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null)
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to update order status', 'error')
    }
  }

  // Get status color classes
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-300'
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'Processing':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300'
      case 'Shipped':
        return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-zinc-100 text-zinc-800 border-zinc-300'
    }
  }

  return (
    <div>
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed right-5 top-5 z-50 rounded-lg px-6 py-4 shadow-xl border text-sm font-sans flex items-center gap-3 transition-all duration-300 ${
          toast.type === 'success' 
            ? 'bg-cream-50 border-gold-400 text-gold-800' 
            : 'bg-red-50 border-red-300 text-red-800'
        }`}>
          {toast.type === 'success' ? <Check className="h-5 w-5 text-gold-600" /> : <X className="h-5 w-5 text-red-600" />}
          {toast.message}
        </div>
      )}

      {/* Page heading */}
      <div className="mb-8">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-gold-600">
          Transactions
        </p>
        <h1 className="mt-1 font-serif text-3xl font-bold text-ink-900">Orders</h1>
        <p className="mt-2 font-sans text-sm text-ink-500">
          View and manage customer orders and logistics.
        </p>
      </div>

      {/* Orders content */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <p className="font-serif text-lg text-ink-500 italic">Accessing archive ledgers...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-cream-300 bg-cream-200">
              <ShoppingCart className="h-7 w-7 text-ink-400" />
            </div>
            <p className="font-serif text-base text-ink-600">No orders yet</p>
            <p className="mt-1 font-sans text-sm text-ink-400">Orders will appear here once customers start buying.</p>
          </div>
        </div>
      ) : (
        <>
          {/* Mobile Card Layout */}
          <div className="space-y-4 md:hidden">
            {orders.map((order) => (
              <div key={order.id} className="rounded-xl border-2 border-cream-300 bg-white p-4 shadow-sm space-y-3 font-sans">
                <div className="flex items-center justify-between border-b border-cream-100 pb-2">
                  <span className="font-serif text-sm font-bold text-ink-900 tracking-wide">{order.order_id}</span>
                  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${getStatusBadge(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-[10px] font-semibold text-ink-400 uppercase tracking-wider">Customer</p>
                    <p className="font-bold text-ink-950 mt-0.5">{order.customer_name}</p>
                    <p className="text-ink-500 mt-0.5">{order.customer_phone}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-ink-400 uppercase tracking-wider">Total Amount</p>
                    <p className="font-bold text-ink-950 text-sm mt-0.5">₹{parseFloat(order.total_amount).toLocaleString()}</p>
                    <p className="text-ink-400 mt-0.5">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="bg-cream-50 px-3 py-2 rounded-lg border border-cream-200">
                  <p className="text-[10px] font-semibold text-ink-400 uppercase tracking-wider">Product</p>
                  <p className="font-medium text-ink-800 text-xs mt-0.5 truncate">{order.product_name || `Product #${order.product}`} (Qty: {order.quantity})</p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-cream-100">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="flex-1 rounded-lg border border-cream-300 bg-cream-50/50 py-2 px-3 text-xs font-semibold text-ink-800 focus:outline-none focus:ring-1 focus:ring-gold-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="rounded-lg border border-cream-300 p-2 text-ink-600 hover:bg-cream-100 transition-colors flex items-center justify-center min-h-[36px] min-w-[36px]"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden md:block overflow-x-auto rounded-xl border-2 border-cream-300 bg-white shadow-md">
            <table className="w-full border-collapse text-left font-sans text-sm">
              <thead>
                <tr className="border-b border-cream-300 bg-cream-50 font-sans text-xs font-semibold uppercase tracking-wider text-ink-500">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Product</th>
                  <th className="p-4 text-center">Qty</th>
                  <th className="p-4">Total Amount</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-cream-50/50 transition-colors">
                    <td className="p-4 font-serif text-sm font-bold text-ink-900 tracking-wide">
                      {order.order_id}
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-bold text-ink-950">{order.customer_name}</p>
                        <p className="text-xs text-ink-400">{order.customer_phone}</p>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-ink-800 max-w-[200px] truncate">
                      {order.product_name || `Product #${order.product}`}
                    </td>
                    <td className="p-4 text-center font-medium text-ink-600">{order.quantity}</td>
                    <td className="p-4 font-bold text-ink-950">₹{parseFloat(order.total_amount).toLocaleString()}</td>
                    <td className="p-4 text-ink-500 font-medium">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-sm ${
                        getStatusBadge(order.status)
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="rounded border border-cream-300 bg-cream-50/50 py-1.5 px-2 text-xs font-semibold text-ink-800 focus:outline-none focus:ring-1 focus:ring-gold-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="rounded p-1.5 text-ink-600 hover:bg-cream-100 transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Detailed Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 font-sans backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl border-2 border-cream-300 bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-cream-200 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-bold text-gold-600 uppercase tracking-widest">
                  Order Invoice
                </span>
                <h2 className="font-serif text-xl font-bold text-ink-900 mt-1">
                  Order ID: {selectedOrder.order_id}
                </h2>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-full p-1.5 hover:bg-cream-200 transition-colors"
              >
                <X className="h-5 w-5 text-ink-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="grid gap-6 sm:grid-cols-2 text-sm">
              {/* Customer Details */}
              <div className="space-y-4 rounded-xl border border-cream-200 p-4 bg-cream-50/50">
                <h3 className="font-serif text-base font-bold text-gold-700 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Customer Details
                </h3>
                <div className="space-y-2.5 font-sans">
                  <div>
                    <p className="text-[10px] font-semibold text-ink-400 uppercase tracking-wider">Full Name</p>
                    <p className="font-bold text-ink-900">{selectedOrder.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-ink-400 uppercase tracking-wider">Mobile Number</p>
                    <p className="font-semibold text-ink-800 flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-ink-400" />
                      {selectedOrder.customer_phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-ink-400 uppercase tracking-wider">Email Address</p>
                    <p className="font-semibold text-ink-800 flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-ink-400" />
                      {selectedOrder.customer_email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-4 rounded-xl border border-cream-200 p-4 bg-cream-50/50">
                <h3 className="font-serif text-base font-bold text-gold-700 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Delivery Address
                </h3>
                <div className="space-y-2 font-sans">
                  <p className="text-ink-800 whitespace-pre-line leading-relaxed">
                    {selectedOrder.delivery_address}
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-cream-200">
                    <div>
                      <p className="text-[9px] font-semibold text-ink-400 uppercase">City</p>
                      <p className="font-bold text-ink-800">{selectedOrder.city}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold text-ink-400 uppercase">State</p>
                      <p className="font-bold text-ink-800">{selectedOrder.state}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[9px] font-semibold text-ink-400 uppercase">PIN Code</p>
                      <p className="font-bold text-ink-800">{selectedOrder.pin_code}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Status & Info */}
              <div className="sm:col-span-2 space-y-4 rounded-xl border border-cream-200 p-4">
                <h3 className="font-serif text-base font-bold text-gold-700 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Order Specifications
                </h3>
                
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 font-sans text-xs">
                  <div>
                    <p className="text-ink-400 uppercase tracking-wider font-semibold">Order Date</p>
                    <p className="text-sm font-bold text-ink-800 mt-0.5">
                      {new Date(selectedOrder.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-ink-400 uppercase tracking-wider font-semibold">Current Status</p>
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-sm mt-0.5 ${
                      getStatusBadge(selectedOrder.status)
                    }`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-ink-400 uppercase tracking-wider font-semibold">Update Status</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
                        <button
                          key={st}
                          onClick={() => handleStatusChange(selectedOrder.id, st)}
                          className={`rounded px-2.5 py-1 text-[10px] font-bold border transition-all ${
                            selectedOrder.status === st
                              ? 'bg-gold-600 border-gold-500 text-ink-950 shadow-sm'
                              : 'bg-white border-cream-300 text-ink-600 hover:bg-cream-50'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Items & Invoice calculation */}
                <div className="mt-4 pt-4 border-t border-cream-200 space-y-2">
                  <p className="text-[10px] font-bold text-ink-500 uppercase tracking-wider">Invoice summary</p>
                  <div className="flex justify-between items-center py-2 bg-cream-50 px-3 rounded-lg border border-cream-200">
                    <div>
                      <p className="font-serif text-sm font-bold text-ink-900">
                        {selectedOrder.product_name || `Product #${selectedOrder.product}`}
                      </p>
                      <p className="text-xs text-ink-400 font-sans mt-0.5">
                        Qty: {selectedOrder.quantity} • Unit Price: ₹{parseFloat(selectedOrder.selling_price).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right font-sans">
                      <p className="text-[10px] font-medium text-ink-400 line-through">₹{parseFloat(selectedOrder.original_price).toLocaleString()} Original</p>
                      <p className="font-bold text-ink-950 text-sm">₹{parseFloat(selectedOrder.total_amount).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="border-t border-cream-200 pt-4 mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg border border-cream-300 px-5 py-2.5 text-sm font-semibold text-ink-600 hover:bg-cream-50 transition-colors"
              >
                Close
              </button>
              {selectedOrder.whatsapp_url && (
                <a
                  href={selectedOrder.whatsapp_url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-[#25D366] text-white px-5 py-2.5 text-sm font-semibold hover:opacity-90 shadow-md flex items-center gap-2"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.835-3c1.654.982 3.51 1.5 5.409 1.5 5.927 0 10.75-4.819 10.753-10.753.002-2.874-1.116-5.577-3.149-7.614-2.033-2.036-4.736-3.156-7.618-3.158-5.931 0-10.754 4.821-10.757 10.758-.001 1.785.469 3.532 1.358 5.097l-.988 3.605 3.693-.97.002.002zM17.47 15.667c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  </svg>
                  Notify via WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders
