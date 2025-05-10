import { useState } from "react";
import { CiStar } from "react-icons/ci";
import "../../assets/css/ScorePopup.css";
import { useGameLogic } from "../../hooks/useGameLogic";
import { Link } from "react-router-dom";

/* Make score interactive. Stars? have a sad face if you need to retry 
- if score excellent 3 stars light up etc
- conditional rendering?
- make 3 classes
- set the class dependant on score
*/
// Add a play again button, re use respin?
const ScorePopup = ({ score, onClose }) => {
  const { handleRespin } = useGameLogic();

  const starScoreClass = score;

  const handlePlayAgain = async () => {
    handleRespin();
    onClose();
  };

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
        <button className="playAgainBtn" onClick={handlePlayAgain}>
          Play Again?
        </button>
        <Link to={"/"} className="homeBtn">
          Go Home?
        </Link>
      </div>
    </div>
  );
};

export default ScorePopup;
