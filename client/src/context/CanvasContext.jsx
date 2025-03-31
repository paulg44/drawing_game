import { createContext, useContext, useState, useRef } from "react";
import { useCanvas } from "../hooks/useCanvas";
import { calculateScore } from "../services/canvasApi";

const CanvasContext = createContext();

export const CanvasProvider = ({ children, randomItem }) => {
  const [score, setScore] = useState("Awaiting Score...");
  const [isDisabled, setIsDisabled] = useState(false);

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

  const clearCanvas = () => setLines([]);

  const handleCalculateScore = async () => {
    setIsDisabled(true);
    const userImageData = stageRef.current.toDataURL();
    const base64String = userImageData.split(",")[1];
    const result = await calculateScore(base64String, randomItem.name);
    console.log("Score:", result);

    setScore(result);
    setIsDisabled(false);
  };

  return (
    <CanvasContext.Provider
      value={{
        tool,
        setTool,
        color,
        setColor,
        lines,
        stageRef,
        score,
        isDisabled,
        clearCanvas,
        handleCalculateScore,
        handleMouseDown,
        handleMouseUp,
        handleMouseMove,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvasContext = () => useContext(CanvasContext);
