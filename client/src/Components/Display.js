import { useCategory } from "../context/CategoryContext";
import { useEffect, useState } from "react";

function Display() {
  // Display Side
  const [randomItem, setRandomItem] = useState(null);
  const { category } = useCategory();

  useEffect(() => {
    if (category?.items?.length > 0) {
      const pickRandom = Math.floor(Math.random() * category.items.length);
      const selectedItem = category.items[pickRandom];
      setRandomItem(selectedItem);
    }
    console.log(category, randomItem);
  }, [category, randomItem]);

  if (!category || category.length === 0) {
    return (
      <div>
        <h2>No category selected or category is empty</h2>
        <p>If you refreshed the page please go back</p>
      </div>
    );
  }

  const handleRespin = () => {
    setRandomItem(null);
  };

  let audio = null;

  const handleDictionaryAPI = async () => {
    const apiResponse = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${randomItem.name}`
    );
    const apiData = await apiResponse.json();
    const audioUrl =
      apiData[0].phonetics[1].audio || apiData[0].phonetics[0].audio;
    if (audio) {
      audio.pause();
    }
    audio = new Audio(audioUrl);
    audio.play();
  };
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
