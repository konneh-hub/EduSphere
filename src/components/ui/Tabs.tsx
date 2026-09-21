"use client";

import React from "react";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className = "" }: TabsProps) {
  return (
    <div className={`border-b border-[var(--border)] ${className}`}>
      <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex items-center gap-2 whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium transition-colors ${
                isActive
                  ? "border-[#123B6D] text-[#123B6D]"
                  : "border-transparent text-[var(--muted)] hover:border-slate-300 hover:text-[var(--foreground)]"
              }`}
            >
              {tab.icon && <span className="h-4 w-4">{tab.icon}</span>}
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    isActive ? "bg-[#EEF2FF] text-[#123B6D]" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

