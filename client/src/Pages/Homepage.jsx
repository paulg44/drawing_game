import { useNavigate } from "react-router-dom";
import "../assets/css/Homepage.css";
import kidsData from "../assets/data/kidsCategories.json";
// import { useState } from "react";
import { useCategory } from "../context/CategoryContext";
import backgroundIMG from "../assets/images/backgroundHomepage.jpg";
import { useSound } from "use-sound";
import btnFX from "../assets/audio/fx/mixkit-game-ball-tap-2073.wav";
// import { IoShapesSharp } from "react-icons/io5";

function Homepage() {
  const [play] = useSound(btnFX);
  const { category, setCategory } = useCategory();
  const mainCategories = Object.keys(kidsData.kidsCategories);
  const navigate = useNavigate();

  function handleCategorySelection(categoryItem) {
    play();
    const selectedCategory = kidsData.kidsCategories[categoryItem].items;
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
      <div className="categoryListContainer">
        {mainCategories.map((categoryItem, index) => (
          <button
            className={`categoryBtn ${categoryItem}`}
            key={index}
            onClick={() => handleCategorySelection(categoryItem)}
            style={{
              background: `url(${kidsData.kidsCategories[categoryItem].image}) no-repeat center center/cover`,
            }}
          >
            <span>{categoryItem}</span>
          </button>
        ))}
      </div>

      {!category ? (
        <h4>Please pick a category</h4>
      ) : (
        <h4>You have picked {category.name}</h4>
      )}

      <button className="startBtn" onClick={startGame}>
        Start Game
      </button>
    </div>
  );
}

export default Homepage;
