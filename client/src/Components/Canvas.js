import "../assets/css/Canvas.css";
import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Popup } from "reactjs-popup";

import { Stage, Layer, Line } from "react-konva";
function Canvas() {
  // Canvas Side
  const [tool, setTool] = useState("pen");
  const [lines, setLines] = useState([]);
  const [color, setColor] = useState("#000");
  const isDrawing = useRef(false);

  const stageRef = useRef(false);

  const canvasContainerRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

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
          width: canvasContainerRef.current.offsetWidth,
          height: canvasContainerRef.current.offsetHeight,
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y], color }]);
  };

  const handleMouseMove = (e) => {
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
  };

  const handleSaveImage = () => {
    const dataURL = stageRef.current.toDataURL();

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas_drawing.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearPage = () => {
    setLines([]);
  };
  return (
    <div className="canvasContainer" ref={canvasContainerRef}>
      <h2>Canvas Side</h2>
      <div className="canvasTools">
        <select
          value={tool}
          onChange={(e) => {
            setTool(e.target.value);
          }}
        >
          <option value="pen">Pen</option>
          <option value="eraser">Eraser</option>
        </select>
        <button type="button" onClick={handleClearPage}>
          Clear Page
        </button>
        <Popup className="popup=content" trigger={<button>Pick Color</button>}>
          <div className="colorPickerContainer">
            {" "}
            <HexColorPicker color={color} onChange={setColor} />
          </div>
        </Popup>

        <button onClick={handleSaveImage}>Save Image</button>
      </div>
      <Stage
        width={canvasSize.width}
        height={canvasSize.height}
        ref={stageRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={line.tool === "eraser" ? 26 : 8}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

export default Canvas;
