import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Package, ShoppingCart, Store,
  Users, BarChart3, Settings, X, Tag, Warehouse, ClipboardList, MessageSquare, FileText,
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
  { name: 'Dashboard',          path: '/dashboard',    icon: LayoutDashboard },
  { name: 'Products',           path: '/products',     icon: Package         },
  { name: 'Categories',         path: '/categories',   icon: Tag             },
  { name: 'Inventory',          path: '/inventory',    icon: Warehouse       },
  { name: 'Seller Inventory',   path: '/seller-inventory', icon: ClipboardList },
  { name: 'Orders',             path: '/orders',       icon: ShoppingCart    },
  { name: 'Reviews',            path: '/reviews',      icon: MessageSquare   },
  { name: 'Sellers',            path: '/sellers',      icon: Store           },
  { name: 'Customers',          path: '/customers',    icon: Users           },
  { name: 'Reports',            path: '/reports',      icon: FileText        },
  { name: 'Analytics',          path: '/analytics',    icon: BarChart3       },
  { name: 'Settings',           path: '/settings',     icon: Settings        },
]

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r-2 border-ink-700 bg-ink-900 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-ink-800 px-6">
        <div>
          <p className="font-serif text-xs font-normal tracking-[0.2em] text-gold-500 uppercase">
            The Archive
          </p>
          <h1 className="font-serif text-lg font-bold leading-tight text-cream-100">
            Currency Admin
          </h1>
        </div>
        <button
          onClick={onClose}
          className="rounded p-1 text-ink-400 hover:text-cream-100 lg:hidden focus:outline-none focus:ring-2 focus:ring-gold-500"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6" aria-label="Main navigation">
        <p className="mb-3 px-3 text-xs font-normal tracking-[0.15em] text-ink-500 uppercase">
          Navigation
        </p>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-sans transition-all duration-150 ${
                      isActive
                        ? 'bg-gold-600 text-ink-900 font-semibold'
                        : 'text-ink-400 hover:bg-ink-800 hover:text-cream-100'
                    }`
                  }
                >
                  <Icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-ink-800 px-6 py-4">
        <p className="font-serif text-xs italic text-ink-600">
          "History Has Value."
        </p>
        <p className="mt-1 font-sans text-xs text-ink-600">
          © 2024 Currency Marketplace
        </p>
      </div>
    </aside>
  )
}

export default Sidebar
