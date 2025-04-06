import { createContext, useContext, useState } from "react";
import { useCanvas } from "../hooks/useCanvas";

//  Create new context
const CanvasContext = createContext();

// Wraps part of the app in provider to share canvas related states and event handlers
export const CanvasProvider = ({ children }) => {
  // Variables and functions from canvas hook
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

  // Clears canvas by setting the lines variable to an empty array
  const clearCanvas = () => setLines([]);

  return (
    // Makes canvas state and handlers available to child components
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

// Custom hook to access canvas context
export const useCanvasContext = () => useContext(CanvasContext);
