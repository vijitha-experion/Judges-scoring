import { ReactElement } from "react";
import { useLocation } from "react-router-dom";

import { scoreHead } from "./Utils/scoreTableHead";
import { TableGrid } from "../../../components/Grid/intex";

export function JudgesScoringPage(): ReactElement {
  const location = useLocation();
  const room = location.state?.room;
  console.log(room, "room");
  const existingScore = JSON.parse(
    localStorage.getItem("existingScore") || "[]"
  );
  const participants = room?.participant?.filter((participant: any) => {
    return participant;
  });

  const participantsList = room?.participant?.map((participant: any) => ({
    participantName: participant.label,
    evaluationStatus: "-----",
    score: "-----",
  }));
  console.log(participantsList, "participantsList");
  function onRowClick() {}
  return (
    <div className="pl-14 mr-14">
      <div className="flex justify-between items-center pt-10">
        <p className="font-semibold text-xl">Evaluation Points</p>
      </div>
      <TableGrid
        columns={scoreHead}
        data={participantsList}
        currentPage={1}
        totalPages={3}
        onPageChange={(page) => console.log("Go to page:", page)}
        onRowClick={() => {}}
        showActions={false}
        onDelete={() => {}}
        onEdit={() => {}}
      />{" "}
    </div>
  );
}
