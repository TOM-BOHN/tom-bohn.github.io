export function XangaAppletFrame({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="xanga-applet border-4 border-border bg-bg-secondary shadow-[6px_6px_0px_var(--accent)]">
      <div className="border-b-4 border-border bg-bg-primary px-3 py-2">
        <h3 className="text-sm font-bold tracking-widest uppercase text-text-primary">
          {title}
        </h3>
      </div>
      <div className="p-3">{children}</div>
    </section>
  )
}

