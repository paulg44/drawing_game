import "../../assets/css/CanvasToolbar.css";
import { HexColorPicker } from "react-colorful";
import { Popup } from "reactjs-popup";
import { IoColorPaletteOutline, IoTrashBin } from "react-icons/io5";
// import { TiTickOutline } from "react-icons/ti";

const CanvasToolbar = ({
  tool,
  setTool,
  color,
  setColor,
  onClear,
  onGetScore,
}) => {
  return (
    <div className="canvasTools">
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>

      <Popup
        className="popupContent"
        trigger={
          <button className="popUpBtn">
            <IoColorPaletteOutline />
          </button>
        }
      >
        <div
          className="colorPickerContainer"
          style={{ position: "absolute", bottom: "0", right: "0" }}
        >
          {" "}
          <HexColorPicker color={color} onChange={setColor} />
        </div>
      </Popup>

      {/* <button onClick={handleSaveImage}>Save Image</button> */}
      <div className="submitClearBtns">
        <button
          type="button"
          onClick={onClear}
          className="clearAllBtn"
          data-testid="clearAllBtn"
        >
          <IoTrashBin />
        </button>
        <button
          onClick={onGetScore}
          className="submitUserDrawingBtn"
          data-testid="submitImageBtn"
        >
          &#10003;
        </button>
      </div>
    </div>
  );
};

export default CanvasToolbar;
