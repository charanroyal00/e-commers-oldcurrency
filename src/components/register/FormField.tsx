import type { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  id: string
  error?: string
  hint?: string
  className?: string
  children: ReactNode
}

const FormField = ({ label, id, error, hint, className = '', children }: FormFieldProps) => (
  <div className={className}>
    <label htmlFor={id} className="mb-1.5 block font-sans text-sm font-medium text-ink-700">
      {label}
    </label>
    {children}
    {error && (
      <p className="mt-1 font-sans text-xs text-red-500" role="alert">{error}</p>
    )}
    {hint && !error && (
      <p className="mt-1 font-sans text-xs text-ink-400">{hint}</p>
    )}
  </div>
)

export default FormField
