import { ReactElement } from "react";

import { TableData, TableHead } from "../../Features/Home/Types/table";

export function Grid({ tabHead, tabledata }: any): ReactElement {
  return (
    <div className="mt-5 relative flex flex-col w-full h-full text-gray-700 border rounded-md">
      <table className="w-full text-left table-auto min-w-max">
        <thead>
          <tr>
            {tabHead.map((item: TableHead) => (
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none text-slate-500">
                  {item.name}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tabledata.map((item: TableData) => (
            <tr className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-4 py-5">
                <p className="block font-semibold text-sm text-slate-800">
                  {item.eventname}
                </p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">{item.date}</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">{item.time}</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">{item.venue}</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">{item.iscompleted}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center px-4 py-3">
        <div className="text-sm text-slate-500">
          Showing <b>1-5</b> of 45
        </div>
        <div className="flex space-x-1">
          <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
            Prev
          </button>
          <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-indigo-600 border border-indigo-600 rounded hover:bg-indigo-400 hover:border-indigo-400 transition duration-200 ease">
            1
          </button>
          <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
            2
          </button>
          <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
            3
          </button>
          <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
