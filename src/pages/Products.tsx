import { Package } from 'lucide-react'

const Products = () => (
  <div>
    <div className="mb-8">
      <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-gold-600">
        Catalogue
      </p>
      <h1 className="mt-1 font-serif text-3xl font-bold text-ink-900">Products</h1>
      <p className="mt-2 font-sans text-sm text-ink-500">
        Manage all old currency listings in the marketplace.
      </p>
    </div>
    <div className="rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-cream-300 bg-cream-200">
          <Package className="h-7 w-7 text-ink-400" />
        </div>
        <p className="font-serif text-base text-ink-600">No products listed yet</p>
        <p className="mt-1 font-sans text-sm text-ink-400">Products will appear here once added.</p>
      </div>
    </div>
  </div>
)

export default Products
