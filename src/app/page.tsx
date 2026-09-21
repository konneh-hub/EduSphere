import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--surface)] px-6 py-12">
      <section className="w-full max-w-3xl rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm sm:p-12">
        <p className="text-sm font-semibold text-[var(--secondary)]">EduSphere</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--primary)] sm:text-4xl">
          School management platform
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
          Secure school access is now the entry point. Application modules will be enabled through their planned implementation phases.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/login"
            className="rounded-lg bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Sign in with Clerk
          </Link>
          <a
            href="/api/health"
            className="rounded-lg border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--text)] hover:bg-[var(--surface)]"
          >
            Health check
          </a>
        </div>
      </section>
    </main>
  );
}
