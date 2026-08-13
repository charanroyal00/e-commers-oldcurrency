import { useState } from 'react'
import { BarChart3, TrendingUp, TrendingDown, Download, Calendar } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'

const Reports = () => {
  const [dateRange, setDateRange] = useState('last30days')

  const salesData = {
    totalRevenue: 125000,
    totalOrders: 342,
    avgOrderValue: 3655,
    revenueGrowth: 12.5,
    ordersGrowth: 8.3
  }

  const topProducts = [
    { name: '1921 George V Silver Coin', sales: 45, revenue: 67500 },
    { name: 'British India 1947 Half Rupee', sales: 38, revenue: 28500 },
    { name: 'Mughal Empire Gold Mohur', sales: 22, revenue: 15400 },
    { name: 'Republic India First Issue 1950', sales: 19, revenue: 9500 },
    { name: 'Ancient Copper Coin 300 BC', sales: 15, revenue: 4500 }
  ]

  const topSellers = [
    { name: 'Heritage Coins India', orders: 87, revenue: 32100 },
    { name: 'Numismatic Treasures', orders: 64, revenue: 24300 },
    { name: 'Old Currency Hub', orders: 52, revenue: 19800 },
    { name: 'Vintage Notes Collector', orders: 41, revenue: 15600 },
    { name: 'Rare Finds Marketplace', orders: 28, revenue: 8200 }
  ]

  const monthlySales = [
    { month: 'Jan', revenue: 95000, orders: 245 },
    { month: 'Feb', revenue: 108000, orders: 289 },
    { month: 'Mar', revenue: 125000, orders: 342 }
  ]

  return (
    <div>
      <PageHeader 
        category="Analytics" 
        title="Reports Dashboard"
        description="View comprehensive sales and performance reports."
        action={
          <button className="flex items-center gap-2 rounded-lg border-2 border-cream-300 px-4 py-2 font-sans text-sm font-semibold text-ink-700 hover:bg-cream-200">
            <Download className="h-4 w-4" /> Export Report
          </button>
        }
      />

      {/* Date Range Selector */}
      <div className="mb-6 flex items-center gap-3">
        <Calendar className="h-5 w-5 text-ink-500" />
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="rounded-lg border-2 border-cream-300 bg-white px-4 py-2 font-sans text-sm text-ink-900 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
        >
          <option value="last7days">Last 7 Days</option>
          <option value="last30days">Last 30 Days</option>
          <option value="last90days">Last 90 Days</option>
          <option value="thisyear">This Year</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>

      {/* Overview Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border-2 border-cream-300 bg-white p-5 shadow-md">
          <p className="font-sans text-xs font-medium uppercase tracking-widest text-ink-500">Total Revenue</p>
          <div className="mt-2 flex items-end justify-between">
            <p className="font-serif text-3xl font-bold text-ink-900">
              ₹{(salesData.totalRevenue / 1000).toFixed(0)}k
            </p>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="font-sans text-sm font-semibold">+{salesData.revenueGrowth}%</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border-2 border-cream-300 bg-white p-5 shadow-md">
          <p className="font-sans text-xs font-medium uppercase tracking-widest text-ink-500">Total Orders</p>
          <div className="mt-2 flex items-end justify-between">
            <p className="font-serif text-3xl font-bold text-ink-900">{salesData.totalOrders}</p>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="font-sans text-sm font-semibold">+{salesData.ordersGrowth}%</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border-2 border-cream-300 bg-white p-5 shadow-md">
          <p className="font-sans text-xs font-medium uppercase tracking-widest text-ink-500">Avg Order Value</p>
          <div className="mt-2">
            <p className="font-serif text-3xl font-bold text-ink-900">
              ₹{salesData.avgOrderValue.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="rounded-xl border-2 border-cream-300 bg-white p-5 shadow-md">
          <p className="font-sans text-xs font-medium uppercase tracking-widest text-ink-500">Conversion Rate</p>
          <div className="mt-2 flex items-end justify-between">
            <p className="font-serif text-3xl font-bold text-ink-900">3.2%</p>
            <div className="flex items-center gap-1 text-red-600">
              <TrendingDown className="h-4 w-4" />
              <span className="font-sans text-sm font-semibold">-1.2%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Sales Chart */}
        <div className="rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
          <h2 className="mb-4 flex items-center gap-2 font-serif text-lg font-bold text-ink-900">
            <BarChart3 className="h-5 w-5 text-gold-600" />
            Monthly Performance
          </h2>
          <div className="space-y-4">
            {monthlySales.map((data, index) => (
              <div key={index}>
                <div className="mb-1 flex items-center justify-between font-sans text-sm">
                  <span className="font-medium text-ink-700">{data.month} 2024</span>
                  <span className="font-semibold text-ink-900">₹{(data.revenue / 1000).toFixed(0)}k</span>
                </div>
                <div className="h-8 w-full rounded-full bg-cream-200">
                  <div
                    className="h-full rounded-full bg-gold-600"
                    style={{ width: `${(data.revenue / 125000) * 100}%` }}
                  />
                </div>
                <p className="mt-1 font-sans text-xs text-ink-500">{data.orders} orders</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
          <h2 className="mb-4 font-serif text-lg font-bold text-ink-900">Top Products</h2>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between border-b border-cream-200 pb-3 last:border-0">
                <div className="flex-1">
                  <p className="font-sans text-sm font-medium text-ink-900">{product.name}</p>
                  <p className="font-sans text-xs text-ink-500">{product.sales} sales</p>
                </div>
                <p className="font-sans text-sm font-bold text-ink-900">₹{product.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Sellers */}
        <div className="rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md lg:col-span-2">
          <h2 className="mb-4 font-serif text-lg font-bold text-ink-900">Top Performing Sellers</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-cream-300">
                  <th className="px-4 py-3 text-left font-sans text-xs font-semibold uppercase tracking-widest text-ink-500">Rank</th>
                  <th className="px-4 py-3 text-left font-sans text-xs font-semibold uppercase tracking-widest text-ink-500">Seller</th>
                  <th className="px-4 py-3 text-center font-sans text-xs font-semibold uppercase tracking-widest text-ink-500">Orders</th>
                  <th className="px-4 py-3 text-right font-sans text-xs font-semibold uppercase tracking-widest text-ink-500">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topSellers.map((seller, index) => (
                  <tr key={index} className="border-b border-cream-200 last:border-0">
                    <td className="px-4 py-3 font-sans text-sm text-ink-600">#{index + 1}</td>
                    <td className="px-4 py-3 font-sans text-sm font-medium text-ink-900">{seller.name}</td>
                    <td className="px-4 py-3 text-center font-sans text-sm text-ink-700">{seller.orders}</td>
                    <td className="px-4 py-3 text-right font-sans text-sm font-bold text-ink-900">
                      ₹{seller.revenue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
