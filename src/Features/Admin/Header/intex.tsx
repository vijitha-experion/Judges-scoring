import { ReactElement } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export function Header(): ReactElement {
  const navigate = useNavigate();

  function eventList() {
    navigate("/");
  }

  function judgesList() {
    navigate("/judgesList");
  }

  function participantsList() {
    navigate("/participantsList");
  }
  return (
    <div className="h-14 flex items-center justify-between shadow-xl">
      <NavLink
        to="/"
        className="font-semibold text-lg pl-14"
        aria-current="page"
      >
        SCOREAPP
      </NavLink>
      <div className="flex gap-32">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "cursor-pointer text-indigo-600 font-semibold"
              : "cursor-pointer text-gray-500 hover:text-indigo-600 font-semibold"
          }
          aria-current="page"
        >
          Event List
        </NavLink>
        <NavLink
          to="/judgesList"
          className={({ isActive }) =>
            isActive
              ? "cursor-pointer text-indigo-600 font-semibold"
              : "cursor-pointer text-gray-500 hover:text-indigo-600 font-semibold"
          }
          aria-current="page"
        >
          Judges List
        </NavLink>
        <NavLink
          to="/participantsList"
          className={({ isActive }) =>
            isActive
              ? "cursor-pointer text-indigo-600 font-semibold"
              : "cursor-pointer text-gray-500 hover:text-indigo-600 font-semibold"
          }
          aria-current="page"
        >
          Participants List
        </NavLink>
      </div>
      <button className="px-3 py-1 rounded-md mr-14 font-semibold">
        Sign in
      </button>
    </div>
  );
}
