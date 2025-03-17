import { useCategory } from "../context/CategoryContext";
import { ImSpinner11 } from "react-icons/im";
import { PiSpeakerLowBold } from "react-icons/pi";
import "../assets/css/Display.css";

function Display({ handleRespin, handleDictionaryAPI, randomItem }) {
  // Display Side

  const { category } = useCategory();

  if (!category || category.length === 0) {
    return (
      <div>
        <h2>No category selected or category is empty</h2>
        <p>If you refreshed the page please go back</p>
      </div>
    );
  }

  return (
    <div className="pictureDisplayContainer">
      <div className="displaySideBtns">
        <button className="displayBtn" onClick={handleRespin}>
          <ImSpinner11 />
        </button>
        <button className="displayBtn" onClick={handleDictionaryAPI}>
          <PiSpeakerLowBold />
        </button>
      </div>
      <div className="randomDisplayItem">
        {randomItem && (
          <>
            <h2>{randomItem.name}</h2>
            <img src={randomItem.image} alt={randomItem.name} />
          </>
        )}
      </div>
    </div>
  );
}

export default Display;
