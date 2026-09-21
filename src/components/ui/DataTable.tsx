"use client";

import React, { useState } from "react";

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  title?: string;
  subtitle?: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  headerAction?: React.ReactNode;
  filterComponent?: React.ReactNode;
  pageSize?: number;
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  title,
  subtitle,
  searchPlaceholder = "Search records...",
  onSearch,
  headerAction,
  filterComponent,
  pageSize = 10,
  emptyMessage = "No records found.",
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setSearchQuery(val);
    setCurrentPage(1);
    if (onSearch) onSearch(val);
  }

  const filteredData = onSearch
    ? data
    : data.filter((item) =>
        Object.values(item).some(
          (val) =>
            val !== null &&
            val !== undefined &&
            String(val).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filteredData.slice(startIndex, startIndex + pageSize);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-white shadow-sm">
      {/* Header with Title and Actions */}
      {(title || headerAction || searchPlaceholder || filterComponent) && (
        <div className="border-b border-[var(--border)] p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {title && (
              <div>
                <h3 className="text-base font-bold text-[var(--foreground)]">{title}</h3>
                {subtitle && <p className="text-xs text-[var(--muted)]">{subtitle}</p>}
              </div>
            )}
            {headerAction && <div className="flex items-center gap-3">{headerAction}</div>}
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-sm flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={searchPlaceholder}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] py-2 pl-9 pr-3 text-sm text-[var(--foreground)] outline-none placeholder:text-slate-400 focus:border-[#123B6D] focus:bg-white"
              />
              <svg
                className="absolute left-3 top-2.5 h-4 w-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {filterComponent && <div className="flex items-center gap-2">{filterComponent}</div>}
          </div>
        </div>
      )}

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[var(--text)]">
          <thead className="border-b border-[var(--border)] bg-[#F8FAFC] text-xs font-semibold text-slate-600 uppercase tracking-wider">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={`py-3.5 px-4 ${col.className || ""}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center text-sm text-[var(--muted)]">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              currentData.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAFC]/80 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className={`py-3.5 px-4 align-middle ${col.className || ""}`}>
                      {col.render ? col.render(item) : (item[col.key] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col gap-3 border-t border-[var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between text-xs text-[var(--muted)]">
        <p>
          Showing <span className="font-semibold text-[var(--foreground)]">{filteredData.length > 0 ? startIndex + 1 : 0}</span> to{" "}
          <span className="font-semibold text-[var(--foreground)]">
            {Math.min(startIndex + pageSize, filteredData.length)}
          </span>{" "}
          of <span className="font-semibold text-[var(--foreground)]">{filteredData.length}</span> records
        </p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-md border border-[var(--border)] px-3 py-1.5 font-medium text-[var(--foreground)] hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-2 font-medium text-[var(--foreground)]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-md border border-[var(--border)] px-3 py-1.5 font-medium text-[var(--foreground)] hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

