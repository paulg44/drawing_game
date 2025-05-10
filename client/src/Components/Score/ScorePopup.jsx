import { useState } from "react";
import { CiStar } from "react-icons/ci";
import "../../assets/css/ScorePopup.css";

/* Make score interactive. Stars? have a sad face if you need to retry 
- if score excellent 3 stars light up etc
- conditional rendering?
- make 3 classes
- set the class dependant on score
*/
// Add a play again button, re use respin?
const ScorePopup = ({ score, onClose }) => {
  const starScoreClass = score;
  console.log(starScoreClass);

  return (
    <div className="popupContainer">
      <div className="popupContent">
        <h2>Your Score</h2>
        <p>{score}</p>
        <div className={`starsContainer ${starScoreClass}`}>
          <CiStar className="star starOne" />
          <CiStar className="star starTwo" />
          <CiStar className="star starThree" />
        </div>
        <button className="scoreCloseBtn" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default ScorePopup;
