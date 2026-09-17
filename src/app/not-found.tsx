import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--surface)] p-6">
      <section className="w-full max-w-lg rounded-xl border border-[var(--border)] bg-white p-8 text-center">
        <p className="text-sm font-semibold text-[var(--secondary)]">404</p>
        <h1 className="mt-2 text-2xl font-bold text-[var(--primary)]">Page not found</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">The requested EduSphere route does not exist.</p>
        <Link href="/" className="mt-6 inline-block rounded-lg bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white">
          Return home
        </Link>
      </section>
    </main>
  );
}
