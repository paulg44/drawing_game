import { useLocation } from "react-router-dom";
import { Stage, Layer, Circle, Text, Line } from "react-konva";
import "../assets/css/GamePage.css";
import { useRef, useState } from "react";

function GamePage() {
  // Canvas Side
  const [tool, setTool] = useState("pen");
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
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

  // Display Side
  const { state } = useLocation();
  const category = state?.category;

  console.log(category);

  if (!category) {
    return <div>No category selected</div>;
  }

  return (
    <div className="gamePage">
      <div className="pictureDisplayContainer">
        <h2>Display Side</h2>
        {/* Replace with one random image */}
        <ul>
          {category.items.map((item) => (
            <li key={item.id}>
              {item.name}
              <img src={item.image} alt={item.name} />
            </li>
          ))}
        </ul>
      </div>
      <div className="canvasContainer">
        <h2>Canvas Side</h2>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <Layer>
            <Text text="Draw away!" x={5} y={30} />
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="#df4b26"
                strokeWidth={5}
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
        <select
          value={tool}
          onChange={(e) => {
            setTool(e.target.value);
          }}
        >
          <option value="pen">Pen</option>
          <option value="eraser">Eraser</option>
        </select>
      </div>
    </div>
  );
}

export default GamePage;
