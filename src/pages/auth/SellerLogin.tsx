import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, Store } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const SellerLogin = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })

  const validate = () => {
    const newErrors = { email: '', password: '' }
    let valid = true

    if (!formData.email) {
      newErrors.email = 'Email is required'
      valid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address'
      valid = false
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
      valid = false
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      // TODO: connect to Django API POST /api/login/
      navigate('/dashboard')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
          {/* Logo & Title */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 shadow-lg shadow-amber-500/30">
              <Store className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Seller Login</h1>
            <p className="mt-1 text-sm text-gray-500">
              Old Currency Marketplace — Seller Portal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="mb-5">
              <label
                htmlFor="seller-email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  id="seller-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seller@example.com"
                  className={`w-full rounded-lg border bg-white py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    errors.email
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-gray-300'
                  }`}
                  aria-describedby={errors.email ? 'seller-email-error' : undefined}
                />
              </div>
              {errors.email && (
                <p id="seller-email-error" className="mt-1 text-xs text-red-500" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-2">
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="seller-password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-amber-600 hover:text-amber-700 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  id="seller-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full rounded-lg border bg-white py-3 pl-10 pr-12 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    errors.password
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-gray-300'
                  }`}
                  aria-describedby={errors.password ? 'seller-password-error' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p id="seller-password-error" className="mt-1 text-xs text-red-500" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-amber-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              Sign In as Seller
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">New to the platform?</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Register link */}
          <a
            href="#"
            className="block w-full rounded-lg border border-amber-500 py-3 text-center text-sm font-semibold text-amber-600 transition-colors hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            Register as a Seller
          </a>
        </div>

        {/* Bottom note */}
        <p className="mt-4 text-center text-xs text-gray-500">
          Are you an admin?{' '}
          <a
            href="/admin/login"
            className="text-amber-600 hover:text-amber-700 hover:underline"
          >
            Admin login
          </a>
        </p>
      </div>
    </div>
  )
}

export default SellerLogin
