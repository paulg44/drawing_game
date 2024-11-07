import "../assets/css/GamePage.css";
import Canvas from "../Components/Canvas";
import PictureDisplay from "../Components/PictureDisplay";

function GamePage() {
  return (
    <div className="gamePage">
      <PictureDisplay />
      <Canvas />
    </div>
  );
}

export default GamePage;
