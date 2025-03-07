import { ReactElement, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { TableGrid } from "../../../components/Grid/intex";

import { scoreHead } from "./Utils/scoreTableHead";
import { ParticipantScoreType } from "./Types/participantScore";

export function JudgesScoringPage(): ReactElement {
  const [isToast, setIsToast] = useState(false);
  
  const navigation = useNavigate();
  const room = JSON.parse(localStorage.getItem("room") || "[]");

  const existingScore = JSON.parse(
    localStorage.getItem("scoreDetails") || "[]"
  );

  const participantsList = room?.participant?.map((participant: any) => ({
    participantName: participant.label,
    evaluationStatus: "-----",
    score: "-----",
  }));

  const newArray = participantsList?.map((participant: any) => {
    const existingParticipantScore = existingScore.find(
      (score: any) => score.participantName === participant.participantName
    );
    return existingParticipantScore || participant;
  });

  function onRowClick(row: ParticipantScoreType) {
    if (row.evaluationStatus === "Completed") {
      toast("A participant can be evaluated only once.", {
        style: { color: "red" },
      });
      setIsToast(true);
    } else {
      navigation("/evaluationPage", {
        state: { participant: row },
      });
    }
  }
  return (
    <div className="pl-14 mr-14">
      <div className="flex justify-between items-center pt-10">
        <p className="font-semibold text-xl">Evaluation Points</p>
      </div>
      <TableGrid
        columns={scoreHead}
        data={newArray}
        currentPage={1}
        totalPages={3}
        onPageChange={(page) => console.log("Go to page:", page)}
        onRowClick={onRowClick}
        showActions={false}
        onDelete={() => {}}
        onEdit={() => {}}
      />{" "}
      {isToast ? <ToastContainer /> : null}
    </div>
  );
}
