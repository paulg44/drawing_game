import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import GamePage from "./Pages/GamePage";
import { CategoryProvider } from "./context/CategoryContext";
import MongoFetchTest from "./Components/testComponents/mongoFetchTest";
import JustDrawPage from "./Pages/JustDrawPage";

function App() {
  return (
    <CategoryProvider>
      <BrowserRouter className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/just-draw" element={<JustDrawPage />} />
          <Route path="/fetchTest" element={<MongoFetchTest />} />
        </Routes>
      </BrowserRouter>
    </CategoryProvider>
  );
}

export default App;
