interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function CatalogoPaginator({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (page > 2) pages.push(1);
    if (page > 3) pages.push('...');
    if (page > 1) pages.push(page - 1);
    pages.push(page);
    if (page < totalPages) pages.push(page + 1);
    if (page < totalPages - 2) pages.push('...');
    if (page < totalPages - 1) pages.push(totalPages);
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        className="cursor-pointer rounded-lg bg-gray-200 px-4 py-2 text-xs text-gray-500 transition hover:bg-red-800 hover:text-white disabled:opacity-50"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Página anterior"
      >
        &lt;
      </button>
      {pages.map((p, idx) =>
        typeof p === 'number' ? (
          <button
            key={p}
            className={`cursor-pointer rounded-lg px-4 py-2 text-xs ${
              p === page ? 'bg-red-800 font-bold text-yellow-300' : 'border border-gray-200 bg-white text-gray-800'
            }`}
            onClick={() => onPageChange(p)}
            disabled={p === page}
          >
            {p}
          </button>
        ) : (
          <span
            key={`ellipsis-${idx}`}
            className="cursor-default rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs text-gray-800"
          >
            ...
          </span>
        ),
      )}
      <button
        className="cursor-pointer rounded-lg bg-gray-200 px-4 py-2 text-xs text-gray-500 transition hover:bg-red-800 hover:text-white disabled:opacity-50"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Próxima página"
      >
        &gt;
      </button>
    </div>
  );
}
