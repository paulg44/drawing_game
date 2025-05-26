import { useEffect, useState } from "react";
import { useCategory } from "../../providers/CategoryContext";
import { useGameLogic } from "../../hooks/useGameLogic";
import kidsData from "../../assets/data/kidsCategories.json";

function MongoFetchTest() {
  const [shapeName, setShapeName] = useState(null);
  const [shapeImg, setShapeImg] = useState(null);
  //   const [userShape, setUserShape] = useState("square");

  const { category, setCategory } = useCategory();
  const mainCategories = Object.keys(kidsData.kidsCategories);

  // Handles category selection by updating context with the selected category's data
  function handleCategorySelection(categoryItem) {
    const selectedCategory = kidsData.kidsCategories[categoryItem].items;
    setCategory({ name: categoryItem, items: selectedCategory });
  }

  const { randomItem } = useGameLogic();

  console.log(randomItem);

  useEffect(() => {
    if (!randomItem) return;

    const fetchShape = async () => {
      try {
        const response = await fetch("http://localhost:3020/api/shape", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userShape: randomItem }),
        });
        const data = await response.json();

        if (response.ok) {
          setShapeName(data.name);
          setShapeImg(data.image);
          console.log(data);
        } else {
          console.error(data.message || "Failed to fetch shape");
        }
      } catch (error) {
        console.error("Error fetching shape", error);
      }
    };

    fetchShape();
  }, [randomItem]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>{shapeName}</h1>
      <img src={shapeImg} alt="test image" />
      {/* <input
        name="shapePicker"
        value={userShape}
        onChange={(e) => setUserShape(e.target.value)}
      /> */}
      <div className="categoryListContainer">
        {/* Renders a button from each available category */}
        {mainCategories.map((categoryItem, index) => (
          <button
            className={`categoryBtn ${categoryItem}`}
            key={index}
            onClick={() => handleCategorySelection(categoryItem)}
            style={{
              background: `url(${kidsData.kidsCategories[categoryItem].image}) no-repeat center center/cover`,
            }}
          >
            <span>{categoryItem}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default MongoFetchTest;
