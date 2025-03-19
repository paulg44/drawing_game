import { ImSpinner11 } from "react-icons/im";
import { PiSpeakerLowBold } from "react-icons/pi";

const DisplayBtns = ({ onRespin, onDictionaryName }) => {
  return (
    <div className="displaySideBtns">
      <button className="displayBtn" onClick={onRespin}>
        <ImSpinner11 />
      </button>
      <button className="displayBtn" onClick={onDictionaryName}>
        <PiSpeakerLowBold />
      </button>
    </div>
  );
};

export default DisplayBtns;
