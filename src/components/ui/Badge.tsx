import React from "react";

export type BadgeVariant = "success" | "warning" | "danger" | "info" | "neutral" | "primary" | "secondary";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  size?: "sm" | "md";
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]",
  warning: "bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]",
  danger: "bg-[#FEE2E2] text-[#B91C1C] border-[#FECACA]",
  info: "bg-[#E0F2FE] text-[#0284C7] border-[#BAE6FD]",
  neutral: "bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]",
  primary: "bg-[#EEF2FF] text-[#123B6D] border-[#C7D2FE]",
  secondary: "bg-[#F0FDFA] text-[#0F766E] border-[#99F6E4]",
};

export function Badge({ children, variant = "neutral", className = "", size = "sm" }: BadgeProps) {
  const sizeClasses = size === "sm" ? "px-2.5 py-0.5 text-xs font-medium" : "px-3 py-1 text-sm font-medium";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border ${variantStyles[variant]} ${sizeClasses} ${className}`}
    >
      {children}
    </span>
  );
}

