import "../assets/css/GamePage.css";
import Canvas from "../Components/Canvas";
import Display from "../Components/Display";

function GamePage() {
  return (
    <div className="gamePage">
      <Display />
      <Canvas />
    </div>
  );
}

export default GamePage;
