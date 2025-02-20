import { Routes, Route } from "react-router-dom";

import { Home } from "../Features/Home/intex";
import { Header } from "../Features/Admin/Header/intex";
import { JudgesList } from "../Features/Admin/JudgesList/intex";
import { ParticipantsList } from "../Features/Admin/ParticipantsList/intex";
import { JoinRoom } from "../Features/User/JoinRoom/intex";

function Router() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/judgesList" element={<JudgesList />} />
        <Route path="/participantsList" element={<ParticipantsList />} />
        <Route path="/joinRoom" element={<JoinRoom />} />
      </Routes>
    </div>
  );
}

export default Router;
