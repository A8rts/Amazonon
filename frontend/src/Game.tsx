import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import "./assets/fonts/Lalezar-Regular.woff";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";

function Game() {
  return (
    <BrowserRouter>
      <div className="all-routes">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Game;
