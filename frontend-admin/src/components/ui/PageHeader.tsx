interface PageHeaderProps {
  category: string
  title: string
  description: string
  action?: React.ReactNode
}

const PageHeader = ({ category, title, description, action }: PageHeaderProps) => (
  <div className="mb-8 flex items-start justify-between gap-4">
    <div>
      <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-gold-600">
        {category}
      </p>
      <h1 className="mt-1 font-serif text-3xl font-bold text-ink-900">{title}</h1>
      <p className="mt-2 font-sans text-sm text-ink-500">{description}</p>
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
)

export default PageHeader
