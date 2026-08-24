import { useState } from 'react'
import { Plus, Pencil, Trash2, Tag } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'

interface Category {
  id: number
  name: string
  slug: string
  productCount: number
}

// TODO: replace with API data from GET /api/categories/
const initialCategories: Category[] = []

const ic = (err?: string) =>
  `w-full rounded-lg border bg-cream-100 py-2.5 px-3 font-sans text-sm text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-gold-500/40 ${err ? 'border-red-400' : 'border-cream-300'}`

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState<Category | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [formName, setFormName] = useState('')
  const [formError, setFormError] = useState('')

  const openAdd = () => { setEditItem(null); setFormName(''); setFormError(''); setShowForm(true) }
  const openEdit = (c: Category) => { setEditItem(c); setFormName(c.name); setFormError(''); setShowForm(true) }

  const handleSave = () => {
    if (!formName.trim()) { setFormError('Category name is required'); return }
    if (editItem) {
      setCategories((prev) => prev.map((c) => c.id === editItem.id
        ? { ...c, name: formName, slug: formName.toLowerCase().replace(/\s+/g, '-') } : c))
    } else {
      const newCat: Category = { id: Date.now(), name: formName, slug: formName.toLowerCase().replace(/\s+/g, '-'), productCount: 0 }
      setCategories((prev) => [...prev, newCat])
    }
    setShowForm(false)
  }

  const handleDelete = () => {
    setCategories((prev) => prev.filter((c) => c.id !== deleteId))
    setDeleteId(null)
  }

  return (
    <div>
      <PageHeader category="Configuration" title="Category Management"
        description="Manage product categories for the marketplace."
        action={
          <button onClick={openAdd}
            className="flex items-center gap-2 rounded-lg bg-gold-600 px-4 py-2.5 font-sans text-sm font-semibold text-ink-900 hover:bg-gold-500">
            <Plus className="h-4 w-4" /> Add Category
          </button>
        }
      />

      <div className="rounded-xl border-2 border-cream-300 bg-white shadow-md">
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-cream-300 bg-cream-100">
              <Tag className="h-7 w-7 text-ink-400" />
            </div>
            <p className="font-serif text-base text-ink-600">No categories yet</p>
            <p className="mt-1 font-sans text-sm text-ink-400">Click "Add Category" to create one.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-cream-300 bg-cream-50">
                  {['Category Name', 'Slug', 'Products', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-sans text-xs font-semibold uppercase tracking-widest text-ink-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                {categories.map((c) => (
                  <tr key={c.id} className="hover:bg-cream-50">
                    <td className="px-4 py-3 font-sans text-sm font-medium text-ink-900">{c.name}</td>
                    <td className="px-4 py-3 font-sans text-sm text-ink-500">{c.slug}</td>
                    <td className="px-4 py-3 font-sans text-sm text-ink-600">{c.productCount}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(c)}
                          className="flex items-center gap-1 rounded-lg border border-cream-300 px-3 py-1.5 font-sans text-xs text-ink-700 hover:bg-cream-100">
                          <Pencil className="h-3 w-3" /> Edit
                        </button>
                        <button onClick={() => setDeleteId(c.id)}
                          className="flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 font-sans text-xs text-red-600 hover:bg-red-50">
                          <Trash2 className="h-3 w-3" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/60 px-4">
          <div className="w-full max-w-sm rounded-2xl border-2 border-cream-300 bg-white p-6 shadow-2xl">
            <h3 className="mb-4 font-serif text-xl font-bold text-ink-900">
              {editItem ? 'Edit Category' : 'Add Category'}
            </h3>
            <div className="mb-1.5 block font-sans text-sm font-medium text-ink-700">Category Name</div>
            <input type="text" placeholder="e.g. Ancient Coins" value={formName}
              onChange={(e) => { setFormName(e.target.value); setFormError('') }}
              className={ic(formError)} />
            {formError && <p className="mt-1 font-sans text-xs text-red-500">{formError}</p>}
            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowForm(false)}
                className="flex-1 rounded-lg border-2 border-cream-300 py-2.5 font-sans text-sm font-semibold text-ink-700 hover:bg-cream-200">
                Cancel
              </button>
              <button onClick={handleSave}
                className="flex-1 rounded-lg bg-gold-600 py-2.5 font-sans text-sm font-semibold text-ink-900 hover:bg-gold-500">
                {editItem ? 'Save Changes' : 'Add Category'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/60 px-4">
          <div className="w-full max-w-sm rounded-2xl border-2 border-cream-300 bg-white p-6 shadow-2xl">
            <h3 className="font-serif text-xl font-bold text-ink-900">Delete Category?</h3>
            <p className="mt-2 font-sans text-sm text-ink-500">This will remove the category. Products in this category will become uncategorised.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 rounded-lg border-2 border-cream-300 py-2.5 font-sans text-sm font-semibold text-ink-700 hover:bg-cream-200">Cancel</button>
              <button onClick={handleDelete}
                className="flex-1 rounded-lg bg-red-600 py-2.5 font-sans text-sm font-semibold text-white hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryManagement
