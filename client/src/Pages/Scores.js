import { useState } from "react";

function Scores() {
  const [score, setScore] = useState(0);

  const calculateScore = () => {
    try {
      const imageResponse = fetch();
    } catch (error) {
      console.error("Error fetching saved images from server", error);
    }
  };

  return (
    <div>
      <h2>Your score is {score}</h2>
    </div>
  );
}

export default Scores;
