import { useState, useRef } from 'react'
import { UploadCloud, FileCheck } from 'lucide-react'
import type { RegistrationData } from '../../pages/auth/SellerRegister'
import FormField from './FormField'

interface Props {
  data: RegistrationData
  onChange: (fields: Partial<RegistrationData>) => void
  onNext: () => void
  onBack: () => void
}

const inputClass = (error?: string) =>
  `w-full rounded-lg border bg-cream-100 py-2.5 px-3 font-sans text-sm text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-gold-500/40 ${error ? 'border-red-400' : 'border-cream-300'}`

const FileUpload = ({ label, file, onChange, id }: {
  label: string; file: File | null;
  onChange: (f: File | null) => void; id: string
}) => {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div>
      <p className="mb-1.5 font-sans text-sm font-medium text-ink-700">{label}</p>
      <button type="button" onClick={() => ref.current?.click()}
        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-cream-300 bg-cream-100 py-4 text-ink-500 transition-colors hover:border-gold-400 hover:bg-gold-500/5">
        {file
          ? <><FileCheck className="h-5 w-5 text-gold-600" /><span className="font-sans text-sm text-ink-700">{file.name}</span></>
          : <><UploadCloud className="h-5 w-5" /><span className="font-sans text-sm">Click to upload (PDF, JPG, PNG)</span></>
        }
      </button>
      <input ref={ref} id={id} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)} />
    </div>
  )
}

const StepKYC = ({ data, onChange, onNext, onBack }: Props) => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!data.aadhaarNumber.trim())        e.aadhaarNumber = 'Aadhaar number is required'
    else if (!/^\d{12}$/.test(data.aadhaarNumber)) e.aadhaarNumber = 'Enter a valid 12-digit Aadhaar number'
    if (!data.panNumber.trim())            e.panNumber = 'PAN number is required'
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(data.panNumber)) e.panNumber = 'Enter a valid PAN (e.g. ABCDE1234F)'
    if (!data.bankAccount.trim())          e.bankAccount = 'Bank account number is required'
    if (!data.ifscCode.trim())             e.ifscCode = 'IFSC code is required'
    else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(data.ifscCode)) e.ifscCode = 'Enter a valid IFSC code'
    if (!data.aadhaarFile)                 e.aadhaarFile = 'Please upload your Aadhaar document'
    if (!data.panFile)                     e.panFile = 'Please upload your PAN document'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) onNext()
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="mb-1 font-serif text-xl font-bold text-ink-900">KYC & Documents</h2>
      <p className="mb-6 font-sans text-sm text-ink-500">Required for account verification. All data is encrypted and secure.</p>

      {/* Identity */}
      <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-widest text-gold-600">Identity Verification</p>
      <div className="mb-5 grid gap-5 sm:grid-cols-2">
        <FormField label="Aadhaar Number" id="aadhaarNumber" error={errors.aadhaarNumber}>
          <input id="aadhaarNumber" type="text" placeholder="12-digit Aadhaar number"
            value={data.aadhaarNumber} onChange={(e) => onChange({ aadhaarNumber: e.target.value })}
            className={inputClass(errors.aadhaarNumber)} maxLength={12} />
        </FormField>
        <FormField label="PAN Number" id="panNumber" error={errors.panNumber}>
          <input id="panNumber" type="text" placeholder="e.g. ABCDE1234F"
            value={data.panNumber} onChange={(e) => onChange({ panNumber: e.target.value.toUpperCase() })}
            className={inputClass(errors.panNumber)} maxLength={10} />
        </FormField>
        <div className="sm:col-span-2">
          <FileUpload label="Upload Aadhaar Document" file={data.aadhaarFile}
            onChange={(f) => onChange({ aadhaarFile: f })} id="aadhaarFile" />
          {errors.aadhaarFile && <p className="mt-1 font-sans text-xs text-red-500">{errors.aadhaarFile}</p>}
        </div>
        <div className="sm:col-span-2">
          <FileUpload label="Upload PAN Document" file={data.panFile}
            onChange={(f) => onChange({ panFile: f })} id="panFile" />
          {errors.panFile && <p className="mt-1 font-sans text-xs text-red-500">{errors.panFile}</p>}
        </div>
      </div>

      {/* Bank */}
      <div className="my-5 h-px bg-cream-200" />
      <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-widest text-gold-600">Bank Details</p>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Bank Account Number" id="bankAccount" error={errors.bankAccount} className="sm:col-span-2">
          <input id="bankAccount" type="text" placeholder="Your bank account number"
            value={data.bankAccount} onChange={(e) => onChange({ bankAccount: e.target.value })}
            className={inputClass(errors.bankAccount)} />
        </FormField>
        <FormField label="IFSC Code" id="ifscCode" error={errors.ifscCode}>
          <input id="ifscCode" type="text" placeholder="e.g. SBIN0001234"
            value={data.ifscCode} onChange={(e) => onChange({ ifscCode: e.target.value.toUpperCase() })}
            className={inputClass(errors.ifscCode)} maxLength={11} />
        </FormField>
      </div>

      {/* Notice */}
      <div className="mt-5 rounded-lg border border-gold-400 bg-gold-500/5 p-3">
        <p className="font-sans text-xs text-ink-600">
          🔒 Your KYC documents are encrypted and used only for identity verification. They will not be shared with third parties.
        </p>
      </div>

      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack}
          className="rounded-lg border-2 border-cream-300 px-6 py-3 font-sans text-sm font-semibold text-ink-700 transition-colors hover:bg-cream-200">
          ← Back
        </button>
        <button type="submit"
          className="rounded-lg bg-gold-600 px-8 py-3 font-sans text-sm font-semibold text-ink-900 transition-colors hover:bg-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500">
          Next: Review →
        </button>
      </div>
    </form>
  )
}

export default StepKYC
