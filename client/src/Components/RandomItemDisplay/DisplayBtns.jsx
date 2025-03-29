import { ImSpinner11 } from "react-icons/im";
import { PiSpeakerLowBold } from "react-icons/pi";
import "../../assets/css/DisplayBtns.css";

const DisplayBtns = ({ onRespin, onSound }) => {
  return (
    <div className="displaySideBtns">
      <button className="displayBtn" onClick={onRespin} data-testid="respinBtn">
        <ImSpinner11 />
      </button>
      <button className="displayBtn" onClick={onSound} data-testid="soundBtn">
        <PiSpeakerLowBold />
      </button>
    </div>
  );
};

export default DisplayBtns;
