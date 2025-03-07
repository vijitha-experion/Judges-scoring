import { Routes, Route, useLocation } from "react-router-dom";

import { EventList } from "../Features/Admin/EventList/intex";
import { AdminHeader } from "../Features/Admin/AdminHeader/intex";
import { JudgesList } from "../Features/Admin/JudgesList/intex";
import { ParticipantsList } from "../Features/Admin/ParticipantsList/intex";
import { JoinRoom } from "../Features/User/JoinRoom/intex";
import { ProgramList } from "../Features/Admin/EventList/components/ProgramList/intex";
import { ParticipantsDetails } from "../Features/Admin/EventList/components/Participant Details/intex";
import { JudgesScoringPage } from "../Features/User/JudgesScoringPage";
import { EvaluationPage } from "../Features/User/EvaluationPage/intex";
import { UserHeader } from "../Features/User/UserHeader/intext";

function Router() {
  const location = useLocation();

  const userRoutes = [
    "/user/joinRoom",
    "/judgesScoringPage",
    "/evaluationPage",
  ];
  const isUserRoute = userRoutes.includes(location.pathname);
  return (
    <div>
      {isUserRoute ? <UserHeader /> : <AdminHeader />}
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/judgesList" element={<JudgesList />} />
        <Route path="/participantsList" element={<ParticipantsList />} />
        <Route path="/programList" element={<ProgramList />} />
        <Route path="/participantsDetails" element={<ParticipantsDetails />} />

        <Route path="user/joinRoom" element={<JoinRoom />} />
        <Route path="/judgesScoringPage" element={<JudgesScoringPage />} />
        <Route path="/evaluationPage" element={<EvaluationPage />} />
      </Routes>
    </div>
  );
}

export default Router;
