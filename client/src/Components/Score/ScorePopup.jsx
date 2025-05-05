import { useState } from "react";
import "../../assets/css/ScorePopup.css";

// Make score interactive. Stars? have a sad face if you need to retry
// Add a play again button, re use respin?
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
