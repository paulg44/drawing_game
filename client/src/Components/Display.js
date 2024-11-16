import { useCategory } from "../context/CategoryContext";
import { useEffect, useState } from "react";

function Display() {
  // Display Side
  const [randomItem, setRandomItem] = useState(null);
  const { category } = useCategory();

  useEffect(() => {
    if (category && category.items.length > 0) {
      const pickRandom = Math.floor(Math.random() * category.items.length);
      const selectedItem = category.items[pickRandom];
      setRandomItem(selectedItem);
    }
    console.log(category, randomItem);
  }, [category, randomItem]);

  if (!category || category.length === 0) {
    return <div>No category selected or category is empty</div>;
  }
  return (
    <div className="pictureDisplayContainer">
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
