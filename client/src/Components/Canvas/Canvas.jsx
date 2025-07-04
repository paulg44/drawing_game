// Component to hold the Canvas for a user to draw on, we also import the canvas toolbar here to be positioned over the canvas using CSS.

import "../../assets/css/Canvas.css";
import { useEffect, useRef, useState } from "react";
import { CanvasProvider, useCanvasContext } from "../../context/CanvasContext";
import CanvasStage from "./CanvasStage";
import CanvasToolbar from "./CanvasToolbar";
import { ScoreProvider, useScoreContext } from "../../context/ScoreContext";

// randomItem is passed into this component and then on into the ScoreProvider as we need the name of the randomItem in the handleCalculateScore function
function Canvas({ randomItem, handleRespin, isFullWidth = false }) {
  return (
    // Wrap canvas in CanvasProvider and ScoreProvider to give child components access to canvas state and scoring logic.
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

      // If screen is resized during the drawing process the canvas will resize to fit the window
      const handleResize = () => {
        if (canvasContainerRef.current) {
          setCanvasSize({
            width: canvasContainerRef.current.offsetWidth,
            height: canvasContainerRef.current.offsetHeight,
          });
        }
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
      <div
        className={`canvasContainer ${isFullWidth ? "fullWidthCanvas" : ""}`}
        ref={canvasContainerRef}
      >
        <CanvasToolbar handleRespin={handleRespin} />
        {/* Props from canvasContext are passed into CanvasStage for rendering and interaction. */}
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
