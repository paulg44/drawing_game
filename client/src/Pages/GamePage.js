import { useLocation } from "react-router-dom";
import { Stage, Layer, Circle } from "react-konva";
import "../assets/css/GamePage.css";

function GamePage() {
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
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <Circle x={100} y={100} radius={50} fill="red" draggable />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default GamePage;
