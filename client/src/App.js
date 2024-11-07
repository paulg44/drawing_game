import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import GamePage from "./Pages/GamePage";
import Scores from "./Pages/Scores";

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/score" element={<Scores />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
