import "../../assets/css/Display.css";
import DisplayBtns from "./DisplayBtns";

function Display({ randomItem, handleRespin, handleDictionaryApi }) {
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
      <DisplayBtns
        randomItem={randomItem.name}
        onRespin={handleRespin}
        onDictionaryName={handleDictionaryApi}
      />
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
