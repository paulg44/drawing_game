import { useScoreContext } from "../context/ScoreContext";

function ScoreDisplay() {
  const { score } = useScoreContext();
  return <div className="scoreDisplay">{score}</div>;
}

export default ScoreDisplay;
