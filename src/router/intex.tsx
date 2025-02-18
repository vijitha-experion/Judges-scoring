import { Routes, Route } from "react-router-dom";

import { Home } from "../Features/Home/intex";



function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default Router;
