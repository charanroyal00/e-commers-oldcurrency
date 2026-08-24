import { useState } from 'react'
import { Bell, Package, ShoppingCart, Star, AlertCircle, X } from 'lucide-react'

interface Notification {
  id: number
  type: 'order' | 'review' | 'product' | 'alert'
  title: string
  message: string
  time: string
  read: boolean
}

const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'order',
      title: 'New Order Received',
      message: 'Order #1247 for ₹4,500 from Rajesh Kumar',
      time: '5 min ago',
      read: false
    },
    {
      id: 2,
      type: 'review',
      title: 'New Review Pending',
      message: '4-star review on "1921 George V Silver Coin"',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'product',
      title: 'Low Stock Alert',
      message: 'British India 1947 Half Rupee - Only 2 left',
      time: '2 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'alert',
      title: 'Seller Verification',
      message: 'New seller registration awaiting approval',
      time: '3 hours ago',
      read: true
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'order': return <ShoppingCart className="h-4 w-4 text-blue-600" />
      case 'review': return <Star className="h-4 w-4 text-gold-600" />
      case 'product': return <Package className="h-4 w-4 text-purple-600" />
      case 'alert': return <AlertCircle className="h-4 w-4 text-red-600" />
    }
  }

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-full p-2 text-ink-600 hover:bg-cream-200 focus:outline-none focus:ring-2 focus:ring-gold-500"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />

          {/* Notification Panel */}
          <div className="absolute right-0 top-full z-20 mt-2 w-80 rounded-xl border-2 border-cream-300 bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-cream-300 p-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-ink-900">Notifications</h3>
                {unreadCount > 0 && (
                  <p className="font-sans text-xs text-ink-500">{unreadCount} unread</p>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="font-sans text-xs font-semibold text-gold-600 hover:text-gold-700"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="mx-auto h-12 w-12 text-ink-300" />
                  <p className="mt-2 font-sans text-sm text-ink-500">No notifications</p>
                </div>
              ) : (
                notifications.map(notif => (
                  <div
                    key={notif.id}
                    className={`border-b border-cream-200 p-4 transition-colors hover:bg-cream-50 ${
                      !notif.read ? 'bg-gold-50/30' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        {getIcon(notif.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-sans text-sm font-semibold text-ink-900">
                            {notif.title}
                          </h4>
                          {!notif.read && (
                            <button
                              onClick={() => markAsRead(notif.id)}
                              className="flex-shrink-0 text-ink-400 hover:text-ink-600"
                              aria-label="Mark as read"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                        <p className="mt-1 font-sans text-xs text-ink-600">
                          {notif.message}
                        </p>
                        <p className="mt-1 font-sans text-xs text-ink-400">
                          {notif.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="border-t-2 border-cream-300 p-3 text-center">
                <button className="font-sans text-xs font-semibold text-gold-600 hover:text-gold-700">
                  View all notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default NotificationsDropdown
