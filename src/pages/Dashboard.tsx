import { DollarSign, Package, ShoppingCart, TrendingUp } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  icon: React.ElementType
}

const StatCard = ({ title, value, icon: Icon }: StatCardProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="rounded-full bg-blue-100 p-3">
          <Icon className="h-8 w-8 text-blue-600" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

const Dashboard = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back! Here's what's happening with your marketplace today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="₹0"
          icon={DollarSign}
        />
        <StatCard
          title="Total Products"
          value="0"
          icon={Package}
        />
        <StatCard
          title="Total Orders"
          value="0"
          icon={ShoppingCart}
        />
        <StatCard
          title="Active Sellers"
          value="0"
          icon={TrendingUp}
        />
      </div>

      {/* Recent Activity */}
      <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
        <p className="mt-4 text-gray-600">No activity yet. Data will appear here once the marketplace is live.</p>
      </div>
    </div>
  )
}

export default Dashboard
