"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--surface)] p-6">
      <section className="w-full max-w-lg rounded-xl border border-[var(--border)] bg-white p-8 text-center">
        <p className="text-sm font-semibold text-[var(--accent)]">Something went wrong</p>
        <h1 className="mt-2 text-2xl font-bold text-[var(--primary)]">EduSphere could not load this route</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">An unexpected application error occurred.</p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-lg bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
