import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Header from "../layouts/Header";
import Create from "./game_options/Create";
import PublicGames from "./game_options/PublicGames";
import "./Home.css";

function Home() {
  const [create, setCreate] = useState(false);
  const [games, setGames] = useState(false); // for show public games
  const [join, setJoin] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/authorization", { withCredentials: true })
      .then((res) => {
        setName(res.data.username);
      })
      .catch(() => {
        window.location.href = "/";
      });
  });

  function clickedButton(e: any) {
    const e_name = e.target.name;

    if (e_name == "create") {
      setCreate(true);
    } else if (e_name == "games") {
      setGames(true);
    } else if (e_name == "join") {
      setJoin(true);
    }
  }

  return (
    <main className="home">
      <Header authenticated={true} />
      {create ? (
        <Create name={name} />
      ) : games ? (
        <PublicGames />
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
                <button className="find-game-button mb-4" name="join">
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
