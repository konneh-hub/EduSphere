"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [schoolCode, setSchoolCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolCode, email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Unable to sign in.");
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--surface)] px-4 py-10">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
        <section className="w-full rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm">
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--secondary)]">EduSphere</p>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Sign in</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">Use your school account to access the management system.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block text-sm font-medium">
              School code
              <input
                required
                value={schoolCode}
                onChange={(event) => setSchoolCode(event.target.value)}
                className="mt-2 w-full rounded-lg border border-[var(--border)] px-3 py-2.5 outline-none focus:border-[var(--primary)]"
                autoComplete="organization"
              />
            </label>

            <label className="block text-sm font-medium">
              Email
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-lg border border-[var(--border)] px-3 py-2.5 outline-none focus:border-[var(--primary)]"
                autoComplete="email"
              />
            </label>

            <label className="block text-sm font-medium">
              Password
              <input
                required
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-lg border border-[var(--border)] px-3 py-2.5 outline-none focus:border-[var(--primary)]"
                autoComplete="current-password"
              />
            </label>

            {error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[var(--primary)] px-4 py-2.5 font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
