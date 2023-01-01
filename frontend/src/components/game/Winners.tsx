import "@game/styles/Winners.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Winners({ gameKey, userData }: { gameKey: string; userData: any }) {
  const [winners, setWinners] = useState([]);
  const [amIWinner, setAmIWinner] = useState(false);
  const [loaded, setLoaded] = useState(false);

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
  }, []);

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
            <p className="winners-txt mt-3">
              تبریک میگم شما ها به 10 سکه یا بیشتر دست یافتید!!!
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
          </div>
        </div>
      ) : (
        <></>
      )}
    </main>
  );
}

export default Winners;
