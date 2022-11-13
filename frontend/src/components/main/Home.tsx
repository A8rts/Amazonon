import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../layouts/Header";
import Create from "./game_options/Create";
import "./Home.css";

function Home() {
  const [create, setCreate] = useState(false);
  const [games, setGames] = useState(false); // for show public games
  const [join, setJoin] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/authorization", { withCredentials: true })
      .then(() => {})
      .catch(() => {
        window.location.href = "/";
      });
  });

  function clickedButton(e: any) {
    const e_name = e.target.name;

    if (e_name == "create") {
      setCreate(true);
      setGames(false);
      setJoin(false);
    } else if (e_name == "games") {
      setCreate(false);
      setGames(true);
      setJoin(false);
    } else if (e_name == "join") {
      setCreate(false);
      setGames(false);
      setJoin(true);
    }
  }

  return (
    <main className="home">
      <Header authenticated={true} />
      {create ? (
        <Create />
      ) : games ? (
        <>game</>
      ) : join ? (
        <>join</>
      ) : (
        <div className="main-box mb-5">
          <div className="parent-home-content">
            <div className="home-icon">
              <img
                src="../../../public/video-game.png"
                className="home-game-icon"
              ></img>
            </div>
            <div className="room-controller-box">
              <div className="room-box">
                <p className="room-box-txt">بریم بازی کنیم</p>
                <button
                  className="find-game-button mb-3"
                  name="create"
                  onClick={(e) => clickedButton(e)}
                >
                  ساخت بازی جدید
                </button>
                <button
                  className="find-game-button mb-3"
                  name="games"
                  onClick={(e) => clickedButton(e)}
                >
                  بازی های عمومی
                </button>
                <button
                  className="find-game-button mb-4"
                  name="join"
                  onClick={(e) => clickedButton(e)}
                >
                  الحاق شدن به بازی
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
