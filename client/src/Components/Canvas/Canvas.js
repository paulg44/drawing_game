import "../../assets/css/Canvas.css";
import { useEffect, useRef, useState } from "react";
import { useCanvas } from "../../hooks/useCanvas";
import { calculateScore } from "../../services/canvasApi";
import CanvasStage from "./CanvasStage";
import CanvasToolbar from "./CanvasToolbar";

function Canvas({ randomItem }) {
  const [score, setScore] = useState("Awaiting Score...");
  const {
    tool,
    setTool,
    color,
    setColor,
    lines,
    setLines,
    stageRef,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
  } = useCanvas();

  const canvasContainerRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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

  const handleCalculateScore = async () => {
    const userImageData = stageRef.current.toDataURL();
    const base64String = userImageData.split(",")[1];
    const score = await calculateScore(base64String, randomItem.name);
    console.log("Score:", score);

    setScore(score);
  };

  return (
    <div className="canvasContainer" ref={canvasContainerRef}>
      <p>{score === null ? "Awaiting score..." : score}</p>
      <CanvasToolbar
        tool={tool}
        setTool={setTool}
        color={color}
        setColor={setColor}
        onClear={() => setLines([])}
        onGetScore={handleCalculateScore}
      />
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

export default Canvas;
