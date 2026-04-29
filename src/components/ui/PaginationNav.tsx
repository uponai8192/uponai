import Link from 'next/link';

type PaginationNavProps = {
  basePath: string;
  currentPage: number;
  totalPages: number;
};

function buildPageHref(basePath: string, page: number) {
  return page <= 1 ? basePath : `${basePath}?page=${page}`;
}

function buildVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, totalPages, currentPage]);

  if (currentPage - 1 > 1) pages.add(currentPage - 1);
  if (currentPage + 1 < totalPages) pages.add(currentPage + 1);
  if (currentPage <= 3) pages.add(2);
  if (currentPage <= 3) pages.add(3);
  if (currentPage >= totalPages - 2) pages.add(totalPages - 1);
  if (currentPage >= totalPages - 2) pages.add(totalPages - 2);

  return Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((left, right) => left - right);
}

export default function PaginationNav({
  basePath,
  currentPage,
  totalPages,
}: PaginationNavProps) {
  if (totalPages <= 1) return null;

  const visiblePages = buildVisiblePages(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="theme-card mt-10 flex flex-wrap items-center justify-center gap-2 rounded-[2rem] p-4 md:gap-3"
    >
      <Link
        href={buildPageHref(basePath, currentPage - 1)}
        aria-disabled={currentPage === 1}
        className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
          currentPage === 1
            ? 'pointer-events-none theme-card-soft text-[var(--text-soft)] opacity-50'
            : 'theme-section-alt hover:text-[var(--text-strong)]'
        }`}
      >
        Previous
      </Link>

      {visiblePages.map((pageNumber, index) => {
        const previous = visiblePages[index - 1];
        const showLeadingGap = previous && pageNumber - previous > 1;

        return (
          <span key={pageNumber} className="contents">
            {showLeadingGap ? (
              <span className="px-2 text-sm font-semibold text-[var(--text-soft)]">...</span>
            ) : null}
            <Link
              href={buildPageHref(basePath, pageNumber)}
              aria-current={pageNumber === currentPage ? 'page' : undefined}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                pageNumber === currentPage
                  ? 'theme-primary-button'
                  : 'theme-section-alt hover:text-[var(--text-strong)]'
              }`}
            >
              {pageNumber}
            </Link>
          </span>
        );
      })}

      <Link
        href={buildPageHref(basePath, currentPage + 1)}
        aria-disabled={currentPage === totalPages}
        className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
          currentPage === totalPages
            ? 'pointer-events-none theme-card-soft text-[var(--text-soft)] opacity-50'
            : 'theme-section-alt hover:text-[var(--text-strong)]'
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
