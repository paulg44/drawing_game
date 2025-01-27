import "../assets/css/Canvas.css";
import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Popup } from "reactjs-popup";
import { Stage, Layer, Line } from "react-konva";

function Canvas({ randomItem }) {
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
        width: 518,
        height: canvasContainerRef.current.offsetHeight,
      });
    }

    const handleResize = () => {
      if (canvasContainerRef.current) {
        setCanvasSize({
          width: 518,
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

  const calculateScore = async () => {
    const convertToBase64 = (blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };

    const userImageData = stageRef.current.toDataURL();
    const randomImageUrl = randomItem.image;

    const response = await fetch(randomImageUrl);
    const blob = await response.blob();

    const randomImageDataUrl = await convertToBase64(blob);

    console.log(
      "User Image Base64 (first 50 chars):",
      userImageData.slice(0, 50)
    );
    console.log(
      "Random Image Base64 (first 50 chars):",
      randomImageDataUrl.slice(0, 50)
    );
    try {
      const compareResponse = await fetch(
        "http://localhost:3020/compare-images",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userImagePath: userImageData,
            randomImagePath: randomImageDataUrl,
          }),
        }
      );

      const result = await compareResponse.json();
      console.log("Comparison data:", result);
    } catch (error) {
      console.error("Error fetching saved images from server", error);
    }
  };

  const handleSaveImage = async () => {
    const convertToBase64 = (blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };

    const userImageData = stageRef.current.toDataURL();

    const randomImageUrl = randomItem.image;

    const response = await fetch(randomImageUrl);
    const blob = await response.blob();

    const randomImageDataUrl = await convertToBase64(blob);

    try {
      console.log(
        "User Image Base64 (first 50 chars):",
        userImageData.slice(0, 50)
      );

      const saveResponse = await fetch("/save-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userImage: userImageData,
          randomImage: randomImageDataUrl,
          metadata: randomItem,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await saveResponse.json();
      console.log("Image saved successfully client:", data);
    } catch (error) {
      console.error("Error saving image client side:", error);
    }
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
        <button onClick={calculateScore}>Compare/Save Images</button>
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
