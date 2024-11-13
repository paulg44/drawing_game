import { Link, useNavigate } from "react-router-dom";
import "../assets/css/Homepage.css";
import kidsData from "../assets/data/kidsCategories.json";
import { useState } from "react";

function Homepage() {
  const [category, setCategory] = useState({});
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
            className="categoryBtn"
            key={index}
            onClick={() => handleCategorySelection(categoryItem)}
          >
            <li>{categoryItem}</li>
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
