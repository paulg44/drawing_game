import { useEffect, useState } from "react";

function MongoFetchTest() {
  const [shapeName, setShapeName] = useState(null);
  const [shapeImg, setShapeImg] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShape = async () => {
      try {
        const response = await fetch("http://localhost:3020/api/shape", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (response.ok) {
          setShapeName(data.name);
          setShapeImg(data.image);
          console.log(data);
        } else {
          setError(data.message || "Failed to fetch shape");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching shape", error);
      }
    };

    fetchShape();
  }, []);

  if (!shapeName) return <div>Loading.....</div>;

  return (
    <div>
      <h1>{shapeName}</h1>
      <img src={shapeImg} alt="test image" />
    </div>
  );
}

export default MongoFetchTest;
