import { createContext, useContext, useState } from "react";
import { useCanvas } from "../hooks/useCanvas";

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
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

  return (
    <CanvasContext.Provider
      value={{
        tool,
        setTool,
        color,
        setColor,
        lines,
        stageRef,

        clearCanvas,

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
