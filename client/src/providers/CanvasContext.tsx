import { createContext, useContext, ReactNode } from "react";
import { useCanvas } from "../hooks/useCanvas";
import { CanvasContextType } from "../types/canvasContextTypes";
import { ProviderPropsTypes } from "../types/common";

//  Create new context
const CanvasContext = createContext<CanvasContextType | null>(null);

// Wraps part of the app in provider to share canvas related states and event handlers
export const CanvasProvider = ({ children }: ProviderPropsTypes) => {
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
export const useCanvasContext = (): CanvasContextType => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("useCanvasContext must be used within a CanvasProvider");
  }
  return context;
};
