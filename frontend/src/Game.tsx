import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import "./assets/fonts/Lalezar-Regular.woff";
import Home from "./components/main/Home";
import NotFound from "./components/NotFound";
import Profile from "./components/main/Profile";
import Play from "./components/game/Play";
import About from "./components/main/About";

function Game() {
  return (
    <BrowserRouter>
      <div className="all-routes">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/game/:key" element={<Play />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Game;
