import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import GamePage from "./Pages/GamePage";
import { CategoryProvider } from "./providers/CategoryContext";
import MongoFetchTest from "./Components/testComponents/MongoFetchTest";
import { AppProvider } from "./providers/AppProvider";

function App() {
  return (
    <AppProvider>
      <CategoryProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/fetchTest" element={<MongoFetchTest />} />
          </Routes>
        </BrowserRouter>
      </CategoryProvider>
    </AppProvider>
  );
}

export default App;
