import { Package } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import StatusBadge from '../components/ui/StatusBadge'

interface SellerInventoryItem {
  id: number; name: string; category: string;
  price: string; stock: number; status: 'active' | 'inactive'
}

// TODO: replace with GET /api/seller/inventory/ (authenticated seller)
const items: SellerInventoryItem[] = []

const SellerInventory = () => {
  const navigate = useNavigate()

  return (
    <div>
      <PageHeader category="My Shop" title="Seller Inventory"
        description="View and manage your listed products and stock levels."
        action={
          <button onClick={() => navigate('/products/add')}
            className="rounded-lg bg-gold-600 px-4 py-2.5 font-sans text-sm font-semibold text-ink-900 hover:bg-gold-500">
            + Add Product
          </button>
        }
      />

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'My Listings', value: items.length.toString() },
          { label: 'In Stock', value: items.filter((i) => i.stock > 0).length.toString() },
          { label: 'Out of Stock', value: items.filter((i) => i.stock === 0).length.toString() },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border-2 border-cream-300 bg-white p-4 shadow-md text-center">
            <p className="font-sans text-xs uppercase tracking-widest text-ink-500">{s.label}</p>
            <p className="mt-1 font-serif text-3xl font-bold text-ink-900">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border-2 border-cream-300 bg-white shadow-md">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-cream-300 bg-cream-100">
              <Package className="h-7 w-7 text-ink-400" />
            </div>
            <p className="font-serif text-base text-ink-600">Your inventory is empty</p>
            <p className="mt-1 font-sans text-sm text-ink-400">Add products to start selling.</p>
            <button onClick={() => navigate('/products/add')}
              className="mt-4 rounded-lg bg-gold-600 px-6 py-2.5 font-sans text-sm font-semibold text-ink-900 hover:bg-gold-500">
              Add Your First Product
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-cream-300 bg-cream-50">
                  {['Product', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-sans text-xs font-semibold uppercase tracking-widest text-ink-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-cream-50">
                    <td className="px-4 py-3 font-sans text-sm font-medium text-ink-900">{item.name}</td>
                    <td className="px-4 py-3 font-sans text-sm text-ink-600">{item.category}</td>
                    <td className="px-4 py-3 font-sans text-sm text-ink-900">₹{item.price}</td>
                    <td className="px-4 py-3">
                      <span className={`font-sans text-sm font-semibold ${item.stock === 0 ? 'text-red-600' : 'text-green-700'}`}>
                        {item.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                    <td className="px-4 py-3">
                      <button onClick={() => navigate(`/products/edit/${item.id}`)}
                        className="rounded-lg border border-cream-300 px-3 py-1.5 font-sans text-xs text-ink-700 hover:bg-cream-100">
                        Edit
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

export default SellerInventory
