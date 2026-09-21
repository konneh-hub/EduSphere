import React from "react";

export interface StatCardProps {
  title: string;
  value: string | number;
  delta?: {
    value: string;
    isPositive: boolean;
    period?: string;
  };
  icon: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  delta,
  icon,
  iconBgColor = "bg-[#EEF2FF]",
  iconColor = "text-[#123B6D]",
  className = "",
}: StatCardProps) {
  return (
    <div
      className={`rounded-xl border border-[var(--border)] bg-white p-5 shadow-sm transition-shadow hover:shadow-md ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--muted)]">{title}</span>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBgColor} ${iconColor}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <p className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">{value}</p>
        {delta && (
          <span
            className={`inline-flex items-center text-xs font-semibold ${
              delta.isPositive ? "text-[#15803D]" : "text-[#B91C1C]"
            }`}
          >
            {delta.isPositive ? "↗ " : "↘ "}
            {delta.value}
            {delta.period && <span className="ml-1 font-normal text-[var(--muted)]">{delta.period}</span>}
          </span>
        )}
      </div>
    </div>
  );
}

