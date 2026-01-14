export function XangaAppletFrame({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="xanga-applet border-4 border-border bg-bg-secondary">
      <div className="px-3 pt-3 pb-2">
        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-accent whitespace-nowrap">
          {title}
        </h3>
      </div>
      <div className="px-3 pb-3 pt-1">{children}</div>
    </section>
  )
}

