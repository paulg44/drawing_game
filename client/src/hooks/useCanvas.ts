// This file holds all the canvas logic, handlers and states. For the canvas it uses Konva. If you want documentation for Konva or more information about how Konva works go here: https://konvajs.org/docs/react/index.html
import { useState, useRef } from "react";
import { ToolType } from "../types/canvasContextTypes";

export const useCanvas = () => {
  // States for the canvas
  const [tool, setTool] = useState<ToolType>("pen");
  const [lines, setLines] = useState([]);
  const [color, setColor] = useState("#fff");

  // Reference, will toggle true when user starts drawing
  const isDrawing = useRef(false);

  // stageRef is a reference to the Konva Stage, allowing us to interact with the canvas element and get the pointer position
  const stageRef = useRef(false);

  const handleDisableScroll = (e) => {
    e.preventDefault();
  };

  // handler for when a user either clicks the mouse or puts a finger on touchscreen
  const handleMouseDown = (e) => {
    e.evt.preventDefault();
    isDrawing.current = true;
    document.addEventListener("touchmove", handleDisableScroll, {
      passive: false,
    });

    // lines holds the array of lines a user has drawn on the canvas
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y], color }]);
  };

  // If the user is drawing, this handler updates the last line with new points as the mouse or finger move
  const handleMouseMove = (e) => {
    // e.preventDefault();
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];

    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  // handler for when a user lets go of mouse button or removes finger from touchscreen
  const handleMouseUp = () => {
    isDrawing.current = false;
    document.removeEventListener("touchmove", handleDisableScroll);
  };

  const clearCanvas = () => setLines([]);

  // states and handlers to be passed down
  return {
    tool,
    setTool,
    color,
    setColor,
    lines,
    setLines,
    stageRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    clearCanvas,
  };
};
