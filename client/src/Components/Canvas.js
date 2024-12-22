import "../assets/css/Canvas.css";
import { useEffect, useRef, useState } from "react";
// import * as resemble from "resemblejs";
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

  // I am trying two ways of saving and comparing images. This function uses a server, currently saves both the user image and random image to server. However I don't believe it's saving the random image in the correct format as it isn't visible like the users image is.
  // const handleSaveImage = async () => {
  //   const userImageData = stageRef.current.toDataURL();

  //   const randomImageUrl = randomItem.image;

  //   try {
  //     const response = await fetch(randomImageUrl);
  //     const blob = await response.blob();

  //     const randomImageDataUrl = await convertToBase64(blob);

  //     const saveResponse = await fetch("/save-image", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         userImage: userImageData,
  //         randomImage: randomImageDataUrl,
  //         metadata: randomItem,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Server error: ${response.statusText}`);
  //     }

  //     const data = await saveResponse.json();
  //     console.log("Image saved successfully client:", data);
  //   } catch (error) {
  //     console.error("Error saving image client side:", error);
  //   }
  // };

  // const convertToBase64 = (blob) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result);
  //     reader.onerror = reject;
  //     reader.readAsDataURL(blob);
  //   });
  // };

  // This is the client side version of the function above, converts the two images client side and compares them using resemblejs
  // const handleCompareImages = async () => {
  //   const userImageData = stageRef.current.toDataURL();
  //   const randomImageUrl = randomItem.image;

  //   const userImage = new Image();
  //   const randomImage = new Image();

  //   const userImageBlob = await dataURLToBlob(userImageData);
  //   const userImageBlobURL = URL.createObjectURL(userImageBlob);

  //   userImage.src = userImageBlobURL;
  //   randomImage.src = randomImageUrl;

  //   userImage.onload = () => {
  //     randomImage.onload = () => {
  //       resemble(userImage)
  //         .compareTo(randomImage)
  //         .ignoreColors()
  //         .onComplete((data) => {
  //           console.log(data);
  //         });
  //     };
  //   };
  // };
  // const dataURLToBlob = async (dataURL) => {
  //   return fetch(dataURL).then((res) => res.blob());
  // };

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

        {/* <button onClick={handleSaveImage}>Save Image</button> */}
        <button onClick={handleCompareImages}>Compare Images</button>
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
