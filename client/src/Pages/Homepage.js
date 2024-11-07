import { Link } from "react-router-dom";
import kidsData from "../assets/data/kidsCategories.json";
import colorData from "../assets/data/colours.json";

function Homepage() {
  const mainCategories = Object.keys(kidsData.kidsCategories);
  return (
    <div className="homepage">
      <h1>Welcome to Ivy's game!</h1>
      <h5>Pick a category</h5>
      <ul>
        {mainCategories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
      <h5>Pen Colour</h5>
      <ul>
        {colorData.colors.map((color) => (
          <li key={color.id}>{color.name}</li>
        ))}
      </ul>
      {/* Placeholders for now */}
      <Link to="/game">Game</Link>
      <Link to="/score">Scores</Link>
    </div>
  );
}

export default Homepage;
