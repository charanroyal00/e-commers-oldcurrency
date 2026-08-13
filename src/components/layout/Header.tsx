import { Menu, Search, User, LogOut } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import NotificationsDropdown from './NotificationsDropdown'

interface HeaderProps {
  onMenuClick: () => void
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b-2 border-cream-300 bg-cream-100 px-4 md:px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-ink-600 hover:bg-cream-200 focus:outline-none focus:ring-2 focus:ring-gold-500 lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            type="search"
            placeholder="Search collections..."
            className="w-64 rounded-lg border border-cream-300 bg-cream-50 py-2 pl-9 pr-4 font-sans text-sm text-ink-800 placeholder-ink-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
            aria-label="Search"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1 md:gap-3">
        {/* Notifications */}
        <NotificationsDropdown />

        {/* Divider */}
        <div className="hidden h-6 w-px bg-cream-300 md:block" aria-hidden="true" />

        {/* User */}
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-ink-700 hover:bg-cream-200 focus:outline-none focus:ring-2 focus:ring-gold-500"
            aria-label="User menu"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-500 bg-gold-600 text-ink-900">
              <User className="h-4 w-4" />
            </div>
            <span className="hidden font-sans text-sm font-medium text-ink-800 md:block">
              {user?.username || 'User'}
            </span>
          </button>
          
          <button
            onClick={handleLogout}
            className="rounded-lg p-2 text-ink-600 hover:bg-cream-200 focus:outline-none focus:ring-2 focus:ring-gold-500"
            aria-label="Logout"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
