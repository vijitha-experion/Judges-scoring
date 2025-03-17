import { ReactElement, useState } from "react";

import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "react-tooltip";

import { ProgramType } from "../../Features/Admin/EventList/components/ProgramList/Types/programType";

export type TableColumn = {
  key: string;
  label: string;
};

export type TableProps = {
  columns: TableColumn[];
  data: Record<string, any>[];
  onRowClick: any | null;
  showActions?: boolean;
  onDelete: any | null;
  onEdit: any | null;
};

export function TableGrid({
  columns,
  data,
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
                        className="text-sm text-slate-800 min-w-fit max-w-7xl truncate cursor-pointer"
                      >
                        {row[col.key]}
                      </p>
                      {col.key === "judges" &&
                        (() => {
                          const program = programsList.find(
                            (p: ProgramType) =>
                              p.programName === row.programName
                          );
                          if (!program || program.judges.length <= 1)
                            return null;

                          const anchorId = `judges-count-${rowIndex}`;

                          return (
                            <div key={anchorId} className="relative">
                              <div
                                id={anchorId}
                                className="ml-2 border border-gray-100 bg-sky-100 px-2 py-1 rounded-md font-semibold inline-block cursor-pointer"
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
                              p.programName === row.programName
                          );
                          if (!program || program.participant.length <= 1)
                            return null;

                          const participantId = `participant-count-${rowIndex}`;

                          return (
                            <div key={participantId} className="relative">
                              <div
                                id={participantId}
                                className="ml-2 border border-gray-100 bg-sky-100 px-2 py-1 rounded-md font-semibold inline-block cursor-pointer"
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
    </div>
  );
}
