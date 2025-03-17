import { useCategory } from "../context/CategoryContext";
import { ImSpinner11 } from "react-icons/im";
import { PiSpeakerLowBold } from "react-icons/pi";

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
      <button onClick={handleRespin}>
        <ImSpinner11 />
      </button>
      <button onClick={handleDictionaryAPI}>
        <PiSpeakerLowBold />
      </button>
      {randomItem && (
        <>
          <h2>{randomItem.name}</h2>
          <img src={randomItem.image} alt={randomItem.name} />
        </>
      )}
    </div>
  );
}

export default Display;
