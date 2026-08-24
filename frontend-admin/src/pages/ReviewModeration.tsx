import { useState } from 'react'
import { Star, ThumbsUp, ThumbsDown, AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'

interface Review {
  id: number
  product: {
    id: number
    name: string
  }
  customer: {
    id: number
    name: string
    email: string
  }
  rating: number
  comment: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

const ReviewModeration = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      product: { id: 101, name: '1921 George V One Rupee Silver Coin' },
      customer: { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com' },
      rating: 5,
      comment: 'Excellent coin in perfect condition. Authentic and well-packaged. Highly recommend this seller!',
      status: 'pending',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      product: { id: 102, name: 'British India 1947 Half Rupee' },
      customer: { id: 2, name: 'Priya Sharma', email: 'priya@example.com' },
      rating: 2,
      comment: 'Not as described. Condition was poor and overpriced.',
      status: 'pending',
      createdAt: '2024-01-15T09:15:00Z'
    },
    {
      id: 3,
      product: { id: 103, name: 'Mughal Empire Gold Mohur 1650' },
      customer: { id: 3, name: 'Amit Patel', email: 'amit@example.com' },
      rating: 4,
      comment: 'Good quality historical coin. Delivery was fast and secure.',
      status: 'approved',
      createdAt: '2024-01-14T16:45:00Z'
    },
  ])

  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')
  const [processing, setProcessing] = useState<number | null>(null)

  const handleApprove = async (reviewId: number) => {
    setProcessing(reviewId)
    // TODO: API call to approve review
    // await reviewsService.approveReview(reviewId)
    
    setTimeout(() => {
      setReviews(prev => prev.map(r => 
        r.id === reviewId ? { ...r, status: 'approved' as const } : r
      ))
      setProcessing(null)
    }, 500)
  }

  const handleReject = async (reviewId: number) => {
    setProcessing(reviewId)
    // TODO: API call to reject review
    // await reviewsService.rejectReview(reviewId)
    
    setTimeout(() => {
      setReviews(prev => prev.map(r => 
        r.id === reviewId ? { ...r, status: 'rejected' as const } : r
      ))
      setProcessing(null)
    }, 500)
  }

  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(r => r.status === filter)

  const pendingCount = reviews.filter(r => r.status === 'pending').length
  const approvedCount = reviews.filter(r => r.status === 'approved').length
  const rejectedCount = reviews.filter(r => r.status === 'rejected').length

  return (
    <div>
      <PageHeader 
        category="Content Management" 
        title="Review Moderation"
        description="Approve or reject customer reviews before they appear on the marketplace."
      />

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border-2 border-cream-300 bg-white p-4 shadow-md text-center">
          <div className="flex items-center justify-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <p className="font-sans text-xs uppercase tracking-widest text-ink-500">Pending</p>
          </div>
          <p className="mt-2 font-serif text-3xl font-bold text-yellow-700">{pendingCount}</p>
        </div>
        <div className="rounded-xl border-2 border-cream-300 bg-white p-4 shadow-md text-center">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="font-sans text-xs uppercase tracking-widest text-ink-500">Approved</p>
          </div>
          <p className="mt-2 font-serif text-3xl font-bold text-green-700">{approvedCount}</p>
        </div>
        <div className="rounded-xl border-2 border-cream-300 bg-white p-4 shadow-md text-center">
          <div className="flex items-center justify-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />
            <p className="font-sans text-xs uppercase tracking-widest text-ink-500">Rejected</p>
          </div>
          <p className="mt-2 font-serif text-3xl font-bold text-red-700">{rejectedCount}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2">
        {[
          { key: 'all', label: 'All Reviews' },
          { key: 'pending', label: 'Pending' },
          { key: 'approved', label: 'Approved' },
          { key: 'rejected', label: 'Rejected' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as typeof filter)}
            className={`rounded-lg px-4 py-2 font-sans text-sm font-semibold transition-colors ${
              filter === tab.key
                ? 'bg-gold-600 text-ink-900'
                : 'border-2 border-cream-300 text-ink-700 hover:bg-cream-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="rounded-xl border-2 border-cream-300 bg-white p-16 text-center shadow-md">
            <AlertCircle className="mx-auto h-12 w-12 text-ink-300" />
            <p className="mt-4 font-serif text-lg text-ink-600">No {filter !== 'all' && filter} reviews</p>
            <p className="mt-1 font-sans text-sm text-ink-400">
              {filter === 'pending' && 'All reviews have been moderated.'}
              {filter === 'approved' && 'No approved reviews yet.'}
              {filter === 'rejected' && 'No rejected reviews yet.'}
              {filter === 'all' && 'No reviews submitted yet.'}
            </p>
          </div>
        ) : (
          filteredReviews.map(review => (
            <div key={review.id} className="rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Product & Customer Info */}
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-ink-900">{review.product.name}</h3>
                      <p className="mt-1 font-sans text-sm text-ink-500">
                        By {review.customer.name} • {review.customer.email}
                      </p>
                      <p className="mt-0.5 font-sans text-xs text-ink-400">
                        {new Date(review.createdAt).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    
                    {/* Status Badge */}
                    <div>
                      {review.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1 font-sans text-xs font-medium text-yellow-800">
                          <AlertCircle className="h-3 w-3" /> Pending Review
                        </span>
                      )}
                      {review.status === 'approved' && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-100 px-3 py-1 font-sans text-xs font-medium text-green-800">
                          <CheckCircle className="h-3 w-3" /> Approved
                        </span>
                      )}
                      {review.status === 'rejected' && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-100 px-3 py-1 font-sans text-xs font-medium text-red-800">
                          <XCircle className="h-3 w-3" /> Rejected
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-3 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= review.rating 
                            ? 'fill-gold-500 text-gold-500' 
                            : 'text-cream-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 font-sans text-sm font-semibold text-ink-700">
                      {review.rating}.0 / 5.0
                    </span>
                  </div>

                  {/* Comment */}
                  <div className="mb-4 rounded-lg border border-cream-300 bg-cream-50 p-4">
                    <p className="font-sans text-sm leading-relaxed text-ink-800">
                      "{review.comment}"
                    </p>
                  </div>

                  {/* Action Buttons */}
                  {review.status === 'pending' && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApprove(review.id)}
                        disabled={processing === review.id}
                        className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        {processing === review.id ? 'Approving...' : 'Approve'}
                      </button>
                      <button
                        onClick={() => handleReject(review.id)}
                        disabled={processing === review.id}
                        className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-sans text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <ThumbsDown className="h-4 w-4" />
                        {processing === review.id ? 'Rejecting...' : 'Reject'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ReviewModeration
