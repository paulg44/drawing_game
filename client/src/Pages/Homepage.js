import { Link, useNavigate } from "react-router-dom";
import kidsData from "../assets/data/kidsCategories.json";
import colorData from "../assets/data/colours.json";
import { useState } from "react";

function Homepage() {
  const [category, setCategory] = useState({});
  // const [color, setColor] = useState({});
  const mainCategories = Object.keys(kidsData.kidsCategories);
  const navigate = useNavigate();

  function handleCategorySelection(categoryItem) {
    const selectedCategory = kidsData.kidsCategories[categoryItem];
    setCategory({ name: categoryItem, items: selectedCategory });
  }

  function startGame() {
    if (category) {
      navigate("/game", { state: { category } });
    } else {
      console.error("Category should be selected");
    }
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
      <button onClick={startGame}>Start Game</button>
      <Link to="/score">Scores</Link>
    </div>
  );
}

export default Homepage;
