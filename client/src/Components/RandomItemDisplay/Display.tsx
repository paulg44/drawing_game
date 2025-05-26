// This component displays a random item from the category the user selected. If a category is not selected we get a message stating that.

import "../../assets/css/Display.css";
import DisplayBtns from "./DisplayBtns";

function Display({ randomItem, handleRespin, handleDictionaryAPI, loading }) {
  if (loading) {
    return <h2>Loading....</h2>;
  }

  if (!randomItem) {
    return (
      <div>
        <h2>No category selected or category is empty</h2>
        <p>If you refreshed the page please go back</p>
      </div>
    );
  }

  return (
    <div className="pictureDisplayContainer">
      <DisplayBtns onRespin={handleRespin} onSound={handleDictionaryAPI} />

      {/* This needs to be displayed from the database */}
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
