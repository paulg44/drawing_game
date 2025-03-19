import "../assets/css/GamePage.css";
import { useGameLogic } from "../hooks/useGameLogic";
import Canvas from "../Components/Canvas/Canvas";
import Display from "../Components/RandomItemDisplay/Display";

function GamePage() {
  const { randomItem, handleRespin, handleDictionaryAPI } = useGameLogic();

  return (
    <div className="gamePage">
      <Display
        randomItem={randomItem}
        handleRespin={handleRespin}
        handleDictionaryAPI={handleDictionaryAPI}
      />
      <Canvas randomItem={randomItem} />
    </div>
  );
}

export default GamePage;
