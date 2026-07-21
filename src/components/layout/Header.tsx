import { Bell, Menu, Search, User } from 'lucide-react'

interface HeaderProps {
  onMenuClick: () => void
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm md:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search..."
            className="w-64 rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notifications */}
        <button
          className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Notifications"
        >
          <Bell className="h-6 w-6" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User Menu */}
        <button
          className="flex items-center gap-2 rounded-lg p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="User menu"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
            <User className="h-5 w-5" />
          </div>
          <span className="hidden text-sm font-medium text-gray-700 md:block">
            Admin
          </span>
        </button>
      </div>
    </header>
  )
}

export default Header
