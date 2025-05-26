// Component for the canvas functionality. Here we are using the props from canvasContext to render drawing area and handle user input, lines are rendered based on user interaction.

import { Stage, Layer, Line } from "react-konva";

const CanvasStage = ({
  stageRef,
  lines,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  canvasSize,
}) => {
  return (
    // Stage is the main drawing surface. In real life terms is like the piece of paper you would draw on
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
      onMouseLeave={handleMouseUp}
      style={{ background: "black" }}
    >
      {/* At least one layer is needed when using stage with Konva. Again in the real world a multiple layers would be multiple sheets of paper on top of each other. */}
      <Layer>
        {lines.map((line, i) => (
          // This controls how each line is drawn. Each line is drawn based on its tool, color, and point data.
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
  );
};

export default CanvasStage;
