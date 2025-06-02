import Canvas from "../Components/Canvas/Canvas";
import HomeButton from "../Components/Shared/HomeButton";
import "../assets/css/JustDraw.css";

function JustDrawPage() {
  return (
    <div className="justDrawContainer ">
      <Canvas isFullWidth />
      <div className="homeBtnJustDraw">
        <HomeButton />
      </div>
    </div>
  );
}

export default JustDrawPage;
