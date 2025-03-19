import { HexColorPicker } from "react-colorful";
import { Popup } from "reactjs-popup";
import { IoColorPaletteOutline } from "react-icons/io5";

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
      <button type="button" onClick={onClear}>
        Clear Page
      </button>
      <Popup
        className="popup=content"
        trigger={
          <button>
            <IoColorPaletteOutline />
          </button>
        }
      >
        <div className="colorPickerContainer">
          {" "}
          <HexColorPicker color={color} onChange={setColor} />
        </div>
      </Popup>

      {/* <button onClick={handleSaveImage}>Save Image</button> */}
      <button onClick={onGetScore}>Get Score</button>
    </div>
  );
};

export default CanvasToolbar;
