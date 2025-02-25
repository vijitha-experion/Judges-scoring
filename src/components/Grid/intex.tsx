import { ReactElement } from "react";

export type TableColumn = {
  key: string;
  label: string;
};

export type TableProps = {
  columns: TableColumn[];
  data: Record<string, any>[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onRowClick: any;
};

export function TableGrid({
  columns,
  data,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onRowClick,
}: TableProps): ReactElement {
  console.log(data, "data");
  return (
    <div className="mt-5 relative flex flex-col w-full h-full text-gray-700 border rounded-md">
      <table className="w-full text-left table-auto min-w-max">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="p-4 border-b border-slate-200 bg-slate-100"
              >
                <p className="text-sm font-semibold leading-none text-slate-800">
                  {col.label}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-slate-50 border-b border-slate-200"
                onClick={onRowClick}
              >
                {columns.map((col) => (
                  <td key={col.key} className="p-4 py-5">
                    <p className="text-sm text-slate-800 w-40 truncate cursor-pointer">
                      {row[col.key]}
                    </p>
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="p-4 text-center text-slate-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {onPageChange && totalPages > 1 && (
        <div className="flex justify-between items-center px-4 py-3 bg-slate-100">
          <div className="text-sm text-slate-500">
            Page <b>{currentPage}</b> of {totalPages}
          </div>
          <div className="flex space-x-1">
            <button
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => onPageChange(index + 1)}
                className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal border rounded transition duration-200 ease ${
                  currentPage === index + 1
                    ? "text-white bg-indigo-600 border-indigo-600 hover:bg-indigo-400 hover:border-indigo-400"
                    : "text-slate-500 bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-400"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
