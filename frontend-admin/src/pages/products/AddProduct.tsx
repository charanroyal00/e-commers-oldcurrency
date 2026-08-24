import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UploadCloud, FileCheck } from 'lucide-react'
import { productsService, ApiError } from '../../services'
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

const AddProduct = () => {
  const navigate = useNavigate()
  const [images, setImages] = useState<File[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
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
    if (!form.name.trim())      e.name = 'Product name is required'
    if (!form.category)         e.category = 'Category is required'
    if (!form.condition)        e.condition = 'Condition is required'
    if (!form.price.trim())     e.price = 'Price is required'
    else if (isNaN(Number(form.price)) || Number(form.price) <= 0) e.price = 'Enter a valid price'
    if (!form.stock.trim())     e.stock = 'Stock quantity is required'
    if (!form.description.trim()) e.description = 'Description is required'
    if (images.length === 0)    e.images = 'At least one image is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    setErrors({})

    try {
      await productsService.createProduct({
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        stock: Number(form.stock),
        images: images
      })

      // Navigate back to products page on success
      navigate('/products')
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 400 && error.response) {
          // Handle validation errors from backend
          const backendErrors: Record<string, string> = {}
          Object.entries(error.response).forEach(([key, value]: [string, any]) => {
            if (Array.isArray(value)) {
              backendErrors[key] = value[0]
            } else {
              backendErrors[key] = value
            }
          })
          setErrors(backendErrors)
        } else {
          setErrors({ general: error.message || 'Failed to create product' })
        }
      } else {
        setErrors({ general: 'Network error. Please try again.' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <PageHeader category="Catalogue" title="Add New Product"
        description="List a new old currency item on the marketplace."
        action={
          <button onClick={() => navigate('/products')}
            className="rounded-lg border-2 border-cream-300 px-4 py-2 font-sans text-sm font-semibold text-ink-700 hover:bg-cream-200">
            ← Back
          </button>
        }
      />

      <form onSubmit={handleSubmit} noValidate>
        {/* General Error Display */}
        {errors.general && (
          <div className="mb-6 rounded-lg border border-red-400/20 bg-red-400/10 p-3">
            <p className="font-sans text-sm text-red-600" role="alert">
              {errors.general}
            </p>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic Info */}
            <div className="rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
              <h2 className="mb-4 font-serif text-lg font-bold text-ink-900">Product Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Product Name" id="name" error={errors.name} className="sm:col-span-2">
                  <input id="name" type="text" placeholder="e.g. 1921 George V One Rupee Silver Coin"
                    value={form.name} onChange={(e) => set('name', e.target.value)} className={ic(errors.name)} />
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
                <FormField label="Year / Era" id="year" hint="e.g. 1921 or British India">
                  <input id="year" type="text" placeholder="1921" value={form.year} onChange={(e) => set('year', e.target.value)} className={ic()} />
                </FormField>
                <FormField label="Material" id="material" hint="e.g. Silver, Copper, Paper">
                  <input id="material" type="text" placeholder="Silver" value={form.material} onChange={(e) => set('material', e.target.value)} className={ic()} />
                </FormField>
                <FormField label="Weight" id="weight" hint="e.g. 11.6g">
                  <input id="weight" type="text" placeholder="11.6g" value={form.weight} onChange={(e) => set('weight', e.target.value)} className={ic()} />
                </FormField>
                <FormField label="Description" id="description" error={errors.description} className="sm:col-span-2">
                  <textarea id="description" rows={4} placeholder="Describe the item, its history, rarity, and condition details..."
                    value={form.description} onChange={(e) => set('description', e.target.value)}
                    className={ic(errors.description) + ' resize-none'} />
                </FormField>
              </div>
            </div>

            {/* Images */}
            <div className="rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
              <h2 className="mb-1 font-serif text-lg font-bold text-ink-900">Product Images</h2>
              <p className="mb-4 font-sans text-xs text-ink-400">Upload up to 5 images. First image will be the cover.</p>
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-cream-300 bg-cream-100 py-8 transition-colors hover:border-gold-400 hover:bg-gold-500/5">
                <UploadCloud className="h-8 w-8 text-ink-400" />
                <span className="font-sans text-sm text-ink-600">Click to upload images</span>
                <span className="font-sans text-xs text-ink-400">PNG, JPG up to 5MB each</span>
                <input type="file" multiple accept="image/*" className="hidden"
                  onChange={(e) => setImages(Array.from(e.target.files || []).slice(0, 5))} />
              </label>
              {errors.images && <p className="mt-1 font-sans text-xs text-red-500">{errors.images}</p>}
              {images.length > 0 && (
                <div className="mt-3 space-y-2">
                  {images.map((img, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-lg border border-cream-300 bg-cream-50 px-3 py-2">
                      <FileCheck className="h-4 w-4 text-gold-600" />
                      <span className="font-sans text-xs text-ink-700">{img.name}</span>
                      {i === 0 && <span className="ml-auto rounded-full bg-gold-500/10 px-2 py-0.5 font-sans text-xs text-gold-700">Cover</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
              <h2 className="mb-4 font-serif text-lg font-bold text-ink-900">Pricing & Stock</h2>
              <div className="space-y-4">
                <FormField label="Price (₹)" id="price" error={errors.price}>
                  <input id="price" type="number" min="0" placeholder="0.00"
                    value={form.price} onChange={(e) => set('price', e.target.value)} className={ic(errors.price)} />
                </FormField>
                <FormField label="Stock Quantity" id="stock" error={errors.stock}>
                  <input id="stock" type="number" min="0" placeholder="1"
                    value={form.stock} onChange={(e) => set('stock', e.target.value)} className={ic(errors.stock)} />
                </FormField>
              </div>
            </div>

            <div className="rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
              <button type="submit" disabled={isLoading}
                className="w-full rounded-lg bg-gold-600 py-3 font-sans text-sm font-semibold text-ink-900 transition-colors hover:bg-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500 disabled:cursor-not-allowed disabled:opacity-50">
                {isLoading ? 'Publishing...' : 'Publish Product'}
              </button>
              <button type="button" onClick={() => navigate('/products')} disabled={isLoading}
                className="mt-3 w-full rounded-lg border-2 border-cream-300 py-3 font-sans text-sm font-semibold text-ink-700 transition-colors hover:bg-cream-200 disabled:cursor-not-allowed disabled:opacity-50">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
