import "../../assets/css/Canvas.css";
import { useEffect, useRef, useState } from "react";
import { CanvasProvider, useCanvasContext } from "../../context/CanvasContext";
import CanvasStage from "./CanvasStage";
import CanvasToolbar from "./CanvasToolbar";

function Canvas({ randomItem }) {
  return (
    <CanvasProvider randomItem={randomItem}>
      <CanvasContent />
    </CanvasProvider>
  );

  function CanvasContent() {
    const {
      score,
      stageRef,
      lines,
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
    } = useCanvasContext();
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
