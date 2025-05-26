// This file handles the game logic and random category selection, along with the functions of the display buttons

import { useEffect, useState } from "react";
import { useCategory } from "../providers/CategoryContext";
import { fetchDictionaryAPI } from "../services/dictionaryApi";
import { fetchFromMongo } from "../services/databaseApi";

export function useGameLogic() {
  // Random item state
  const [randomItem, setRandomItem] = useState([]);
  const [loading, setLoading] = useState(true);

  // category variable from category context
  const { category } = useCategory();

  // useEffect function for the selection of a random category. If a category is selected this function selects a random item from the list and sets the variable. As its a useEffect if category changes state it will re-run the function

  const getMongoData = async () => {
    if (category?.items?.length > 0) {
      const pickRandom = Math.floor(Math.random() * category.items.length);
      const selectedItem = category.items[pickRandom];

      const data = await fetchFromMongo(selectedItem);
      setLoading(true);
      setRandomItem(data);
      console.log(data);
      setLoading(false);
    }
  };

  // handles selecting a different item on the display page
  useEffect(() => {
    getMongoData();
  }, [category]);

  const handleRespin = () => {
    getMongoData();
  };

  // Calls the dictionary API to fetch the pronunciation audio for the random item's name. If the audio URL is found, it plays the audio for the user
  const handleDictionaryAPI = async () => {
    if (!randomItem) return;
    const audioUrl = await fetchDictionaryAPI(randomItem);
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  // states and handlers to be used in other components
  return { randomItem, handleRespin, handleDictionaryAPI, loading };
}
