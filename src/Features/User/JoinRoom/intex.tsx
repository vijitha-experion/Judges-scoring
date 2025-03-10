import { ReactElement, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

import scoreapp from "../../../assets/images/scoreapp.png";
import { useJoinRoom } from "./Store/joinRoomStore";
import { password, roomWarning } from "./Utils/warning";
import { ProgramType } from "../../Admin/EventList/components/ProgramList/Types/intex";

export function JoinRoom(): ReactElement {
  const [isVisible, setIsVisible] = useState(false);
  const [isToast, setIsToast] = useState(false);
  const navigate = useNavigate();
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const joinValue = useJoinRoom(useCallback((state) => state.joinValue, []));

  const setJoinValue = useJoinRoom(
    useCallback((state) => state.setJoinValue, [])
  );
  const clearJoinValue = useJoinRoom(
    useCallback((state) => state.clearJoinValue, [])
  );
  const showWarning = useJoinRoom(
    useCallback((state) => state.showWarning, [])
  );

  function checkDisable() {
    return (
      !joinValue?.roomName?.trim() ||
      !joinValue?.password?.trim() ||
      showWarning(joinValue, "eventname") ||
      showWarning(joinValue, "time")
    );
  }

  function joinRoom() {
    let existingProgram = JSON.parse(
      localStorage.getItem("programDetails") || "[]"
    );
    const room = existingProgram.find(
      (item: ProgramType) =>
        item?.eventName === joinValue?.roomName &&
        item?.uniqueCode.map((unique: any) => unique === joinValue?.password)
    );
    localStorage.setItem("room", JSON.stringify(room));
    localStorage.setItem("uniqueCode", JSON.stringify(joinValue?.password));
    if (room) {
      navigate("/judgesScoringPage");
      clearJoinValue();
    } else {
      toast("Incorrect room name and password", {
        style: { color: "red" },
      });
      setIsToast(true);
      clearJoinValue();
    }
  }

  return (
    <section className="h-full">
      <div className="grid grid-cols-2">
        <div className="flex flex-col justify-center items-center">
          <div className="pl-3">
            <h1 className="text-indigo-600 text-6xl font-semibold pb-1">
              Join a Room
            </h1>
            <p className="text-sm pb-8">
              Enter the room details to start judging
            </p>
          </div>
          <div className="flex flex-col pb-8">
            <label htmlFor="roomname">Room Name</label>
            <input
              type="text"
              id="roomname"
              className="w-80 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-12 shadow-sm outline-none 
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              value={joinValue?.roomName ?? ""}
              onChange={(e) => {
                setJoinValue("roomName", e.target.value);
              }}
            />
            {showWarning(joinValue, "roomName") && (
              <p className="text-red-500 text-sm">{roomWarning}</p>
            )}
            <label htmlFor="password" className="pt-3">
              Password
            </label>
            <div className="relative w-full">
              <input
                id="password"
                type={isVisible ? "text" : "password"}
                className="w-80 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-12 shadow-sm outline-none 
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                required
                value={joinValue?.password ?? ""}
                onChange={(e) => {
                  setJoinValue("password", e.target.value);
                }}
              />
              <button
                type="button"
                onClick={toggleVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-indigo-500 transition-colors"
                aria-label={isVisible ? "Hide password" : "Show password"}
                aria-pressed={isVisible}
                aria-controls="password"
              >
                {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {showWarning(joinValue, "password") && (
              <p className="text-red-500 text-sm">{password}</p>
            )}
          </div>
          <button
            className={`inline-flex items-center gap-2 rounded-md py-1.5 px-20 text-sm/6 font-semibold shadow-inner shadow-white/10 focus:outline-none  ${
              checkDisable()
                ? "bg-indigo-400 text-gray-200 cursor-not-allowed"
                : "bg-indigo-500 text-white hover:bg-indigo-600"
            }`}
            disabled={checkDisable()}
            onClick={joinRoom}
          >
            Join
          </button>
          {isToast ? <ToastContainer /> : null}
        </div>
        <div>
          <img src={scoreapp} alt="logo" />
        </div>
      </div>
    </section>
  );
}
