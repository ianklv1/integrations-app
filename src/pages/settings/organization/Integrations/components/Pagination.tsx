import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 px-4 sm:px-6 py-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={page === "..."}
              className={`min-w-[32px] h-8 px-2 rounded font-medium text-sm transition-colors ${
                page === currentPage
                  ? "bg-gray-900 text-white"
                  : page === "..."
                  ? "cursor-default text-gray-400"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
        >
          <span className="hidden sm:inline">Next</span>
          <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
