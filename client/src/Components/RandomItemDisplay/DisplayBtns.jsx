// This component renders the display side buttons. It receives two functions as props, one for choosing another random item from the same category and one for playing the sound of the random item name. As an example if random item was "square" the sound would be a voice saying square

import { ImSpinner11 } from "react-icons/im";
import { PiSpeakerLowBold } from "react-icons/pi";
import "../../assets/css/DisplayBtns.css";
import HomeButton from "../Shared/HomeButton";

const DisplayBtns = ({ onRespin, onSound }) => {
  return (
    <div className="displaySideBtns">
      <button className="displayBtn" onClick={onRespin} data-testid="respinBtn">
        <ImSpinner11 />
      </button>
      <button className="displayBtn" onClick={onSound} data-testid="soundBtn">
        <PiSpeakerLowBold />
      </button>
      <HomeButton />
    </div>
  );
};

export default DisplayBtns;
