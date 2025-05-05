// The Game Page holds the components Display and Canvas side by side so a user has a view of both and can use the canvas.

import "../assets/css/GamePage.css";
import { useGameLogic } from "../hooks/useGameLogic";
import Canvas from "../Components/Canvas/Canvas";
import Display from "../Components/RandomItemDisplay/Display";
import ScorePopup from "../Components/Score/ScorePopup";
import { useScoreContext } from "../context/ScoreContext";
import { useState } from "react";

function GamePage() {
  // Variables from game logic file
  const { randomItem, handleRespin, handleDictionaryAPI } = useGameLogic();

  return (
    <div className="gamePage">
      <Display
        // Props passed down to Display component including current randomItem
        randomItem={randomItem}
        handleRespin={handleRespin}
        handleDictionaryAPI={handleDictionaryAPI}
      />
      <Canvas randomItem={randomItem} />
    </div>
  );
}

export default GamePage;
