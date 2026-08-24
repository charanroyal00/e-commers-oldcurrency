import { useState, useEffect } from 'react'
import { Package, Plus, Trash2, Edit, Check, X, Image as ImageIcon, Eye } from 'lucide-react'
import { productsAPI, categoriesAPI } from '../services/api'

interface Category {
  id: number
  name: string
  description?: string
}

interface ProductImage {
  id: number
  image: string
  is_primary: boolean
}

interface Product {
  id: number
  name: string
  description: string
  category: number
  category_name?: string
  original_price: string
  discount_percentage: string
  discount_amount: string
  selling_price: string
  year: string
  ruler: string
  obverse: string
  reverse: string
  denomination: string
  script: string
  condition: string
  authenticity: string
  provenance: string
  stock: number
  status: string
  created_at: string
  images: ProductImage[]
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)
  
  // Editing state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  // Form states
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [year, setYear] = useState('')
  const [ruler, setRuler] = useState('')
  const [condition, setCondition] = useState('Fine')
  
  // Pricing
  const [originalPrice, setOriginalPrice] = useState('0')
  const [discountType, setDiscountType] = useState<'percentage' | 'amount'>('percentage')
  const [discountValue, setDiscountValue] = useState('0')
  
  // Images
  const [newImages, setNewImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [primaryIndex, setPrimaryIndex] = useState(0)
  const [existingImages, setExistingImages] = useState<ProductImage[]>([])
  const [deleteImageIds, setDeleteImageIds] = useState<number[]>([])
  
  // Collectibles details
  const [obverse, setObverse] = useState('')
  const [reverse, setReverse] = useState('')
  const [denomination, setDenomination] = useState('')
  const [script, setScript] = useState('')
  const [authenticity, setAuthenticity] = useState('Authenticated')
  const [provenance, setProvenance] = useState('')
  const [stock, setStock] = useState('1')
  const [statusVal, setStatusVal] = useState('Active')

  // Notification toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  // Load products and categories
  const fetchData = async () => {
    setLoading(true)
    try {
      const prodRes = await productsAPI.list()
      setProducts(prodRes)
      const catRes = await categoriesAPI.list()
      setCategories(catRes)
    } catch (err: any) {
      showToast(err.message || 'Error fetching data', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Auto calculate selling price
  const calculatePricing = () => {
    const orig = parseFloat(originalPrice) || 0
    const val = parseFloat(discountValue) || 0
    let discountAmt = 0
    let discountPct = 0

    if (discountType === 'percentage') {
      discountPct = val
      discountAmt = (orig * val) / 100
    } else {
      discountAmt = val
      discountPct = orig > 0 ? (val / orig) * 100 : 0
    }

    const selling = Math.max(0, orig - discountAmt)
    return {
      discountPercentage: discountPct.toFixed(2),
      discountAmount: discountAmt.toFixed(2),
      sellingPrice: selling.toFixed(2)
    }
  }

  const pricing = calculatePricing()

  // Handle open modal for creation
  const handleOpenCreate = () => {
    setEditingProduct(null)
    setName('')
    setDescription('')
    setCategoryId(categories[0]?.id.toString() || '')
    setYear('')
    setRuler('')
    setCondition('Fine')
    setOriginalPrice('')
    setDiscountType('percentage')
    setDiscountValue('0')
    setNewImages([])
    setImagePreviews([])
    setPrimaryIndex(0)
    setExistingImages([])
    setDeleteImageIds([])
    setObverse('')
    setReverse('')
    setDenomination('')
    setScript('')
    setAuthenticity('Authenticated')
    setProvenance('')
    setStock('1')
    setStatusVal('Active')
    setModalOpen(true)
  }

  // Handle open modal for editing
  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product)
    setName(product.name)
    setDescription(product.description)
    setCategoryId(product.category.toString())
    setYear(product.year)
    setRuler(product.ruler)
    setCondition(product.condition || 'Fine')
    setOriginalPrice(product.original_price)
    
    // Set discount state based on values
    const pct = parseFloat(product.discount_percentage) || 0
    const amt = parseFloat(product.discount_amount) || 0
    if (pct > 0) {
      setDiscountType('percentage')
      setDiscountValue(pct.toString())
    } else {
      setDiscountType('amount')
      setDiscountValue(amt.toString())
    }

    setNewImages([])
    setImagePreviews([])
    setExistingImages(product.images || [])
    
    // Find index of primary image in existing images
    const primIdx = (product.images || []).findIndex(img => img.is_primary)
    setPrimaryIndex(primIdx >= 0 ? primIdx : 0)
    
    setDeleteImageIds([])
    setObverse(product.obverse)
    setReverse(product.reverse)
    setDenomination(product.denomination)
    setScript(product.script)
    setAuthenticity(product.authenticity || 'Authenticated')
    setProvenance(product.provenance)
    setStock(product.stock.toString())
    setStatusVal(product.status || 'Active')
    setModalOpen(true)
  }

  // Handle image files selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setNewImages(prev => [...prev, ...filesArray])
      
      const fileUrls = filesArray.map(file => URL.createObjectURL(file))
      setImagePreviews(prev => [...prev, ...fileUrls])
    }
  }

  // Remove selected new image
  const handleRemoveNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
    if (primaryIndex >= existingImages.length + newImages.length - 1) {
      setPrimaryIndex(0)
    }
  }

  // Remove existing image
  const handleRemoveExistingImage = (id: number, index: number) => {
    setDeleteImageIds(prev => [...prev, id])
    setExistingImages(prev => prev.filter((_, i) => i !== index))
    if (primaryIndex === index) {
      setPrimaryIndex(0)
    } else if (primaryIndex > index) {
      setPrimaryIndex(prev => prev - 1)
    }
  }

  // Handle save (create or update)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !originalPrice || !categoryId) {
      showToast('Please fill out all required fields.', 'error')
      return
    }

    const formData = new FormData()
    formData.append('seller', '1') // Mock/logged-in user ID
    formData.append('category', categoryId)
    formData.append('name', name)
    formData.append('description', description)
    formData.append('original_price', originalPrice)
    formData.append('discount_percentage', pricing.discountPercentage)
    formData.append('discount_amount', pricing.discountAmount)
    formData.append('selling_price', pricing.sellingPrice)
    formData.append('year', year)
    formData.append('ruler', ruler)
    formData.append('obverse', obverse)
    formData.append('reverse', reverse)
    formData.append('denomination', denomination)
    formData.append('script', script)
    formData.append('condition', condition)
    formData.append('authenticity', authenticity)
    formData.append('provenance', provenance)
    formData.append('stock', stock)
    formData.append('status', statusVal)

    // Append new images
    newImages.forEach(file => {
      formData.append('images', file)
    })

    // Adjust primary index for backend (offset by existing images if any)
    formData.append('primaryImageIndex', primaryIndex.toString())

    // Append deleted image IDs if editing
    if (editingProduct) {
      deleteImageIds.forEach(id => {
        formData.append('delete_image_ids', id.toString())
      })
      
      // If we selected an existing image as primary, send its ID
      if (primaryIndex < existingImages.length) {
        formData.append('primary_image_id', existingImages[primaryIndex].id.toString())
      }
    }

    try {
      if (editingProduct) {
        await productsAPI.update(editingProduct.id, formData)
        showToast('Product updated successfully.')
      } else {
        await productsAPI.create(formData)
        showToast('Product created successfully.')
      }
      setModalOpen(false)
      fetchData()
    } catch (err: any) {
      showToast(err.message || 'Failed to save product.', 'error')
    }
  }

  // Handle Delete Product
  const handleDelete = async (id: number) => {
    try {
      await productsAPI.delete(id)
      showToast('Product deleted successfully.')
      setDeleteConfirmId(null)
      fetchData()
    } catch (err: any) {
      showToast(err.message || 'Failed to delete product.', 'error')
    }
  }

  // Toggle status (Enable/Disable)
  const toggleStatus = async (product: Product) => {
    const nextStatus = product.status === 'Active' ? 'Disabled' : 'Active'
    const formData = new FormData()
    formData.append('status', nextStatus)
    try {
      await productsAPI.update(product.id, formData)
      showToast(`Product ${nextStatus === 'Active' ? 'enabled' : 'disabled'} successfully.`)
      fetchData()
    } catch (err: any) {
      showToast(err.message || 'Failed to update status.', 'error')
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

      {/* Header section */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-gold-600">
            Catalogue
          </p>
          <h1 className="mt-1 font-serif text-3xl font-bold text-ink-900">Products</h1>
          <p className="mt-2 font-sans text-sm text-ink-500">
            Manage all old currency listings in the marketplace.
          </p>
        </div>
        
        <button
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-2 rounded-lg bg-gold-600 px-5 py-2.5 font-sans text-sm font-semibold text-ink-900 transition-colors hover:bg-gold-500 shadow-md focus:outline-none"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      {/* Products Table/Card layout */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <p className="font-serif text-lg text-ink-500 italic">Curating historical items...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-cream-300 bg-cream-200">
              <Package className="h-7 w-7 text-ink-400" />
            </div>
            <p className="font-serif text-base text-ink-600">No products listed yet</p>
            <p className="mt-1 font-sans text-sm text-ink-400">Products will appear here once added.</p>
          </div>
        </div>
      ) : (
        <>
          {/* Mobile Card Layout */}
          <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
            {products.map((product) => {
              const primaryImage = product.images?.find(img => img.is_primary) || product.images?.[0]
              return (
                <div key={product.id} className="rounded-xl border-2 border-cream-300 bg-white p-4 shadow-sm space-y-3 font-sans">
                  <div className="flex items-center gap-3">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-cream-300 bg-cream-100 flex items-center justify-center">
                      {primaryImage ? (
                        <img src={primaryImage.image} alt={product.name} className="h-full w-full object-cover" />
                      ) : (
                        <ImageIcon className="h-6 w-6 text-ink-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-sm font-bold text-ink-900 truncate">{product.name}</p>
                      <p className="text-xs text-ink-400 font-medium truncate">
                        {product.year || 'N/A'} • {product.ruler || 'Unknown'}
                      </p>
                      <p className="text-xs text-ink-600 font-medium mt-0.5">
                        {product.category_name || 'Uncategorized'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 border-t border-b border-cream-100 py-2 text-xs">
                    <div>
                      <p className="text-[10px] font-semibold text-ink-400 uppercase tracking-wider">Pricing</p>
                      <div className="mt-0.5">
                        <span className="font-bold text-ink-950">₹{parseFloat(product.selling_price).toLocaleString()}</span>
                        <span className="text-[10px] text-ink-400 line-through ml-1.5 font-medium">₹{parseFloat(product.original_price).toLocaleString()}</span>
                      </div>
                      <span className="inline-flex items-center rounded bg-gold-100 px-1.5 py-0.5 text-[9px] font-bold text-gold-800 mt-1">
                        {parseFloat(product.discount_percentage) > 0 
                          ? `${parseFloat(product.discount_percentage).toFixed(0)}% OFF` 
                          : `₹${parseFloat(product.discount_amount).toLocaleString()} OFF`}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-semibold text-ink-400 uppercase tracking-wider">Inventory & Status</p>
                      <p className="font-bold mt-0.5 text-xs text-ink-900">
                        Stock: {product.stock === 0 ? <span className="text-red-600">Sold Out</span> : <span className="text-ink-700">{product.stock}</span>}
                      </p>
                      <button
                        onClick={() => toggleStatus(product)}
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold shadow-sm transition-all hover:opacity-85 mt-1 ${
                          product.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-zinc-100 text-zinc-800'
                        }`}
                      >
                        {product.status || 'Active'}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <a
                      href={`/product-information.html?id=${product.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-cream-300 p-2 text-ink-500 hover:bg-cream-100 transition-colors flex items-center justify-center min-h-[36px] min-w-[36px]"
                      title="View live site"
                    >
                      <Eye className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => handleOpenEdit(product)}
                      className="rounded-lg border border-cream-300 p-2 text-ink-600 hover:bg-cream-100 transition-colors flex items-center justify-center min-h-[36px] min-w-[36px]"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(product.id)}
                      className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center min-h-[36px] min-w-[36px]"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden lg:block overflow-x-auto rounded-xl border-2 border-cream-300 bg-white shadow-md">
            <table className="w-full border-collapse text-left font-sans text-sm">
              <thead>
                <tr className="border-b border-cream-300 bg-cream-50 font-sans text-xs font-semibold uppercase tracking-wider text-ink-500">
                  <th className="p-4">Item</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Original Price</th>
                  <th className="p-4">Discount</th>
                  <th className="p-4">Selling Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                {products.map((product) => {
                  const primaryImage = product.images?.find(img => img.is_primary) || product.images?.[0]
                  return (
                    <tr key={product.id} className="hover:bg-cream-50/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-cream-300 bg-cream-100 flex items-center justify-center">
                            {primaryImage ? (
                              <img src={primaryImage.image} alt={product.name} className="h-full w-full object-cover" />
                            ) : (
                              <ImageIcon className="h-5 w-5 text-ink-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-serif text-sm font-bold text-ink-900">{product.name}</p>
                            <p className="text-xs text-ink-400 font-medium tracking-wide">
                              {product.year || 'N/A'} • {product.ruler || 'Unknown'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-ink-600 font-medium">{product.category_name || 'Uncategorized'}</td>
                      <td className="p-4 text-ink-400 line-through">₹{parseFloat(product.original_price).toLocaleString()}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center rounded-md bg-gold-100 px-2 py-1 text-xs font-semibold text-gold-800">
                          {parseFloat(product.discount_percentage) > 0 
                            ? `${parseFloat(product.discount_percentage).toFixed(0)}% OFF` 
                            : `₹${parseFloat(product.discount_amount).toLocaleString()} OFF`}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-ink-950">₹{parseFloat(product.selling_price).toLocaleString()}</td>
                      <td className="p-4 font-medium">
                        {product.stock === 0 ? (
                          <span className="text-red-600 font-semibold">Sold Out</span>
                        ) : (
                          <span className="text-ink-600">{product.stock}</span>
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleStatus(product)}
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold shadow-sm transition-all hover:opacity-85 ${
                            product.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-zinc-100 text-zinc-800'
                          }`}
                        >
                          {product.status || 'Active'}
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`/product-information.html?id=${product.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded p-1.5 text-ink-500 hover:bg-cream-100 transition-colors"
                            title="View live site"
                          >
                            <Eye className="h-4 w-4" />
                          </a>
                          <button
                            onClick={() => handleOpenEdit(product)}
                            className="rounded p-1.5 text-ink-600 hover:bg-cream-100 transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(product.id)}
                            className="rounded p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 font-sans backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border-2 border-cream-300 bg-white p-6 shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-ink-900">Confirm Deletion</h3>
            <p className="mt-2 text-sm text-ink-500">
              Are you sure you want to delete this product? This action is permanent and cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="rounded-lg border border-cream-300 px-4 py-2 text-sm font-semibold text-ink-600 hover:bg-cream-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal (Add/Edit) */}
      {modalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4 font-sans backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-4xl rounded-2xl border-2 border-cream-300 bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-cream-200 bg-cream-50 p-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-ink-900">
                  {editingProduct ? 'Edit Historical Collectible' : 'Add New Collectible'}
                </h2>
                <p className="text-xs text-ink-500 mt-1 uppercase tracking-wider font-semibold">
                  Numismatics & Antiquities Cataloguing
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-full p-1.5 hover:bg-cream-200 transition-colors"
              >
                <X className="h-5 w-5 text-ink-600" />
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6" noValidate>
              
              {/* SECTION 1: Product Information */}
              <div className="space-y-4">
                <h3 className="font-serif text-base font-bold text-gold-700 border-b border-cream-200 pb-1">
                  1. Product Information
                </h3>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5 uppercase tracking-wide">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Mysore Immadi Krishnaraja Wodeyar II XX Cash"
                      className="w-full rounded-lg border border-cream-300 bg-cream-50/50 py-2.5 px-4 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5 uppercase tracking-wide">
                      Historical Description
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter a historical description or product summary..."
                      className="w-full rounded-lg border border-cream-300 bg-cream-50/50 py-2.5 px-4 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5 uppercase tracking-wide">
                      Category *
                    </label>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full rounded-lg border border-cream-300 bg-cream-50/50 py-2.5 px-4 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5 uppercase tracking-wide">
                      Year / Period
                    </label>
                    <input
                      type="text"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="e.g. 1734–1766"
                      className="w-full rounded-lg border border-cream-300 bg-cream-50/50 py-2.5 px-4 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5 uppercase tracking-wide">
                      Ruler / Issuer
                    </label>
                    <input
                      type="text"
                      value={ruler}
                      onChange={(e) => setRuler(e.target.value)}
                      placeholder="e.g. Krishnaraja Wodeyar II"
                      className="w-full rounded-lg border border-cream-300 bg-cream-50/50 py-2.5 px-4 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5 uppercase tracking-wide">
                      Condition / Grade
                    </label>
                    <select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      className="w-full rounded-lg border border-cream-300 bg-cream-50/50 py-2.5 px-4 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    >
                      <option value="Good">Good</option>
                      <option value="Very Good">Very Good</option>
                      <option value="Fine">Fine</option>
                      <option value="Very Fine">Very Fine</option>
                      <option value="Extremely Fine">Extremely Fine</option>
                      <option value="Uncirculated">Uncirculated</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Pricing & Stock */}
              <div className="space-y-4">
                <h3 className="font-serif text-base font-bold text-gold-700 border-b border-cream-200 pb-1">
                  2. Pricing, Inventory & Status
                </h3>
                
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5 uppercase tracking-wide">
                      Original Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      placeholder="Original Price"
                      className="w-full rounded-lg border border-cream-300 bg-cream-50/50 py-2.5 px-4 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5 uppercase tracking-wide">
                      Discount Option
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setDiscountType('percentage')}
                        className={`flex-1 rounded-lg border py-2 px-3 text-xs font-semibold transition-all ${
                          discountType === 'percentage' 
                            ? 'bg-gold-600 border-gold-500 text-ink-900 shadow-sm' 
                            : 'bg-white border-cream-300 text-ink-600 hover:bg-cream-50'
                        }`}
                      >
                        Percentage (%)
                      </button>
                      <button
                        type="button"
                        onClick={() => setDiscountType('amount')}
                        className={`flex-1 rounded-lg border py-2 px-3 text-xs font-semibold transition-all ${
                          discountType === 'amount' 
                            ? 'bg-gold-600 border-gold-500 text-ink-900 shadow-sm' 
                            : 'bg-white border-cream-300 text-ink-600 hover:bg-cream-50'
                        }`}
                      >
                        Amount (₹)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5 uppercase tracking-wide">
                      {discountType === 'percentage' ? 'Discount Value (%)' : 'Discount Value (₹)'}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={discountValue}
                      onChange={(e) => setDiscountValue(e.target.value)}
                      placeholder="Discount value"
                      className="w-full rounded-lg border border-cream-300 bg-cream-50/50 py-2.5 px-4 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>

                  <div className="bg-cream-50 p-4 rounded-xl border border-cream-300 flex items-center justify-between sm:col-span-3">
                    <div>
                      <p className="text-xs font-semibold text-ink-500 uppercase tracking-widest">Calculated Selling Price</p>
                      <p className="font-serif text-3xl font-bold text-ink-900 mt-1">₹{parseFloat(pricing.sellingPrice).toLocaleString()}</p>
                    </div>
                    <div className="text-right text-xs font-sans font-medium text-ink-400">
                      <p>Original: ₹{parseFloat(originalPrice || '0').toLocaleString()}</p>
                      <p className="text-gold-600 font-semibold mt-0.5">Discount: -₹{parseFloat(pricing.discountAmount).toLocaleString()} ({parseFloat(pricing.discountPercentage).toFixed(0)}%)</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5 uppercase tracking-wide">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="1"
                      className="w-full rounded-lg border border-cream-300 bg-cream-50/50 py-2.5 px-4 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5 uppercase tracking-wide">
                      Publish Status
                    </label>
                    <select
                      value={statusVal}
                      onChange={(e) => setStatusVal(e.target.value)}
                      className="w-full rounded-lg border border-cream-300 bg-cream-50/50 py-2.5 px-4 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Disabled">Disabled</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Image Upload & Gallery */}
              <div className="space-y-4">
                <h3 className="font-serif text-base font-bold text-gold-700 border-b border-cream-200 pb-1">
                  3. Product Images (Obverse, Reverse, Certificates)
                </h3>

                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-ink-700 uppercase tracking-wide">
                    Upload Images
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-cream-300 border-dashed rounded-xl cursor-pointer bg-cream-50/50 hover:bg-cream-100/50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className="w-8 h-8 mb-2 text-ink-400" />
                        <p className="mb-1 text-xs text-ink-600 font-semibold">Click to upload coin images</p>
                        <p className="text-[10px] text-ink-400 uppercase tracking-wider font-medium">PNG, JPG or JPEG up to 5MB (Upload multiple)</p>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Previews & Existing list */}
                  {(existingImages.length > 0 || imagePreviews.length > 0) && (
                    <div className="mt-4">
                      <p className="text-[10px] font-bold text-ink-500 uppercase tracking-wider mb-2">
                        Select Primary Image & Organize Gallery (Radio selects Featured Image)
                      </p>
                      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-6">
                        {/* Existing Images */}
                        {existingImages.map((img, idx) => (
                          <div key={`existing-${img.id}`} className={`relative rounded-xl overflow-hidden border-2 aspect-square flex flex-col ${
                            primaryIndex === idx ? 'border-gold-500 shadow-md shadow-gold-500/10' : 'border-cream-300'
                          }`}>
                            <img src={img.image} alt="Collectible" className="w-full h-full object-cover" />
                            <div className="absolute top-1.5 left-1.5 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-sans">
                              Existing
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveExistingImage(img.id, idx)}
                              className="absolute top-1.5 right-1.5 bg-red-600 text-white rounded-full p-1 shadow hover:bg-red-500 transition-colors"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                            <label className="absolute bottom-0 inset-x-0 bg-black/50 py-1.5 flex items-center justify-center gap-1.5 text-[10px] text-cream-100 font-sans cursor-pointer hover:bg-black/75">
                              <input
                                type="radio"
                                name="primary_image"
                                checked={primaryIndex === idx}
                                onChange={() => setPrimaryIndex(idx)}
                                className="accent-gold-500 h-3 w-3"
                              />
                              Primary
                            </label>
                          </div>
                        ))}

                        {/* New Upload Previews */}
                        {imagePreviews.map((url, idx) => {
                          const absoluteIdx = existingImages.length + idx
                          return (
                            <div key={`new-${idx}`} className={`relative rounded-xl overflow-hidden border-2 aspect-square flex flex-col ${
                              primaryIndex === absoluteIdx ? 'border-gold-500 shadow-md shadow-gold-500/10' : 'border-cream-300'
                            }`}>
                              <img src={url} alt="New Preview" className="w-full h-full object-cover" />
                              <div className="absolute top-1.5 left-1.5 bg-gold-600 text-ink-900 text-[9px] px-1.5 py-0.5 rounded font-sans font-bold">
                                New
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveNewImage(idx)}
                                className="absolute top-1.5 right-1.5 bg-red-600 text-white rounded-full p-1 shadow hover:bg-red-500 transition-colors"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                              <label className="absolute bottom-0 inset-x-0 bg-black/50 py-1.5 flex items-center justify-center gap-1.5 text-[10px] text-cream-100 font-sans cursor-pointer hover:bg-black/75">
                                <input
                                  type="radio"
                                  name="primary_image"
                                  checked={primaryIndex === absoluteIdx}
                                  onChange={() => setPrimaryIndex(absoluteIdx)}
                                  className="accent-gold-500 h-3 w-3"
                                />
                                Primary
                              </label>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION 4: Collectible Details */}
              <div className="space-y-4">
                <h3 className="font-serif text-base font-bold text-gold-700 border-b border-cream-200 pb-1">
                  4. Collectibles Specifications (Historical Features)
                </h3>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5 uppercase tracking-wide">
                      Obverse Description
                    </label>
                    <input
                      type="text"
                      value={obverse}
                      onChange={(e) => setObverse(e.target.value)}
                      placeholder="e.g. Lion Sri Chamundi Sun & Moon"
                      className="w-full rounded-lg border border-cream-300 bg-cream-50/50 py-2.5 px-4 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5 uppercase tracking-wide">
                      Reverse Description
                    </label>
                    <input
                      type="text"
                      value={reverse}
                      onChange={(e) => setReverse(e.target.value)}
                      placeholder="e.g. Krishna Mayilu with Kannada inscription"
                      className="w-full rounded-lg border border-cream-300 bg-cream-50/50 py-2.5 px-4 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5 uppercase tracking-wide">
                      Denomination
                    </label>
                    <input
                      type="text"
                      value={denomination}
                      onChange={(e) => setDenomination(e.target.value)}
                      placeholder="e.g. XX Cash or 1 Rupee"
                      className="w-full rounded-lg border border-cream-300 bg-cream-50/50 py-2.5 px-4 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5 uppercase tracking-wide">
                      Script / Language
                    </label>
                    <input
                      type="text"
                      value={script}
                      onChange={(e) => setScript(e.target.value)}
                      placeholder="e.g. Kannada, Persian, Sanskrit"
                      className="w-full rounded-lg border border-cream-300 bg-cream-50/50 py-2.5 px-4 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5 uppercase tracking-wide">
                      Authenticity Status
                    </label>
                    <input
                      type="text"
                      value={authenticity}
                      onChange={(e) => setAuthenticity(e.target.value)}
                      placeholder="e.g. Authenticated / Certified NGC VF35"
                      className="w-full rounded-lg border border-cream-300 bg-cream-50/50 py-2.5 px-4 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-ink-700 mb-1.5 uppercase tracking-wide">
                      Provenance (Origin history/previous ownership)
                    </label>
                    <textarea
                      rows={2}
                      value={provenance}
                      onChange={(e) => setProvenance(e.target.value)}
                      placeholder="Specify previous auction cataloguing or ownership details..."
                      className="w-full rounded-lg border border-cream-300 bg-cream-50/50 py-2.5 px-4 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Actions Footer */}
              <div className="border-t border-cream-200 bg-cream-50 p-6 flex justify-end gap-3 rounded-b-2xl">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-lg border border-cream-300 bg-white px-5 py-2.5 text-sm font-semibold text-ink-600 hover:bg-cream-50 transition-colors focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-gold-600 px-6 py-2.5 text-sm font-semibold text-ink-900 hover:bg-gold-500 transition-colors shadow-md focus:outline-none"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products
