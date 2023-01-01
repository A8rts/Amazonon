import axios from "axios";
import { useEffect, useState } from "react";
import "@main/game_options/PublicGames.css";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);

function PublicGames() {
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/game/public").then((res) => {
      const publigGames = [];
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].status !== "close" && res.data[i].start !== true) {
          publigGames.push(res.data[i]);
        }
      }

      setGames(publigGames);
    });
  }, []);

  function aboutGame(item: any) {
    let subjects = item.subjects;
    let new_subjects = [];
    for (let i = 0; i < subjects.length; i++) {
      if (subjects[i] == "history") {
        new_subjects.push("- تاریخ ");
      } else if (subjects[i] == "cinema") {
        new_subjects.push("- سینما  ");
      } else if (subjects[i] == "food") {
        new_subjects.push("-غذا  ");
      } else if (subjects[i] == "sport") {
        new_subjects.push("- ورزش  ");
      } else if (subjects[i] == "religious") {
        new_subjects.push("- مذهبی  ");
      } else if (subjects[i] == "nature") {
        new_subjects.push("- طبیعت  ");
      }
    }

    MySwal.fire({
      title: (
        <strong style={{ fontFamily: "Vazirmatn" }}>
          مشخصات این بازی عمومی
        </strong>
      ),
      html: (
        <p style={{ fontFamily: "Vazirmatn", fontSize: "1rem" }}>
          سازنده : {item.creator} || ظرفیت : {item.capacity} نفر || موضوعات
          سوالات : {new_subjects}
        </p>
      ),
      icon: "info",
      confirmButtonText: "باشه",
    });
  }

  function joinPublicGame(key: string) {
    axios.post("http://localhost:3001/game/info", { key: key }).then((res) => {
      // for check that game is closed or open
      if (res.data.status !== "close" && res.data.start !== true) {
        window.location.href = `/game/${key}`;
      } else {
        MySwal.fire({
          title: (
            <strong style={{ fontFamily: "Vazirmatn" }}>
              این بازی بسته است
            </strong>
          ),
          html: (
            <p
              style={{
                fontFamily: "Vazirmatn",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              این بازی یا تعداد جمعیتش پر است و یا بازی شروع شده است
            </p>
          ),
          icon: "warning",
          confirmButtonText: "باشه",
        });
      }
    });
  }

  return (
    <div className="public-games">
      <div className="main-box mt-3">
        <div className="public-games-icon-box">
          <img
            src="../../../../public/telescope.png"
            className="public-games-icon"
          ></img>
        </div>
        <div className="public-games-box mb-5">
          <p className="public-games-txt">بازی های عمومی</p>
          <div className="join-public-games mb-4">
            {games.map((item) => (
              <div className="p-game mt-3 mb-3" key={item.id}>
                <div className="p-game-icon">
                  <img
                    src="../../../../public/gamepad.png"
                    className="p-game-img"
                  ></img>
                </div>
                <div className="p-game-butons">
                  <button
                    className="go-public-game-btn"
                    onClick={() => joinPublicGame(item.key)}
                  >
                    برو بریم
                  </button>
                  <button
                    className="about-public-game-btn"
                    onClick={() => aboutGame(item)}
                  >
                    درباره بازی
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            className="back-to-home mb-3"
            onClick={() => (window.location.href = "/home")}
          >
            بازگشت به خانه
          </button>
        </div>
      </div>
    </div>
  );
}

export default PublicGames;
