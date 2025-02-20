import { ReactElement } from "react";
import scoreapp from "../../../assets/images/scoreapp.png";
export function JoinRoom(): ReactElement {
  return (
    <section className="h-full">
      <div className="grid grid-cols-2">
        <div className="pl-14 flex flex-col justify-center items-start">
          <h1 className="text-indigo-600 text-5xl font-semibold pb-1">
            Join a Room
          </h1>
          <p className="text-sm pb-10">
            Enter the room details to start judging
          </p>
          <label htmlFor="roomname">Room Name</label>
          <input
            type="text"
            id="roomname"
            className="border-2 border-gray-300 rounded w-64 h-8"
          />
          <label htmlFor="password" className="pt-3">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border-2 border-gray-300 rounded w-64 h-8"
          />
          <button className="bg-indigo-600 rounded py-1 px-6 text-white ml-20 mt-10">
            Join
          </button>
        </div>
        <div>
          <img src={scoreapp} alt="logo" />
        </div>
      </div>
    </section>
  );
}
