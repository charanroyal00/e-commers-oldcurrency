import { useState, useEffect } from 'react'
import { Plus, Pencil, Package, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { productsService, ApiError, type Product } from '../services'
import PageHeader from '../components/ui/PageHeader'
import StatusBadge from '../components/ui/StatusBadge'

const Products = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const response = await productsService.getProducts()
      setProducts(response.results)
    } catch (error) {
      // Silent error handling - no messages shown
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader category="Catalogue" title="Products"
        description="Manage all old currency listings in the marketplace."
        action={
          <button onClick={() => navigate('/products/add')}
            className="flex items-center gap-2 rounded-lg bg-gold-600 px-4 py-2.5 font-sans text-sm font-semibold text-ink-900 transition-colors hover:bg-gold-500">
            <Plus className="h-4 w-4" /> Add Product
          </button>
        }
      />

      <div className="rounded-xl border-2 border-cream-300 bg-white shadow-md">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-gold-600 mb-4" />
            <p className="font-sans text-sm text-ink-500">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-cream-300 bg-cream-100">
              <Package className="h-7 w-7 text-ink-400" />
            </div>
            <p className="font-serif text-base text-ink-600">No products listed yet</p>
            <p className="mt-1 font-sans text-sm text-ink-400">Click "Add Product" to list your first item.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-cream-300 bg-cream-50">
                  {['Product', 'Category', 'Condition', 'Price', 'Stock', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-sans text-xs font-semibold uppercase tracking-widest text-ink-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-cream-50">
                    <td className="px-4 py-3 font-sans text-sm font-medium text-ink-900">{p.name}</td>
                    <td className="px-4 py-3 font-sans text-sm text-ink-600">{p.category}</td>
                    <td className="px-4 py-3 font-sans text-sm text-ink-600">-</td>
                    <td className="px-4 py-3 font-sans text-sm text-ink-900">₹{p.price.toLocaleString()}</td>
                    <td className="px-4 py-3 font-sans text-sm text-ink-600">{p.stock}</td>
                    <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                    <td className="px-4 py-3">
                      <button onClick={() => navigate(`/products/edit/${p.id}`)}
                        className="flex items-center gap-1 rounded-lg border border-cream-300 px-3 py-1.5 font-sans text-xs font-medium text-ink-700 hover:bg-cream-100">
                        <Pencil className="h-3 w-3" /> Edit
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

export default Products
