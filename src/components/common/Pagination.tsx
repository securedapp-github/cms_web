import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Pagination as PaginationType } from '../../types/fiduciary.types';

interface PaginationProps {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const Pagination = ({ pagination, onPageChange, isLoading }: PaginationProps) => {
  const { page, totalPages, hasNext, hasPrev } = pagination;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (page > 3) {
        pages.push('...');
      }

      // Show pages around current page
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      {/* Info Text */}
      <div className="text-sm text-slate-600 font-medium">
        Page <span className="font-bold text-slate-900">{page}</span> of{' '}
        <span className="font-bold text-slate-900">{totalPages}</span>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrev || isLoading}
          className="flex items-center gap-1 px-3 py-2 rounded-lg border-2 border-slate-300 bg-white text-slate-700 font-bold text-sm hover:bg-slate-50 hover:border-indigo-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-slate-300"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="hidden sm:flex items-center gap-1">
          {pageNumbers.map((pageNum, index) => (
            <button
              key={index}
              onClick={() => typeof pageNum === 'number' && onPageChange(pageNum)}
              disabled={pageNum === '...' || pageNum === page || isLoading}
              className={`min-w-10 h-10 px-3 rounded-lg font-bold text-sm transition-all ${
                pageNum === page
                  ? 'bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                  : pageNum === '...'
                  ? 'cursor-default text-slate-400'
                  : 'border-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-indigo-300'
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {pageNum}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNext || isLoading}
          className="flex items-center gap-1 px-3 py-2 rounded-lg border-2 border-slate-300 bg-white text-slate-700 font-bold text-sm hover:bg-slate-50 hover:border-indigo-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-slate-300"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
