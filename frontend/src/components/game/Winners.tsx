import "@game/styles/Winners.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

function Winners({ gameKey, userData }: { gameKey: string; userData: any }) {
  const [winners, setWinners] = useState([]);
  const [amIWinner, setAmIWinner] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [coins, setCoins] = useState<
    Array<{ username: string; coins: number }>
  >([]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/winners/getAll", { gameKey: gameKey })
      .then((res) => {
        setWinners(res.data.winners);

        //check player is winner of no
        for (let i = 0; i < res.data.winners.length; i++) {
          if (res.data.winners[i] == userData.username) {
            setAmIWinner(true);
          }
        }
        setLoaded(true);
      });

    axios
      .post("http://localhost:3001/points/getAllCoinsFromGame", {
        gameKey: gameKey,
      })
      .then((res) => {
        setCoins(res.data);
      });
  }, []);

  function showPoints() {
    MySwal.fire({
      title: <strong style={{ fontFamily: "Vazirmatn" }}>امتیازاتون :)</strong>,
      html: (
        <div style={{ fontFamily: "Vazirmatn" }}>
          {coins.map((coin) => (
            <p key={coin.username}>
              {coin.username} دارای {coin.coins} تا سکه است
            </p>
          ))}
        </div>
      ),
      confirmButtonText: "به به!",
      showClass: {
        popup: "animate__animated animate__backInDown",
      },
      hideClass: {
        popup: "animate__animated animate__backOutDown",
      },
      background: "#239954",
      color: "white",
      imageUrl: "../../../public/7433051.png",
      imageHeight: "18rem",
      confirmButtonColor: "#8e44ad",
    });
  }

  return (
    <main>
      {loaded ? (
        <div>
          {amIWinner ? (
            <header className="winner-header">شما برنده هستید :)</header>
          ) : (
            <header className="loser-header">شما بازنده هستید :(</header>
          )}

          <div className="winners-main-box mt-5 mb-5">
            <div
              className="show-players-coins-header"
              onClick={() => showPoints()}
            >
              میخوام امتیاز ها رو ببینم
            </div>
            <p className="winners-txt mt-3">
              خب خب! چه زود تموم شد. اسم هر کسی این پایین باشه یعنی برندست!
            </p>
            <img
              src="../../../public/winwin.png"
              className="winwin-png mt-2 animate__animated animate__jello"
            ></img>
            <div className="winners-names">
              {winners.map((winner) => (
                <div className="winner-name" key={winner}>
                  {winner}
                </div>
              ))}
            </div>
            <p className="end-txt mb-3">
              و بقیه شما بازنده هستید! خوش باشید :)))
            </p>
            <div className="winner-icons">
              <img src="../../../public/win2.png" className="win1-icon"></img>
              <img src="../../../public/win.png" className="win2-icon"></img>
              <img
                src="../../../public/4819817.png"
                className="win3-icon"
              ></img>
            </div>
            <button
              className="back-home"
              onClick={() => (window.location.href = "/home")}
            >
              بریم خونه
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </main>
  );
}

export default Winners;
