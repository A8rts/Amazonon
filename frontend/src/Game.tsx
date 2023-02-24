import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@auth/Login";
import "@/assets/fonts/Lalezar-Regular.woff";
import Home from "@main/Home";
import NotFound from "@comp/NotFound";
import Profile from "@main/Profile";
import Play from "@game/Play";
import About from "@main/About";
import Admin from "@main/Admin";
import BestPlayers from "@main/BestPlayers";

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
          <Route path="/admin" element={<Admin />} />
          <Route path="/bestPlayers" element={<BestPlayers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Game;
