import axios from "axios";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import Users from "./Users";
import "./GamePage.css";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);

function GamePage({
  userData,
  gameKey,
  gameData,
}: {
  userData: any;
  gameKey: any;
  gameData: any;
}) {
  const [socket, setSocket] = useState<Socket>();
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [show, setShow] = useState(true);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    // make conneciton to Websocket server
    const newSocket = io("http://localhost:8001", {
      query: {
        username: userData.username,
        gender: userData.gender,
        gameKey: gameKey,
        capacity: gameData.capacity,
      },
    });
    setSocket(newSocket);
  }, [setSocket]);

  const usersListener = (users: any) => {
    const usersData: any[] = [];
    users.map((user: any) =>
      usersData.push({ username: user.username, gender: user.gender })
    );

    const usernames = usersData.map((user) => user.username);
    const uniqeUsers = usersData.filter(
      ({ username }, index) => !usernames.includes(username, index + 1)
    );

    if (uniqeUsers.length >= gameData.capacity) {
      if (userData.username == gameData.creator) {
        axios.post("http://localhost:3001/game/change_status", {
          // when the number of users in equal to capacity, we closed the game
          key: gameKey,
          type: "close",
        });
      }
    } else {
      axios
        .post("http://localhost:3001/game/info", { key: gameKey })
        .then((res) => {
          if (res.data.status == "close") {
            axios.post("http://localhost:3001/game/change_status", {
              key: gameKey,
              type: "open",
            });
          }
        });
    }

    setAllUsers(uniqeUsers);
  };

  useEffect(() => {
    // make listener for when user joined the game or lifted
    socket?.on(`${gameKey}`, usersListener);
    return () => {
      socket?.off(`${gameKey}`, usersListener);
    };
  }, [usersListener]);

  const startListener = () => {
    setShow(false); // when the question is showed we want to clear the page

    axios
      .post("http://localhost:3001/questions/findQuestion", {
        gameSubjects: gameData.subjects,
      })
      .then((res) => {
        const randLength = Math.floor(Math.random() * res.data.length);
        const question = res.data[randLength][0];

        showQuestion(question); // for showing question to players
      });
  };

  function showQuestion(question: any) {
    const eng_subjects = [
      { english: "cinema", farsi: "سینما" },
      { english: "food", farsi: "غذا" },
      { english: "sport", farsi: "ورزش" },
      { english: "nature", farsi: "طبیعت" },
      { english: "history", farsi: "تاریخ" },
      { english: "religious", farsi: "مذهبی" },
    ];
    for (let i = 0; i < eng_subjects.length; i++) {
      if (question.subject == eng_subjects[i].english) {
        question.subject = eng_subjects[i].farsi;
      }
    }

    MySwal.fire({
      title: (
        <strong style={{ fontFamily: "Vazirmatn" }}>
          بازی شروع شد! سوالو بخون
        </strong>
      ),
      html: <p style={{ fontFamily: "Vazirmatn" }}>{question.question}</p>,
      showConfirmButton: false,
      timer: 30000,
      timerProgressBar: true,
      allowOutsideClick: false,
      background: "#8e44ad",
      color: "white",
      imageUrl: "../../../public/question.png",
      imageHeight: "18rem",
      footer: (
        <strong style={{ fontFamily: "Vazirmatn" }}>
          موضوع : {question.subject}
        </strong>
      ),
      showClass: {
        popup: "animate__animated animate__swing",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  }

  useEffect(() => {
    // to listen for the game start event (when the game creator started the game)
    socket?.on(`start${gameData.key}`, startListener);
    return () => {
      socket?.off(`start${gameData.key}`, startListener);
    };
  }, [startListener]);

  function startGame() {
    // send start game message to the websocket server
    if (userData.username !== gameData.creator) {
      MySwal.fire({
        title: (
          <strong style={{ fontFamily: "Vazirmatn" }}>شما سازنده نیستی!</strong>
        ),
        html: (
          <p style={{ fontFamily: "Vazirmatn" }}>
            شما سازنده ی این بازی نیستید! سازنده {gameData.creator} است و فقط او
            میتواند بازی را شروع کند
          </p>
        ),
        confirmButtonText: "باشه",
        icon: "error",
      });
    } else if (allUsers.length < gameData.capacity) {
      MySwal.fire({
        title: (
          <strong style={{ fontFamily: "Vazirmatn" }}>ظرفیت کامل نیست!</strong>
        ),
        html: (
          <p style={{ fontFamily: "Vazirmatn" }}>
            شما مشخص کرده بودید که ظرفیت بازی {gameData.capacity} نفر باشد
          </p>
        ),
        confirmButtonText: "فهمیدم",
        icon: "warning",
      });
    } else {
      socket?.emit("startGame");
    }
  }

  return (
    <main>
      {show ? (
        <div>
          <button className="game-page-header" onClick={() => startGame()}>
            <p className="start-game-txt">شروع بازی</p>
          </button>

          <Users users={allUsers} gameData={gameData} />
        </div>
      ) : (
        <></>
      )}
    </main>
  );
}

export default GamePage;
