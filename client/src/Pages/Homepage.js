import { Link } from "react-router-dom";
import kidsData from "../assets/data/kidsCategories.json";
import colorData from "../assets/data/colours.json";
import { useState } from "react";

function Homepage() {
  const [category, setCategory] = useState({});
  const [color, setColor] = useState({});
  const mainCategories = Object.keys(kidsData.kidsCategories);

  function handleCategorySelection(categoryName) {
    const selectedCategory = kidsData.kidsCategories[categoryName];
    setCategory({ name: categoryName, items: selectedCategory });
  }

  console.log(category);

  return (
    <div className="homepage">
      <h1>Welcome to Ivy's game!</h1>
      <h5>Pick a category</h5>
      <ul>
        {mainCategories.map((categoryItem, index) => (
          <button
            key={index}
            onClick={() => handleCategorySelection(categoryItem)}
          >
            <li>{categoryItem}</li>
          </button>
        ))}
      </ul>
      <h5>Pen Colour</h5>
      <ul>
        {colorData.colors.map((colorItem) => (
          <button key={colorItem.id}>
            <li style={{ color: colorItem.hex }}>{colorItem.name}</li>
          </button>
        ))}
      </ul>
      {/* Placeholders for now */}
      <Link to="/game">Game</Link>
      <Link to="/score">Scores</Link>
    </div>
  );
}

export default Homepage;
