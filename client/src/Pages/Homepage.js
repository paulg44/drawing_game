import { Link, useNavigate } from "react-router-dom";
import "../assets/css/Homepage.css";
import kidsData from "../assets/data/kidsCategories.json";
// import { useState } from "react";
import { useCategory } from "../context/CategoryContext";
import backgroundIMG from "../assets/images/backgroundHomepage.jpg";

function Homepage() {
  const { category, setCategory } = useCategory();
  const mainCategories = Object.keys(kidsData.kidsCategories);
  const navigate = useNavigate();

  function handleCategorySelection(categoryItem) {
    const selectedCategory = kidsData.kidsCategories[categoryItem];
    setCategory({ name: categoryItem, items: selectedCategory });
  }

  function startGame() {
    if (category) {
      navigate("/game");
    } else {
      console.error("Category should be selected");
    }
  }

  console.log(category);

  return (
    <div
      className="homepage"
      style={{
        background: `url(${backgroundIMG}) no-repeat center center/cover`,
      }}
    >
      <h1>Welcome to Ivy's game!</h1>
      <h5>Pick a category</h5>
      <div className="categoryListContainer">
        {mainCategories.map((categoryItem, index) => (
          <button
            className="categoryBtn"
            key={index}
            onClick={() => handleCategorySelection(categoryItem)}
          >
            {categoryItem}
          </button>
        ))}
      </div>

      {/* Placeholders for now */}
      <button className="startBtn" onClick={startGame}>
        Start Game
      </button>
      <Link to="/score">Scores</Link>
    </div>
  );
}

export default Homepage;
