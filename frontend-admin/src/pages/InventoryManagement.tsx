import { Package, AlertTriangle } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import { useNavigate } from 'react-router-dom'

interface InventoryItem {
  id: number; name: string; category: string;
  seller: string; stock: number; price: string; status: string
}

// TODO: replace with GET /api/inventory/
const items: InventoryItem[] = []

const InventoryManagement = () => {
  const navigate = useNavigate()

  return (
    <div>
      <PageHeader category="Stock Control" title="Inventory Management"
        description="Monitor stock levels across all sellers and products." />

      {/* Summary cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Total Products', value: '0', icon: Package, color: 'text-gold-600', bg: 'bg-gold-500/10' },
          { label: 'Low Stock', value: '0', icon: AlertTriangle, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Out of Stock', value: '0', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border-2 border-cream-300 bg-white p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-ink-500">{s.label}</p>
                <p className="mt-1 font-serif text-3xl font-bold text-ink-900">{s.value}</p>
              </div>
              <div className={`rounded-full p-3 ${s.bg}`}>
                <s.icon className={`h-6 w-6 ${s.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border-2 border-cream-300 bg-white shadow-md">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-cream-300 bg-cream-100">
              <Package className="h-7 w-7 text-ink-400" />
            </div>
            <p className="font-serif text-base text-ink-600">No inventory data yet</p>
            <p className="mt-1 font-sans text-sm text-ink-400">Inventory will appear once products are added.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-cream-300 bg-cream-50">
                  {['Product', 'Category', 'Seller', 'Stock', 'Price', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-sans text-xs font-semibold uppercase tracking-widest text-ink-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-cream-50">
                    <td className="px-4 py-3 font-sans text-sm font-medium text-ink-900">{item.name}</td>
                    <td className="px-4 py-3 font-sans text-sm text-ink-600">{item.category}</td>
                    <td className="px-4 py-3 font-sans text-sm text-ink-600">{item.seller}</td>
                    <td className="px-4 py-3">
                      <span className={`font-sans text-sm font-semibold ${item.stock === 0 ? 'text-red-600' : item.stock < 5 ? 'text-yellow-600' : 'text-green-700'}`}>
                        {item.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-sans text-sm text-ink-900">₹{item.price}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => navigate(`/products/edit/${item.id}`)}
                        className="rounded-lg border border-cream-300 px-3 py-1.5 font-sans text-xs text-ink-700 hover:bg-cream-100">
                        Update Stock
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

export default InventoryManagement
