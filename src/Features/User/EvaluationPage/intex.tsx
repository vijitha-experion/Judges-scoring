import { ReactElement, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export function EvaluationPage(): ReactElement {
  const location = useLocation();
  const participant = location.state?.participant;
  const room = JSON.parse(localStorage.getItem("room") || "[]");
  const uniqueCode = JSON.parse(localStorage.getItem("uniqueCode") || "");

  const navigate = useNavigate();

  const evaluationPoints = room?.evaluationPoints || [];
  const [scores, setScores] = useState<number[]>(() =>
    Array(room?.evaluationPoints?.length || null).fill(null)
  );

  function handleScoreChange(index: number, value: string) {
    let num = Number(value);
    const newScores = [...scores];
    if (num > 10 || num < 0) {
      num = Math.max(0, Math.min(10, num));
    }
    newScores[index] = num;
    setScores(newScores);
  }

  const isSubmitDisabled = scores.some((score) => score === null);

  function onSubmit() {
    const totalScore = scores.reduce(
      (sum, score) => (sum ?? 0) + (score ?? 0),
      0
    );
    let existingScore = JSON.parse(
      localStorage.getItem("scoreDetails") || "[]"
    );
    const newData = [
      {
        eventName: room?.eventName,
        programname: room?.programname,
        participantName: participant?.participantName,
        evaluationStatus: "Completed",
        score: totalScore,
        uniqueCode: uniqueCode,
      },
    ];
    const updatedArray = [...existingScore, ...newData];
    localStorage.setItem("scoreDetails", JSON.stringify(updatedArray));
    navigate("/judgesScoringPage");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full h-20 border-b-2 flex items-center pl-14 text-indigo-600 font-semibold text-lg">
        <p>{participant?.participantName}</p>
      </div>
      <div className="flex-grow">
        {evaluationPoints.map((item: any, index: number) => (
          <div
            key={index}
            className="w-full py-7 border-b-2 flex justify-between pl-14 pr-14 items-center gap-40"
          >
            <div>
              <p>{item.evaluationpoint}</p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  min="0"
                  max="10"
                  value={scores[index] || ""}
                  onChange={(e) => handleScoreChange(index, e.target.value)}
                  className="w-10 text-lg text-gray-700 bg-white border border-gray-400 rounded-lg px-2.5 py-2.5 shadow-sm outline-none
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
                <p className="flex font-semibold text-indigo-600">out of 10</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-[0px_-4px_10px_rgba(0,0,0,0.1)] flex items-center justify-between h-16 px-14">
        <div className="flex gap-1 text-blue-500">
          <InformationCircleIcon className="h-4 w-4" />
          <p className="text-xs">
            Please give scores for all points before submitting
          </p>
        </div>
        <button
          className={`bg-indigo-600 py-2 px-5 rounded-md text-white ${
            isSubmitDisabled
              ? "bg-indigo-400 text-gray-200 cursor-not-allowed"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
          }`}
          disabled={isSubmitDisabled}
          onClick={onSubmit}
        >
          Submit
        </button>
      </footer>
    </div>
  );
}
