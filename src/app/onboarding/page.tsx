"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const steps = ["School profile", "Administrator", "Review"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [schoolName, setSchoolName] = useState("");
  const [schoolCode, setSchoolCode] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [schoolPhone, setSchoolPhone] = useState("");
  const [adminName, setAdminName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function next(event: FormEvent) {
    event.preventDefault();
    setError("");
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  async function submit() {
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/onboarding/school", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolName, schoolCode, schoolEmail, schoolPhone, adminName }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error?.message ?? "Unable to complete setup.");
        return;
      }
      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError("Unable to connect to the onboarding service.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--surface)] px-6 py-10 sm:py-16">
      <section className="mx-auto w-full max-w-4xl rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm sm:p-10">
        <header className="flex flex-col gap-8 border-b border-[var(--border)] pb-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)] p-1.5">
              <Image src="/edusphere.png" alt="EduSphere logo" width={40} height={40} className="object-contain" priority />
            </div>
            <div>
              <p className="text-xl font-bold text-[var(--primary)]">EduSphere</p>
              <p className="text-xs text-[var(--muted)]">School management platform</p>
            </div>
          </div>
          <div className="w-full max-w-md">
            <div className="flex items-center justify-between text-xs font-semibold text-[var(--muted)]">
              <span>Workspace setup</span>
              <span>{step + 1} of {steps.length}</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {steps.map((label, index) => (
                <div key={label}>
                  <div className={`h-1.5 rounded-full ${index <= step ? "bg-[var(--secondary)]" : "bg-slate-100"}`} />
                  <p className={`mt-2 text-[11px] ${index === step ? "font-bold text-[var(--primary)]" : "text-[var(--muted)]"}`}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className="mx-auto mt-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--secondary)]">{steps[step]}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--foreground)]">
            {step === 0 ? "Set up your school workspace" : step === 1 ? "Tell us about the administrator" : "Review your workspace"}
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            {step === 0 ? "This creates the secure tenant that will hold your school data." : step === 1 ? "You will start as the School Administrator. Additional roles are managed from the platform." : "Confirm these details before creating your school workspace."}
          </p>

          {error && <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

          {step === 0 && (
            <form onSubmit={next} className="mt-8 space-y-5">
              <Field label="School name" value={schoolName} onChange={setSchoolName} required placeholder="Example Secondary School" />
              <Field label="School code" value={schoolCode} onChange={setSchoolCode} placeholder="Optional, e.g. EXAMPLE-001" hint="Leave blank and EduSphere will generate one." />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="School email" type="email" value={schoolEmail} onChange={setSchoolEmail} required placeholder="admin@school.edu" />
                <Field label="School phone" value={schoolPhone} onChange={setSchoolPhone} placeholder="Optional" />
              </div>
              <button className="w-full rounded-lg bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white hover:opacity-90">Continue</button>
            </form>
          )}

          {step === 1 && (
            <form onSubmit={next} className="mt-8 space-y-5">
              <Field label="Administrator name" value={adminName} onChange={setAdminName} required placeholder="Your full name" />
              <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-[var(--text)]">Your verified Clerk email will be linked to this administrator account.</div>
              <div className="flex gap-3"><Back onClick={() => setStep(0)} /><button className="flex-1 rounded-lg bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white hover:opacity-90">Review details</button></div>
            </form>
          )}

          {step === 2 && (
            <div className="mt-8 space-y-5">
              <Summary label="School" value={schoolName} />
              <Summary label="School code" value={schoolCode || "Generated securely during setup"} />
              <Summary label="Contact" value={`${schoolEmail}${schoolPhone ? ` · ${schoolPhone}` : ""}`} />
              <Summary label="Administrator" value={adminName} />
              <div className="flex gap-3"><Back onClick={() => setStep(1)} /><button onClick={submit} disabled={loading} className="flex-1 rounded-lg bg-[var(--secondary)] px-4 py-3 text-sm font-semibold text-white disabled:opacity-60">{loading ? "Creating workspace..." : "Create school workspace"}</button></div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function Field({ label, value, onChange, type = "text", required = false, placeholder, hint }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; placeholder: string; hint?: string }) {
  return <label className="block text-sm font-medium text-[var(--text)]">{label}<input type={type} required={required} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-2 w-full rounded-lg border border-[var(--border)] px-3 py-2.5 outline-none focus:border-[var(--primary)]" />{hint && <span className="mt-1 block text-xs font-normal text-[var(--muted)]">{hint}</span>}</label>;
}

function Back({ onClick }: { onClick: () => void }) {
  return <button type="button" onClick={onClick} className="rounded-lg border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--text)] hover:bg-[var(--surface)]">Back</button>;
}

function Summary({ label, value }: { label: string; value: string }) {
  return <div className="flex flex-col gap-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"><span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">{label}</span><span className="text-sm font-medium text-[var(--foreground)] sm:text-right">{value}</span></div>;
}