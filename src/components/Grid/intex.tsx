import { ReactElement, useState } from "react";

import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "react-tooltip";

import { ProgramType } from "../../Features/Admin/EventList/components/ProgramList/Types/intex";

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
  onRowClick: any | null;
  showActions?: boolean;
  onDelete: any | null;
  onEdit: any | null;
};

export function TableGrid({
  columns,
  data,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onRowClick,
  showActions = true,
  onEdit,
  onDelete,
}: TableProps): ReactElement {
  let programsList = JSON.parse(localStorage.getItem("programDetails") || "[]");

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
            {showActions && (
              <th className="p-4 border-b border-slate-200 bg-slate-100" />
            )}{" "}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-slate-50 border-b border-slate-200"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="p-4 py-5"
                    onClick={() => onRowClick(row)}
                  >
                    <div className="flex">
                      <p
                        title={row[col.key]}
                        className="text-sm text-slate-800 w-28 truncate cursor-pointer"
                      >
                        {row[col.key]}
                      </p>
                      {col.key === "judges" &&
                        (() => {
                          const program = programsList.find(
                            (p: ProgramType) =>
                              p.programname === row.programname
                          );
                          if (!program || program.judges.length <= 1)
                            return null;

                          const anchorId = `judges-count-${rowIndex}`;

                          return (
                            <div key={anchorId} className="relative">
                              <div
                                id={anchorId}
                                className="border border-gray-100 bg-sky-100 px-2 py-1 rounded-md font-semibold inline-block cursor-pointer"
                              >
                                + {program.judges.length - 1}
                              </div>
                              <Tooltip
                                anchorSelect={`#${anchorId}`}
                                place="right"
                                style={{
                                  backgroundColor: "#d9f4ff",
                                  boxShadow: "inherit",
                                  paddingLeft: "20px",
                                  paddingRight: "20px",
                                  zIndex: 10,
                                  overflowY: "auto",
                                }}
                              >
                                {program.judges.length > 0
                                  ? program.judges.map(
                                      (judge: any, jIndex: number) => (
                                        <div
                                          key={jIndex}
                                          className="text-black text-sm font-medium"
                                        >
                                          {judge.label}
                                        </div>
                                      )
                                    )
                                  : null}
                              </Tooltip>
                            </div>
                          );
                        })()}
                      {col.key === "participant" &&
                        (() => {
                          const program = programsList.find(
                            (p: ProgramType) =>
                              p.programname === row.programname
                          );
                          if (!program || program.participant.length <= 1)
                            return null;

                          const participantId = `participant-count-${rowIndex}`;

                          return (
                            <div key={participantId} className="relative">
                              <div
                                id={participantId}
                                className="border border-gray-100 bg-sky-100 px-2 py-1 rounded-md font-semibold inline-block cursor-pointer"
                              >
                                + {program.participant.length - 1}
                              </div>
                              <Tooltip
                                anchorSelect={`#${participantId}`}
                                place="right"
                                style={{
                                  backgroundColor: "#d9f4ff",
                                  boxShadow: "inherit",
                                  paddingLeft: "20px",
                                  paddingRight: "20px",
                                  zIndex: 10,
                                  overflowY: "auto",
                                }}
                              >
                                {program.participant.length > 0
                                  ? program.participant.map(
                                      (participant: any, pIndex: number) => (
                                        <div
                                          key={pIndex}
                                          className="text-black text-sm font-medium"
                                        >
                                          {participant.label}
                                        </div>
                                      )
                                    )
                                  : null}
                              </Tooltip>
                            </div>
                          );
                        })()}
                    </div>
                  </td>
                ))}
                {showActions && (
                  <td className="p-4 flex gap-5">
                    <button
                      className="flex items-center justify-center"
                      onClick={() => onDelete(row)}
                    >
                      <TrashIcon className="h-5 w-5 text-gray-500" />
                    </button>
                    <button
                      className="flex items-center justify-center"
                      onClick={() => onEdit(row)}
                    >
                      <PencilIcon className="h-5 w-5 text-gray-500" />
                    </button>
                  </td>
                )}
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
