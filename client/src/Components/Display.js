import { useCategory } from "../context/CategoryContext";

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
      <button onClick={handleRespin}>Re-spin</button>
      <button onClick={handleDictionaryAPI}>Click to Play Sound</button>
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
