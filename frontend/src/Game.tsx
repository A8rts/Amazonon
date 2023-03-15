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
import { useEffect, useState } from "react";
import axios from "axios";
import io, { Socket } from "socket.io-client";

function Game() {
  const [chartCorrectAnswersData, setChartCorrectAnswersData] = useState([]);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    axios
      .get("http://localhost:3001/authorization", { withCredentials: true })
      .then((res) => {
        // make websocket connection to show users are online or offline
        const usersSocket = io("http://localhost:8002", {
          query: {
            username: res.data.username,
          },
        });
        setSocket(usersSocket);
      });
  }, [setSocket]);

  function getCorrectAnswersData() {
    if (window.location.pathname == "/profile") {
      // get the correct questions answer from the database for user
      axios
        .get("http://localhost:3001/authorization", { withCredentials: true })
        .then((res) => {
          const name = res.data.username;

          axios
            .post("http://localhost:3001/users/getNumberOfWins", {
              username: name,
            })
            .then((res) => {
              setChartCorrectAnswersData(
                res.data.correct_answers_for_categories
              );
            });
        });
    }
  }

  return (
    <BrowserRouter>
      <div className="all-routes">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/profile"
            element={
              <Profile
                chartCorrectAnswersData={chartCorrectAnswersData}
                getCorrectAnswersData={getCorrectAnswersData}
              />
            }
          />
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
