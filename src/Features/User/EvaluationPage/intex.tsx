import { ReactElement } from "react";
import { useLocation } from "react-router-dom";

export function EvaluationPage(): ReactElement {
  const location = useLocation();
  const participant = location.state?.participant;
  return <div>Evaluation</div>;
}
