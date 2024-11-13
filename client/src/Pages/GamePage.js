import { useLocation } from "react-router-dom";
import { Stage, Layer, Text, Line } from "react-konva";
import "../assets/css/GamePage.css";
import { useEffect, useRef, useState } from "react";

function GamePage() {
  // Canvas Side
  const [tool, setTool] = useState("pen");
  const [lines, setLines] = useState([]);
  const [color, setColor] = useState("#000");
  const isDrawing = useRef(false);

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

  const handleMouseUp = (e) => {
    isDrawing.current = false;
  };

  const handleColorPicker = (e) => {
    setColor(e.target.value);
  };

  const handleClearPage = () => {
    setLines([]);
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
        {randomItem && (
          <>
            <h2>{randomItem.name}</h2>
            <img src={randomItem.image} alt={randomItem.name} />
          </>
        )}
      </div>
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
          <div className="colorPickerContainer">
            <input
              type="radio"
              id="redColor"
              name="color"
              value="#FF0000"
              onChange={handleColorPicker}
            />
            <label>Red</label>
            <input
              type="radio"
              id="blueColor"
              name="color"
              value="#0000FF"
              onChange={handleColorPicker}
            />
            <label>Blue</label>
            <input
              type="radio"
              id="greenColor"
              name="color"
              value="#00FF00"
              onChange={handleColorPicker}
            />
            <label>Green</label>
            <input
              type="radio"
              id="purpleColor"
              name="color"
              value="#6600FF"
              onChange={handleColorPicker}
            />
            <label>Purple</label>
          </div>
        </div>
        <Stage
          width={canvasSize.width}
          height={canvasSize.height}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          onMouseMove={handleMouseMove}
          onTouchMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
        >
          <Layer>
            <Text text="Draw away!" x={5} y={30} />
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
    </div>
  );
}

export default GamePage;
