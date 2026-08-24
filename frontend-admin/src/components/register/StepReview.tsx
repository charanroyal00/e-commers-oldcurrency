import { FileCheck } from 'lucide-react'
import type { RegistrationData } from '../../pages/auth/SellerRegister'

interface Props {
  data: RegistrationData
  onBack: () => void
  onSubmit: () => void
  isLoading?: boolean
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between gap-4 py-2.5">
    <span className="font-sans text-sm text-ink-500 shrink-0">{label}</span>
    <span className="font-sans text-sm font-medium text-ink-900 text-right break-all">{value || '—'}</span>
  </div>
)

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-widest text-gold-600">{title}</p>
    <div className="divide-y divide-cream-200 rounded-xl border-2 border-cream-300 bg-cream-50 px-4">
      {children}
    </div>
  </div>
)

const StepReview = ({ data, onBack, onSubmit, isLoading = false }: Props) => (
  <div>
    <h2 className="mb-1 font-serif text-xl font-bold text-ink-900">Review & Submit</h2>
    <p className="mb-6 font-sans text-sm text-ink-500">Please review your information before submitting.</p>

    <Section title="Basic Information">
      <Row label="Full Name"   value={data.fullName} />
      <Row label="Email"       value={data.email} />
      <Row label="Phone"       value={data.phone} />
      <Row label="Password"    value="••••••••" />
    </Section>

    <Section title="Shop Details">
      <Row label="Shop Name"    value={data.shopName} />
      <Row label="Category"     value={data.category} />
      <Row label="GST Number"   value={data.gstNumber || 'Not provided'} />
      <Row label="Description"  value={data.description || 'Not provided'} />
    </Section>

    <Section title="KYC & Documents">
      <Row label="Aadhaar Number" value={`XXXX XXXX ${data.aadhaarNumber.slice(-4)}`} />
      <Row label="PAN Number"     value={data.panNumber} />
      <Row label="Bank Account"   value={`••••${data.bankAccount.slice(-4)}`} />
      <Row label="IFSC Code"      value={data.ifscCode} />
      <div className="flex items-center justify-between py-2.5">
        <span className="font-sans text-sm text-ink-500">Aadhaar Document</span>
        <span className="flex items-center gap-1 font-sans text-sm text-gold-600">
          <FileCheck className="h-4 w-4" />{data.aadhaarFile?.name}
        </span>
      </div>
      <div className="flex items-center justify-between py-2.5">
        <span className="font-sans text-sm text-ink-500">PAN Document</span>
        <span className="flex items-center gap-1 font-sans text-sm text-gold-600">
          <FileCheck className="h-4 w-4" />{data.panFile?.name}
        </span>
      </div>
    </Section>

    {/* Terms */}
    <div className="mb-6 rounded-lg border border-cream-300 bg-cream-50 p-4">
      <p className="font-sans text-xs text-ink-600">
        By submitting, you agree to our{' '}
        <a href="#" className="text-gold-600 hover:underline">Terms & Conditions</a> and confirm that all information provided is accurate and genuine.
      </p>
    </div>

    <div className="flex justify-between">
      <button type="button" onClick={onBack} disabled={isLoading}
        className="rounded-lg border-2 border-cream-300 px-6 py-3 font-sans text-sm font-semibold text-ink-700 transition-colors hover:bg-cream-200 disabled:cursor-not-allowed disabled:opacity-50">
        ← Back
      </button>
      <button type="button" onClick={onSubmit} disabled={isLoading}
        className="rounded-lg bg-gold-600 px-8 py-3 font-sans text-sm font-semibold text-ink-900 transition-colors hover:bg-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500 disabled:cursor-not-allowed disabled:opacity-50">
        {isLoading ? 'Submitting...' : 'Submit Application ✓'}
      </button>
    </div>
  </div>
)

export default StepReview
