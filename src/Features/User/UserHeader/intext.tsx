import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export function UserHeader(): ReactElement {
  const navigate = useNavigate();
  function handleExit() {
    navigate("user/joinRoom");
  }
  return (
    <div className="h-14 flex items-center justify-between shadow-xl">
      <h1 className="font-semibold text-xl pl-14">Evaluation</h1>
      <button
        className="px-3 py-1 rounded-md mr-14 font-semibold"
        onClick={handleExit}
      >
        Exit
      </button>
    </div>
  );
}
