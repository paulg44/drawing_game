import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

function HomeButton() {
  return (
    <Link to={"/"} className="bg-sky-500">
      {<IoMdArrowBack />}Home
    </Link>
  );
}

export default HomeButton;
