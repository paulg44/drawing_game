import { useLocation } from "react-router-dom";
import { Stage, Layer, Text, Line } from "react-konva";
import "../assets/css/GamePage.css";
import { useEffect, useRef, useState } from "react";

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
  const [randomItem, setRandomItem] = useState(null);
  const { state } = useLocation();
  const category = state?.category;

  useEffect(() => {
    if (category && category.items.length > 0) {
      const pickRandom = Math.floor(Math.random() * category.items.length);
      const selectedItem = category.items[pickRandom];
      setRandomItem(selectedItem);
    }
    console.log(category, randomItem);
  }, [category, randomItem]);

  if (!category || category.length === 0) {
    return <div>No category selected or category is empty</div>;
  }

  return (
    <div className="gamePage">
      <div className="pictureDisplayContainer">
        <h2>Display Side</h2>
        {randomItem && (
          <>
            <h3>{randomItem.name}</h3>
            <img src={randomItem.image} alt={randomItem.name} />
          </>
        )}
      </div>
      <div className="canvasContainer">
        <h2>Canvas Side</h2>
        <select
          value={tool}
          onChange={(e) => {
            setTool(e.target.value);
          }}
        >
          <option value="pen">Pen</option>
          <option value="eraser">Eraser</option>
        </select>
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
                strokeWidth={3}
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
    </div>
  );
}

export default GamePage;
