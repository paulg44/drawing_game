import { createContext, useContext, useState } from "react";
import { calculateScore } from "../services/canvasApi";
import { useCanvasContext } from "./CanvasContext";

// Create new context
const ScoreContext = createContext();

// Wraps part of the app in provider to share score related states and event handlers
export const ScoreProvider = ({ children, randomItem }) => {
  const [score, setScore] = useState("Awaiting Score...");
  const [isDisabled, setIsDisabled] = useState(false);

  const { stageRef } = useCanvasContext();

  // This function is triggered when the user submits their drawing to be scored. It captures the canvas content as a base64-encoded string, paired with the random item's name, and sends this data to the scoring API. While waiting for a response, it disables the submit button to prevent repeat submissions.
  const handleCalculateScore = async () => {
    try {
      setIsDisabled(true);
      const userImageData = stageRef.current.toDataURL();
      const base64String = userImageData.split(",")[1];

      const result = await calculateScore(base64String, randomItem.name);
      console.log("Score:", result);
      setScore(result);
      setIsDisabled(false);
    } catch (error) {
      console.error("Error calculating score in context", error);
    }
  };

  return (
    // Makes score state and handlers available to child components
    <ScoreContext.Provider value={{ score, isDisabled, handleCalculateScore }}>
      {children}
    </ScoreContext.Provider>
  );
};

// Custom hook to access score context
export const useScoreContext = () => useContext(ScoreContext);
