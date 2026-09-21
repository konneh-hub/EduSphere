import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--surface)] px-6 py-12">
      <section className="flex w-full max-w-5xl flex-col items-center gap-10 rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm lg:flex-row lg:items-start lg:p-12">
        <div className="w-full max-w-md space-y-6 lg:pt-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)] p-1.5">
              <Image src="/edusphere.png" alt="EduSphere logo" width={40} height={40} className="object-contain" priority />
            </div>
            <div>
              <p className="text-xl font-bold text-[var(--primary)]">EduSphere</p>
              <p className="text-xs text-[var(--muted)]">School management platform</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--secondary)]">Secure access</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--foreground)]">Welcome back</h1>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              Sign in with your EduSphere account to access your school dashboard.
            </p>
          </div>
        </div>
        <div className="w-full max-w-md">
          <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" fallbackRedirectUrl="/dashboard" />
        </div>
      </section>
    </main>
  );
}
