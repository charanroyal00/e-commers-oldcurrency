type Status = 'active' | 'inactive' | 'out_of_stock' | 'pending' | 'approved' | 'rejected' |
              'placed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

const colorMap: Record<Status, string> = {
  active:       'bg-green-100 text-green-800 border-green-200',
  approved:     'bg-green-100 text-green-800 border-green-200',
  delivered:    'bg-green-100 text-green-800 border-green-200',
  inactive:     'bg-gray-100 text-gray-600 border-gray-200',
  out_of_stock: 'bg-gray-100 text-gray-600 border-gray-200',
  pending:      'bg-yellow-100 text-yellow-800 border-yellow-200',
  placed:       'bg-blue-100 text-blue-800 border-blue-200',
  processing:   'bg-blue-100 text-blue-800 border-blue-200',
  shipped:      'bg-purple-100 text-purple-800 border-purple-200',
  rejected:     'bg-red-100 text-red-700 border-red-200',
  cancelled:    'bg-red-100 text-red-700 border-red-200',
}

interface StatusBadgeProps {
  status: Status
}

const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-sans text-xs font-medium capitalize ${colorMap[status]}`}>
    {status.replace(/_/g, ' ')}
  </span>
)

export default StatusBadge
