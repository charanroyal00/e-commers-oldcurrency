import { ShoppingCart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import StatusBadge from '../components/ui/StatusBadge'

interface Order {
  id: string; customer: string; product: string;
  amount: string; status: 'placed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string
}

// TODO: replace with GET /api/orders/
const orders: Order[] = []

const Orders = () => {
  const navigate = useNavigate()

  return (
    <div>
      <PageHeader category="Transactions" title="Order Management"
        description="View and manage all customer orders." />

      {/* Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Orders',    value: '0' },
          { label: 'Processing',      value: '0' },
          { label: 'Shipped',         value: '0' },
          { label: 'Delivered',       value: '0' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border-2 border-cream-300 bg-white p-4 shadow-md text-center">
            <p className="font-sans text-xs uppercase tracking-widest text-ink-500">{s.label}</p>
            <p className="mt-1 font-serif text-3xl font-bold text-ink-900">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border-2 border-cream-300 bg-white shadow-md">
        {orders.length === 0 ? (
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
                    <td className="px-4 py-3 font-sans text-sm font-medium text-gold-700">{o.id}</td>
                    <td className="px-4 py-3 font-sans text-sm text-ink-800">{o.customer}</td>
                    <td className="px-4 py-3 font-sans text-sm text-ink-600">{o.product}</td>
                    <td className="px-4 py-3 font-sans text-sm font-semibold text-ink-900">₹{o.amount}</td>
                    <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                    <td className="px-4 py-3 font-sans text-sm text-ink-500">{o.date}</td>
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
