export default function DashboardPage() {
  return (
    <section className="mx-auto max-w-5xl">
      <div className="rounded-xl border border-[var(--border)] bg-white p-6 sm:p-8">
        <p className="text-sm font-semibold text-[var(--secondary)]">Phase 1 · Foundation</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-[var(--primary)] sm:text-3xl">
          EduSphere foundation is ready
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">
          This dashboard route is intentionally structural. Business modules, real data, authentication,
          authorization, and tenant operations will be implemented in their dependent phases.
        </p>
      </div>
    </section>
  );
}
