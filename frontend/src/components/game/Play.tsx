import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GamePage from "@game/GamePage";
const MySwal = withReactContent(Swal);

function Play() {
  const { key } = useParams(); // this is game key
  const [userData, setUserData] = useState([]);
  const [gameData, setGameData] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true); // for when all request in done, we show GamePage

  useEffect(() => {
    // for get all user infromation
    axios
      .get("http://localhost:3001/authorization", { withCredentials: true })
      .then((res) => {
        setUserData(res.data);
      })
      .catch(() => {
        window.location.href = "/";
      });

    // for check game key (is valid or not)
    axios
      .post("http://localhost:3001/game/valid_key", { key: key })
      .then((res) => {
        if (res.data.length > 0 && res.data.length < 2) {
          setShow(true);
        } else {
          MySwal.fire({
            title: (
              <strong style={{ fontFamily: "Vazirmatn" }}>اینجا کجاست ؟</strong>
            ),
            html: (
              <p style={{ fontFamily: "Vazirmatn" }}>
                همچین بازی ای با این کلید ({key}) وجود ندارد
              </p>
            ),
            confirmButtonText: "بریم صفحه اصلی",
            icon: "error",
          }).then(() => (window.location.href = "/home"));
        }
      });

    // for get game information
    axios.post("http://localhost:3001/game/info", { key: key }).then((res) => {
      setGameData(res.data);
      setLoading(false);
    });
  }, []);

  function updateGameData() {
    axios.post("http://localhost:3001/game/info", { key: key }).then((res) => {
      let gameInfo = res.data;
      gameInfo.start = false;
      setGameData(gameInfo);
    });
  }

  return (
    <main>
      {show ? (
        loading ? (
          <>loading</>
        ) : (
          <GamePage
            userData={userData}
            gameKey={key}
            gameData={gameData}
            updateGameData={updateGameData}
          />
        )
      ) : (
        <></>
      )}
    </main>
  );
}

export default Play;
