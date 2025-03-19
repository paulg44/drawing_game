import { useEffect, useState } from "react";
import { useCategory } from "../context/CategoryContext";
import { fetchDictionaryAPI } from "../services/dictionaryApi";

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
    if (!randomItem) return;
    const audioUrl = await fetchDictionaryAPI(randomItem.name);
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  return { randomItem, handleRespin, handleDictionaryAPI };
}
