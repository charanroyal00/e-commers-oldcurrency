import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import FormField from '../../components/register/FormField'

const CATEGORIES = [
  'Ancient Coins', 'British India Notes', 'Republic India Notes',
  'Mughal Coins', 'World Coins', 'Commemorative Coins',
  'Error & Misprint Notes', 'Fancy Number Notes', 'Other',
]
const CONDITIONS = ['Uncirculated (UNC)', 'About Uncirculated (AU)', 'Extremely Fine (EF)',
  'Very Fine (VF)', 'Fine (F)', 'Good (G)', 'Poor']

const ic = (err?: string) =>
  `w-full rounded-lg border bg-cream-100 py-2.5 px-3 font-sans text-sm text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-gold-500/40 ${err ? 'border-red-400' : 'border-cream-300'}`

const EditProduct = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Pre-filled with existing data — TODO: fetch from GET /api/products/:id/
  const [form, setForm] = useState({
    name: '', category: '', condition: '', year: '',
    price: '', stock: '', description: '', weight: '', material: '',
  })

  const set = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }))
    setErrors((p) => ({ ...p, [field]: '' }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim())        e.name = 'Product name is required'
    if (!form.category)           e.category = 'Category is required'
    if (!form.condition)          e.condition = 'Condition is required'
    if (!form.price.trim())       e.price = 'Price is required'
    else if (isNaN(Number(form.price)) || Number(form.price) <= 0) e.price = 'Enter a valid price'
    if (!form.stock.trim())       e.stock = 'Stock quantity is required'
    if (!form.description.trim()) e.description = 'Description is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      // TODO: PATCH /api/products/:id/
      navigate('/products')
    }
  }

  const handleDelete = () => {
    // TODO: DELETE /api/products/:id/
    navigate('/products')
  }

  return (
    <div>
      <PageHeader category="Catalogue" title={`Edit Product #${id}`}
        description="Update product details or remove it from the marketplace."
        action={
          <button onClick={() => navigate('/products')}
            className="rounded-lg border-2 border-cream-300 px-4 py-2 font-sans text-sm font-semibold text-ink-700 hover:bg-cream-200">
            ← Back
          </button>
        }
      />

      <form onSubmit={handleUpdate} noValidate>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
              <h2 className="mb-4 font-serif text-lg font-bold text-ink-900">Product Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Product Name" id="name" error={errors.name} className="sm:col-span-2">
                  <input id="name" type="text" value={form.name} onChange={(e) => set('name', e.target.value)} className={ic(errors.name)} />
                </FormField>
                <FormField label="Category" id="category" error={errors.category}>
                  <select id="category" value={form.category} onChange={(e) => set('category', e.target.value)} className={ic(errors.category)}>
                    <option value="">Select category</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FormField>
                <FormField label="Condition" id="condition" error={errors.condition}>
                  <select id="condition" value={form.condition} onChange={(e) => set('condition', e.target.value)} className={ic(errors.condition)}>
                    <option value="">Select condition</option>
                    {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FormField>
                <FormField label="Year / Era" id="year">
                  <input id="year" type="text" value={form.year} onChange={(e) => set('year', e.target.value)} className={ic()} />
                </FormField>
                <FormField label="Material" id="material">
                  <input id="material" type="text" value={form.material} onChange={(e) => set('material', e.target.value)} className={ic()} />
                </FormField>
                <FormField label="Weight" id="weight">
                  <input id="weight" type="text" value={form.weight} onChange={(e) => set('weight', e.target.value)} className={ic()} />
                </FormField>
                <FormField label="Description" id="description" error={errors.description} className="sm:col-span-2">
                  <textarea id="description" rows={4} value={form.description}
                    onChange={(e) => set('description', e.target.value)}
                    className={ic(errors.description) + ' resize-none'} />
                </FormField>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
              <h2 className="mb-4 font-serif text-lg font-bold text-ink-900">Pricing & Stock</h2>
              <div className="space-y-4">
                <FormField label="Price (₹)" id="price" error={errors.price}>
                  <input id="price" type="number" min="0" value={form.price} onChange={(e) => set('price', e.target.value)} className={ic(errors.price)} />
                </FormField>
                <FormField label="Stock Quantity" id="stock" error={errors.stock}>
                  <input id="stock" type="number" min="0" value={form.stock} onChange={(e) => set('stock', e.target.value)} className={ic(errors.stock)} />
                </FormField>
              </div>
            </div>

            <div className="rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md space-y-3">
              <button type="submit"
                className="w-full rounded-lg bg-gold-600 py-3 font-sans text-sm font-semibold text-ink-900 transition-colors hover:bg-gold-500">
                Save Changes
              </button>
              <button type="button" onClick={() => setShowDeleteConfirm(true)}
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-red-200 py-3 font-sans text-sm font-semibold text-red-600 transition-colors hover:bg-red-50">
                <Trash2 className="h-4 w-4" /> Delete Product
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/60 px-4">
          <div className="w-full max-w-sm rounded-2xl border-2 border-cream-300 bg-white p-6 shadow-2xl">
            <h3 className="font-serif text-xl font-bold text-ink-900">Delete Product?</h3>
            <p className="mt-2 font-sans text-sm text-ink-500">
              This action cannot be undone. The product will be permanently removed from the marketplace.
            </p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 rounded-lg border-2 border-cream-300 py-2.5 font-sans text-sm font-semibold text-ink-700 hover:bg-cream-200">
                Cancel
              </button>
              <button onClick={handleDelete}
                className="flex-1 rounded-lg bg-red-600 py-2.5 font-sans text-sm font-semibold text-white hover:bg-red-700">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditProduct
