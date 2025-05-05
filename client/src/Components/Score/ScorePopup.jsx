import { useState } from "react";
import "../../assets/css/ScorePopup.css";

const ScorePopup = ({ score, onClose }) => {
  return (
    <div className="popupContainer">
      <div className="popupContent">
        <h2>Score</h2>
        <p>{score}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ScorePopup;
