import { Routes, Route } from "react-router-dom";

import { Home } from "../Features/Home/intex";
import { Header } from "../Features/Header/intex";
import { JudgesList } from "../Features/JudgesList/intex";
import { ParticipantsList } from "../Features/ParticipantsList/intex";

function Router() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/judgesList" element={<JudgesList />} />
        <Route path="/participantsList" element={<ParticipantsList />} />
      </Routes>
    </div>
  );
}

export default Router;
