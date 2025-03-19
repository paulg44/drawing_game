import { useState, useRef } from "react";

export const useCanvas = () => {
  const [tool, setTool] = useState("pen");
  const [lines, setLines] = useState([]);
  const [color, setColor] = useState("#fff");
  const isDrawing = useRef(false);

  const stageRef = useRef(false);

  const handleDisableScroll = (e) => {
    e.preventDefault();
  };

  const handleMouseDown = (e) => {
    e.evt.preventDefault();
    isDrawing.current = true;
    document.addEventListener("touchmove", handleDisableScroll, {
      passive: false,
    });

    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y], color }]);
  };

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

  const handleMouseUp = () => {
    isDrawing.current = false;
    document.removeEventListener("touchmove", handleDisableScroll);
  };

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
  };
};
