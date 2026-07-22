import { DollarSign, Package, ShoppingCart, Store } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  icon: React.ElementType
}

const StatCard = ({ title, value, icon: Icon }: StatCardProps) => (
  <div className="rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
    <div className="flex items-start justify-between">
      <div>
        <p className="font-sans text-xs font-medium uppercase tracking-widest text-ink-500">
          {title}
        </p>
        <p className="mt-3 font-serif text-4xl font-bold text-ink-900">{value}</p>
      </div>
      <div className="rounded-full border-2 border-gold-400 bg-gold-500/10 p-3">
        <Icon className="h-6 w-6 text-gold-600" aria-hidden="true" />
      </div>
    </div>
    {/* Decorative bottom bar */}
    <div className="mt-6 h-px bg-cream-300" />
    <p className="mt-3 font-sans text-xs text-ink-400">
      Data will update once marketplace is live
    </p>
  </div>
)

const Dashboard = () => {
  return (
    <div>
      {/* Page heading */}
      <div className="mb-8">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-gold-600">
          Overview
        </p>
        <h1 className="mt-1 font-serif text-3xl font-bold text-ink-900">Dashboard</h1>
        <p className="mt-2 font-sans text-sm text-ink-500">
          Welcome back. Here's the current state of your marketplace.
        </p>
      </div>

      {/* Decorative divider */}
      <div className="mb-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-cream-300" />
        <span className="font-serif text-xs italic text-ink-400">The Archive Awaits</span>
        <div className="h-px flex-1 bg-cream-300" />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue"   value="₹0" icon={DollarSign}  />
        <StatCard title="Total Products"  value="0"  icon={Package}     />
        <StatCard title="Total Orders"    value="0"  icon={ShoppingCart} />
        <StatCard title="Active Sellers"  value="0"  icon={Store}       />
      </div>

      {/* Recent Activity */}
      <div className="mt-8 rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-ink-900">Recent Activity</h2>
          <span className="font-sans text-xs text-ink-400 uppercase tracking-widest">Live Feed</span>
        </div>
        <div className="h-px bg-cream-300" />
        <div className="flex flex-col items-center justify-center py-12">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-cream-300 bg-cream-200">
            <Package className="h-7 w-7 text-ink-400" aria-hidden="true" />
          </div>
          <p className="font-serif text-base text-ink-600">No activity yet</p>
          <p className="mt-1 font-sans text-sm text-ink-400">
            Data will appear here once the marketplace is live.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
