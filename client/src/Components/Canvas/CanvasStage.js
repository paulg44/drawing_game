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
  );
};

export default CanvasStage;
