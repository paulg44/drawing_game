import { useLocation } from "react-router-dom";
import "../assets/css/GamePage.css";

function GamePage() {
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
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
      <div className="canvasContainer">
        <h2>Canvas Side</h2>
      </div>
      {/* <PictureDisplay />
      <Canvas /> */}
    </div>
  );
}

export default GamePage;
