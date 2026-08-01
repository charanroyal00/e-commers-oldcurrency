import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../../services/api'

const AdminLogin = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      try {
        await authAPI.login({ email: formData.email, password: formData.password })
        navigate('/dashboard')
      } catch (err: any) {
        setErrors((prev) => ({ ...prev, password: err.message || 'Login failed' }))
      }
    }
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900 px-4">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-700/10 via-ink-900 to-ink-900" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-ink-700 bg-ink-800 p-8 shadow-2xl">
          {/* Logo & Title */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-gold-500 bg-gold-600/20 shadow-lg shadow-gold-600/10">
              <ShieldCheck className="h-8 w-8 text-gold-400" />
            </div>
            <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-gold-500">
              The Archive
            </p>
            <h1 className="mt-1 font-serif text-2xl font-bold text-cream-100">Admin Portal</h1>
            <p className="mt-1 font-sans text-sm text-ink-400">
              Old Currency Marketplace — Admin Access
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="mb-5">
              <label
                htmlFor="admin-email"
                className="mb-2 block font-sans text-sm font-medium text-ink-300"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@example.com"
                  className={`w-full rounded-lg border bg-ink-900 py-3 pl-10 pr-4 font-sans text-sm text-cream-100 placeholder-ink-500 focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                    errors.email ? 'border-red-500' : 'border-ink-700'
                  }`}
                  aria-describedby={errors.email ? 'admin-email-error' : undefined}
                />
              </div>
              {errors.email && (
                <p id="admin-email-error" className="mt-1 font-sans text-xs text-red-400" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="admin-password"
                className="mb-2 block font-sans text-sm font-medium text-ink-300"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full rounded-lg border bg-ink-900 py-3 pl-10 pr-12 font-sans text-sm text-cream-100 placeholder-ink-500 focus:outline-none focus:ring-2 focus:ring-gold-500 ${
                    errors.password ? 'border-red-500' : 'border-ink-700'
                  }`}
                  aria-describedby={errors.password ? 'admin-password-error' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-300 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p id="admin-password-error" className="mt-1 font-sans text-xs text-red-400" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-gold-600 py-3 font-sans text-sm font-semibold text-ink-900 transition-colors hover:bg-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-ink-800"
            >
              Sign In as Admin
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center font-sans text-xs italic text-ink-600">
            This portal is restricted to authorized administrators only.
          </p>
        </div>

        {/* Bottom note */}
        <p className="mt-4 text-center font-sans text-xs text-ink-500">
          Are you a seller?{' '}
          <a href="/seller/login" className="text-gold-500 hover:text-gold-400 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  )
}

export default AdminLogin
