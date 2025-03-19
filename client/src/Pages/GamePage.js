import "../assets/css/GamePage.css";
import { useEffect, useState } from "react";
import { useCategory } from "../context/CategoryContext";
import Canvas from "../Components/Canvas/Canvas";
import Display from "../Components/Display";

function GamePage() {
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

  const handleRespin = () => {
    setRandomItem(null);
  };

  let audio = null;

  const handleDictionaryAPI = async () => {
    try {
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

      // await handleSaveImage();
    } catch (error) {
      console.error(
        "error fetching dictionary data or saving display image:",
        error
      );
    }
  };

  return (
    <div className="gamePage">
      <Display
        randomItem={randomItem}
        handleRespin={handleRespin}
        handleDictionaryAPI={handleDictionaryAPI}
      />
      <Canvas randomItem={randomItem} />
    </div>
  );
}

export default GamePage;
