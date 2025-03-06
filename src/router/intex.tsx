import { Routes, Route } from "react-router-dom";

import { EventList } from "../Features/Admin/EventList/intex";
import { Header } from "../Features/Admin/Header/intex";
import { JudgesList } from "../Features/Admin/JudgesList/intex";
import { ParticipantsList } from "../Features/Admin/ParticipantsList/intex";
import { JoinRoom } from "../Features/User/JoinRoom/intex";
import { ProgramList } from "../Features/Admin/EventList/components/ProgramList/intex";
import { ParticipantsDetails } from "../Features/Admin/EventList/components/Participant Details/intex";
import { JudgesScoringPage } from "../Features/User/JudgesScoringPage";

function Router() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/judgesList" element={<JudgesList />} />
        <Route path="/participantsList" element={<ParticipantsList />} />
        <Route path="user/joinRoom" element={<JoinRoom />} />
        <Route path="/judgesScoringPage" element={<JudgesScoringPage />} />
        <Route path="/programList" element={<ProgramList />} />
        <Route path="/participantsDetails" element={<ParticipantsDetails />} />
      </Routes>
    </div>
  );
}

export default Router;
