import { Settings as SettingsIcon } from 'lucide-react'

const Settings = () => (
  <div>
    <div className="mb-8">
      <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-gold-600">
        Configuration
      </p>
      <h1 className="mt-1 font-serif text-3xl font-bold text-ink-900">Settings</h1>
      <p className="mt-2 font-sans text-sm text-ink-500">
        Manage application settings and preferences.
      </p>
    </div>
    <div className="rounded-xl border-2 border-cream-300 bg-white p-6 shadow-md">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-cream-300 bg-cream-200">
          <SettingsIcon className="h-7 w-7 text-ink-400" />
        </div>
        <p className="font-serif text-base text-ink-600">Settings panel coming soon</p>
        <p className="mt-1 font-sans text-sm text-ink-400">Configuration options will be available here.</p>
      </div>
    </div>
  </div>
)

export default Settings
