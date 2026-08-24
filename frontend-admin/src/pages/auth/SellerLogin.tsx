import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, Store } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const SellerLogin = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '', general: '' })
  const [isLoading, setIsLoading] = useState(false)

  const validate = () => {
    const newErrors = { email: '', password: '', general: '' }
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
    setErrors((prev) => ({ ...prev, [name]: '', general: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    setErrors({ email: '', password: '', general: '' })

    try {
      await login(formData.email, formData.password)
      navigate('/dashboard')
    } catch (error) {
      if (error instanceof Error) {
        setErrors(prev => ({ ...prev, general: error.message }))
      } else {
        setErrors(prev => ({ ...prev, general: 'Network error. Please try again.' }))
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-100 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-cream-300 bg-cream-50 p-8 shadow-xl">
          {/* Logo & Title */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-gold-400 bg-gold-500/10 shadow-lg shadow-gold-500/10">
              <Store className="h-8 w-8 text-gold-600" />
            </div>
            <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-gold-600">
              Merchant Portal
            </p>
            <h1 className="mt-1 font-serif text-2xl font-bold text-ink-900">Seller Login</h1>
            <p className="mt-1 font-sans text-sm text-ink-500">
              Old Currency Marketplace — Seller Access
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* General Error */}
            {errors.general && (
              <div className="mb-5 rounded-lg border border-red-400/20 bg-red-400/10 p-3">
                <p className="font-sans text-sm text-red-600" role="alert">
                  {errors.general}
                </p>
              </div>
            )}
            {/* Email */}
            <div className="mb-5">
              <label
                htmlFor="seller-email"
                className="mb-2 block font-sans text-sm font-medium text-ink-700"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                <input
                  id="seller-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seller@example.com"
                  className={`w-full rounded-lg border bg-cream-100 py-3 pl-10 pr-4 font-sans text-sm text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-gold-500/40 ${
                    errors.email ? 'border-red-400' : 'border-cream-300'
                  }`}
                  aria-describedby={errors.email ? 'seller-email-error' : undefined}
                />
              </div>
              {errors.email && (
                <p id="seller-email-error" className="mt-1 font-sans text-xs text-red-500" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-2">
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="seller-password" className="font-sans text-sm font-medium text-ink-700">
                  Password
                </label>
                <a href="#" className="font-sans text-xs text-gold-600 hover:text-gold-700 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                <input
                  id="seller-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full rounded-lg border bg-cream-100 py-3 pl-10 pr-12 font-sans text-sm text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-gold-500/40 ${
                    errors.password ? 'border-red-400' : 'border-cream-300'
                  }`}
                  aria-describedby={errors.password ? 'seller-password-error' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p id="seller-password-error" className="mt-1 font-sans text-xs text-red-500" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full rounded-lg bg-gold-600 py-3 font-sans text-sm font-semibold text-ink-900 transition-colors hover:bg-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? 'Signing In...' : 'Sign In as Seller'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-cream-300" />
            <span className="font-serif text-xs italic text-ink-400">New to the platform?</span>
            <div className="h-px flex-1 bg-cream-300" />
          </div>

          {/* Register */}
          <a
            href="/seller/register"
            className="block w-full rounded-lg border border-gold-500 py-3 text-center font-sans text-sm font-semibold text-gold-700 transition-colors hover:bg-gold-500/10 focus:outline-none focus:ring-2 focus:ring-gold-500"
          >
            Register as a Seller
          </a>
        </div>

        {/* Bottom note */}
        <p className="mt-4 text-center font-sans text-xs text-ink-500">
          Are you an admin?{' '}
          <a href="/admin/login" className="text-gold-600 hover:text-gold-700 hover:underline">
            Admin login
          </a>
        </p>
      </div>
    </div>
  )
}

export default SellerLogin
