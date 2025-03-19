import { useEffect, useState } from "react";
import { useCategory } from "../context/CategoryContext";

export function useGameLogic() {
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

  const handleDictionaryAPI = async () => {
    try {
      const apiResponse = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${randomItem.name}`
      );
      const apiData = await apiResponse.json();
      const audioUrl =
        apiData[0].phonetics[1].audio || apiData[0].phonetics[0].audio;
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play();
      }
    } catch (error) {
      console.error(
        "error fetching dictionary data or saving display image:",
        error
      );
    }
  };

  return { randomItem, handleRespin, handleDictionaryAPI };
}
