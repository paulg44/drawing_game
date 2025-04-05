// Component to hold the Canvas for a user to draw on, we also import the canvas toolbar here to have it overlaid on the top of the canvas only.

import "../../assets/css/Canvas.css";
import { useEffect, useRef, useState } from "react";
import { CanvasProvider, useCanvasContext } from "../../context/CanvasContext";
import CanvasStage from "./CanvasStage";
import CanvasToolbar from "./CanvasToolbar";
import { ScoreProvider, useScoreContext } from "../../context/ScoreContext";

// randomItem is passed into this component and then on into the ScoreProvider as we need the name of the randomItem in the handleCalculateScore function
function Canvas({ randomItem }) {
  return (
    // Wrap the Canvas in the context to be able to pass the props down
    <CanvasProvider>
      <ScoreProvider randomItem={randomItem}>
        <CanvasContent />
      </ScoreProvider>
    </CanvasProvider>
  );

  function CanvasContent() {
    // Variables from canvas context
    const { stageRef, lines, handleMouseDown, handleMouseMove, handleMouseUp } =
      useCanvasContext();
    // Import the score as we need it for now to be displayed after a user clicks the submit btn for a score. This may not be needed in the future when we create a displayScore page
    const { score } = useScoreContext();
    const canvasContainerRef = useRef(null);
    const [canvasSize, setCanvasSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // This sets the canvas size relative to the size of the window it is in
    useEffect(() => {
      if (canvasContainerRef.current) {
        setCanvasSize({
          width: canvasContainerRef.current.offsetWidth,
          height: canvasContainerRef.current.offsetHeight,
        });
      }

      const handleResize = () => {
        if (canvasContainerRef.current) {
          setCanvasSize({
            width: 518,
            height: canvasContainerRef.current.offsetHeight,
          });
        }
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
      <div className="canvasContainer" ref={canvasContainerRef}>
        <p>{score === null ? "Awaiting score..." : score}</p>
        <CanvasToolbar />
        <CanvasStage
          stageRef={stageRef}
          lines={lines}
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          canvasSize={canvasSize}
        />
      </div>
    );
  }
}

export default Canvas;
