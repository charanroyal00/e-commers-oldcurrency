import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import type { RegistrationData } from '../../pages/auth/SellerRegister'
import FormField from './FormField'

interface Props {
  data: RegistrationData
  onChange: (fields: Partial<RegistrationData>) => void
  onNext: () => void
}

const StepBasicInfo = ({ data, onChange, onNext }: Props) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!data.fullName.trim())       e.fullName = 'Full name is required'
    if (!data.email.trim())          e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Enter a valid email'
    if (!data.phone.trim())          e.phone = 'Phone number is required'
    else if (!/^\d{10}$/.test(data.phone)) e.phone = 'Enter a valid 10-digit phone number'
    if (!data.password)              e.password = 'Password is required'
    else if (data.password.length < 8) e.password = 'Password must be at least 8 characters'
    if (!data.confirmPassword)       e.confirmPassword = 'Please confirm your password'
    else if (data.password !== data.confirmPassword) e.confirmPassword = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) onNext()
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="mb-1 font-serif text-xl font-bold text-ink-900">Basic Information</h2>
      <p className="mb-6 font-sans text-sm text-ink-500">Tell us about yourself to get started.</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full Name" id="fullName" error={errors.fullName} className="sm:col-span-2">
          <input id="fullName" type="text" placeholder="Your full name"
            value={data.fullName} onChange={(e) => onChange({ fullName: e.target.value })}
            className={inputClass(errors.fullName)} />
        </FormField>

        <FormField label="Email Address" id="email" error={errors.email}>
          <input id="email" type="email" placeholder="you@example.com"
            value={data.email} onChange={(e) => onChange({ email: e.target.value })}
            className={inputClass(errors.email)} />
        </FormField>

        <FormField label="Phone Number" id="phone" error={errors.phone}>
          <input id="phone" type="tel" placeholder="10-digit mobile number"
            value={data.phone} onChange={(e) => onChange({ phone: e.target.value })}
            className={inputClass(errors.phone)} />
        </FormField>

        <FormField label="Password" id="password" error={errors.password}>
          <div className="relative">
            <input id="password" type={showPassword ? 'text' : 'password'} placeholder="Min. 8 characters"
              value={data.password} onChange={(e) => onChange({ password: e.target.value })}
              className={inputClass(errors.password) + ' pr-10'} />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
              aria-label={showPassword ? 'Hide' : 'Show'}>
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </FormField>

        <FormField label="Confirm Password" id="confirmPassword" error={errors.confirmPassword}>
          <div className="relative">
            <input id="confirmPassword" type={showConfirm ? 'text' : 'password'} placeholder="Re-enter password"
              value={data.confirmPassword} onChange={(e) => onChange({ confirmPassword: e.target.value })}
              className={inputClass(errors.confirmPassword) + ' pr-10'} />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
              aria-label={showConfirm ? 'Hide' : 'Show'}>
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </FormField>
      </div>

      <div className="mt-8 flex justify-end">
        <button type="submit"
          className="rounded-lg bg-gold-600 px-8 py-3 font-sans text-sm font-semibold text-ink-900 transition-colors hover:bg-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500">
          Next: Shop Details →
        </button>
      </div>
    </form>
  )
}

const inputClass = (error?: string) =>
  `w-full rounded-lg border bg-cream-100 py-2.5 px-3 font-sans text-sm text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-gold-500/40 ${error ? 'border-red-400' : 'border-cream-300'}`

export default StepBasicInfo
