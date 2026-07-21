import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Store,
  Users,
  BarChart3,
  Settings,
  X,
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

interface NavItem {
  name: string
  path: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', path: '/products', icon: Package },
  { name: 'Orders', path: '/orders', icon: ShoppingCart },
  { name: 'Sellers', path: '/sellers', icon: Store },
  { name: 'Customers', path: '/customers', icon: Users },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Settings', path: '/settings', icon: Settings },
]

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-gray-900 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo & Close Button */}
          <div className="flex h-16 items-center justify-between border-b border-gray-800 px-6">
            <h1 className="text-xl font-bold text-white">
              Currency Admin
            </h1>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-800 hover:text-white lg:hidden"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`
                  }
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span>{item.name}</span>
                </NavLink>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-800 p-4">
            <p className="text-center text-xs text-gray-500">
              © 2024 Currency Marketplace
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
