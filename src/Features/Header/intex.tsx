import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

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
      <h1 className="font-semibold text-lg pl-14">SCOREAPP</h1>
      <div className="flex gap-32">
        <p onClick={eventList} className="cursor-pointer hover:text-gray-500">
          Event List
        </p>
        <p onClick={judgesList} className="cursor-pointer hover:text-gray-500">
          Judges List
        </p>
        <p onClick={participantsList} className="cursor-pointer hover:text-gray-500">
          Participants List
        </p>
      </div>
      <button className="px-3 py-1 rounded-md mr-14">Sign in</button>
    </div>
  );
}
