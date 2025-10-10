// PinkPagination.tsx
import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// If you use a different Select path, tweak the imports above.

// ---------- Helper: build the numbered page range with ellipses ----------
function buildPageRange(current: number, total: number, windowSize = 1) {
  // current/total are 1-based
  const range: (number | '…')[] = [];
  const first = 1;
  const last = total;

  const start = Math.max(first, current - windowSize);
  const end = Math.min(last, current + windowSize);

  range.push(first);

  if (start > first + 1) range.push('…');
  for (let i = start; i <= end; i++) {
    if (i !== first && i !== last) range.push(i);
  }
  if (end < last - 1) range.push('…');

  if (last > first) range.push(last);

  // de-dupe
  return range.filter((v, i, a) => a.indexOf(v) === i);
}

type PaginationProps = {
  /** TanStack table instance (useReactTable return) */
  table: any;
  /** Show the "Rows per Page" selector */
  showPageSizeSelector?: boolean;
  /** Options for page size */
  pageSizeOptions?: number[];
  /** Label text for page size */
  rowsLabel?: string;
  /** Extra wrapper classes */
  className?: string;
};

export function Pagination({
  table,
  showPageSizeSelector = true,
  pageSizeOptions = [10, 20, 50, 100],
  rowsLabel = 'Rows per Page:',
  className,
}: PaginationProps) {
  const total = Math.max(table.getPageCount(), 1);
  const current = table.getState().pagination.pageIndex + 1;
  const pages = buildPageRange(current, total, 1); // neighbors each side

  const isPrevDisabled = !table.getCanPreviousPage();
  const isNextDisabled = !table.getCanNextPage();

  const baseBtn = 'h-9 min-w-9 px-3 inline-flex items-center justify-center rounded-md text-sm font-semibold';
  const light = 'bg-[var(--color-title)]/30 text-[var(--color-title)] hover:bg-rose-200 transition';
  const solid = 'bg-[var(--color-title)] text-white';
  const iconBtn =
    'h-9 w-9 inline-flex items-center justify-center rounded-md bg-[var(--color-title)]/30 text-[var(--color-title)] disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <div className={`flex items-center justify-between px-2 ${className || ''}`}>
      <div />
      <div className="flex flex-1 items-center justify-end gap-5">
        {/* Rows per page pill */}
        {showPageSizeSelector && (
          <div className="flex items-center gap-2 rounded-md bg-[var(--color-table-header-bg)] pl-3 pr-2 py-1 font-semibold">
            <p className="text-sm">{rowsLabel}</p>
            <Select
              value={String(table.getState().pagination.pageSize)}
              onValueChange={(v) => table.setPageSize(Number(v))}
            >
              <SelectTrigger className="h-8 w-16 border-0 bg-transparent shadow-none focus:ring-0">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Numbered pagination */}
        <div className="flex items-center gap-2">
          {/* Prev */}
          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={isPrevDisabled}
            className={iconBtn}
            aria-label="Previous page"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>

          {/* Pages */}
          {pages.map((p, i) =>
            p === '…' ? (
              <span key={`dots-${i}`} className={`${baseBtn} bg-rose-50 text-rose-400 cursor-default`}>
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => table.setPageIndex((p as number) - 1)}
                className={`${baseBtn} ${p === current ? solid : light}`}
                aria-current={p === current ? 'page' : undefined}
              >
                {p}
              </button>
            )
          )}

          {/* Next */}
          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={isNextDisabled}
            className={iconBtn}
            aria-label="Next page"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
