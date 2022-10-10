import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import "./assets/fonts/Lalezar-Regular.woff";

function Game() {
  return (
    <BrowserRouter>
      <div className="all-routes">
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Game;
