import { useState } from 'react'
import type { RegistrationData } from '../../pages/auth/SellerRegister'
import FormField from './FormField'

interface Props {
  data: RegistrationData
  onChange: (fields: Partial<RegistrationData>) => void
  onNext: () => void
  onBack: () => void
}

const CATEGORIES = [
  'Ancient Coins', 'British India Notes', 'Republic India Notes',
  'Mughal Coins', 'World Coins', 'Commemorative Coins',
  'Error & Misprint Notes', 'Fancy Number Notes', 'Other',
]

const inputClass = (error?: string) =>
  `w-full rounded-lg border bg-cream-100 py-2.5 px-3 font-sans text-sm text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-gold-500/40 ${error ? 'border-red-400' : 'border-cream-300'}`

const StepShopDetails = ({ data, onChange, onNext, onBack }: Props) => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!data.shopName.trim())  e.shopName = 'Shop name is required'
    if (!data.category)         e.category = 'Please select a category'
    if (data.gstNumber && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(data.gstNumber))
      e.gstNumber = 'Enter a valid GST number (e.g. 29ABCDE1234F1Z5)'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) onNext()
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="mb-1 font-serif text-xl font-bold text-ink-900">Shop Details</h2>
      <p className="mb-6 font-sans text-sm text-ink-500">Tell buyers about your shop and what you sell.</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Shop Name" id="shopName" error={errors.shopName} className="sm:col-span-2">
          <input id="shopName" type="text" placeholder="e.g. Vintage Coins India"
            value={data.shopName} onChange={(e) => onChange({ shopName: e.target.value })}
            className={inputClass(errors.shopName)} />
        </FormField>

        <FormField label="Primary Category" id="category" error={errors.category}>
          <select id="category" value={data.category}
            onChange={(e) => onChange({ category: e.target.value })}
            className={inputClass(errors.category)}>
            <option value="">Select a category</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </FormField>

        <FormField label="GST Number" id="gstNumber" error={errors.gstNumber}
          hint="Optional — required for GST invoice generation">
          <input id="gstNumber" type="text" placeholder="29ABCDE1234F1Z5"
            value={data.gstNumber} onChange={(e) => onChange({ gstNumber: e.target.value.toUpperCase() })}
            className={inputClass(errors.gstNumber)} maxLength={15} />
        </FormField>

        <FormField label="Shop Description" id="description" className="sm:col-span-2"
          hint="Briefly describe your shop and the type of items you sell">
          <textarea id="description" rows={3} placeholder="We specialise in rare British India coins and notes..."
            value={data.description} onChange={(e) => onChange({ description: e.target.value })}
            className={inputClass() + ' resize-none'} />
        </FormField>
      </div>

      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack}
          className="rounded-lg border-2 border-cream-300 px-6 py-3 font-sans text-sm font-semibold text-ink-700 transition-colors hover:bg-cream-200">
          ← Back
        </button>
        <button type="submit"
          className="rounded-lg bg-gold-600 px-8 py-3 font-sans text-sm font-semibold text-ink-900 transition-colors hover:bg-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500">
          Next: KYC Documents →
        </button>
      </div>
    </form>
  )
}

export default StepShopDetails
