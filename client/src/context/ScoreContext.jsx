import { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { calculateScore } from "../services/canvasApi";
import { useCanvasContext } from "./CanvasContext";

const ScoreContext = createContext();

export const ScoreProvider = ({ children, randomItem }) => {
  const [score, setScore] = useState("Awaiting Score...");
  const [isDisabled, setIsDisabled] = useState(false);

  // const navigate = useNavigate();
  const { stageRef } = useCanvasContext();

  const handleCalculateScore = async () => {
    setIsDisabled(true);
    const userImageData = stageRef.current.toDataURL();
    const base64String = userImageData.split(",")[1];

    const result = await calculateScore(base64String, randomItem.name);
    console.log("Score:", result);
    setScore(result);
    setIsDisabled(false);
    // navigate("/scoreDisplay");
  };

  return (
    <ScoreContext.Provider value={{ score, isDisabled, handleCalculateScore }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScoreContext = () => useContext(ScoreContext);
