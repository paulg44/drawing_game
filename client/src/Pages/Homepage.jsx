// The landing page for the app. Renders the categories, as buttons. Once a category is selected a user can start a game.

import { Link, useNavigate } from "react-router-dom";
import "../assets/css/Homepage.css";
import kidsData from "../assets/data/kidsCategories.json";
import { useCategory } from "../context/CategoryContext";
import backgroundIMG from "../assets/images/backgroundHomepage.jpg";
import { useSound } from "use-sound";
import btnFX from "../assets/audio/fx/mixkit-game-ball-tap-2073.wav";

function Homepage() {
  const [play] = useSound(btnFX);

  // Variables from the category context
  const { category, setCategory } = useCategory();
  const mainCategories = Object.keys(kidsData.kidsCategories);
  const navigate = useNavigate();

  // Handles category selection by updating context with the selected category's data
  function handleCategorySelection(categoryItem) {
    play();
    const selectedCategory = kidsData.kidsCategories[categoryItem].items;
    setCategory({ name: categoryItem, items: selectedCategory });
  }

  // If a category is selected, navigate to the game page
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
      <Link to="just-draw">Just want to draw? Click me!</Link>
      <div className="categoryListContainer">
        {/* Renders a button from each available category */}
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

      {/* Shows a user what category they have picked */}
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
