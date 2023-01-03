import axios from "axios";
import { useEffect, useState } from "react";
import AnswerTime from "@game/AnswerTime";
import Beads from "@game/Beads";
import Betting from "@game/Betting";
import Result from "@game/Result";
import "@game/styles/Start.css";
import Winners from "./Winners";

function Start({
  beads,
  showingQuesiton,
  gameKey,
  userData,
  socket,
  gameData,
  allUsers,
  startGame,
  changeGameSubjects,
}: {
  beads: boolean;
  showingQuesiton: boolean;
  gameKey: string;
  userData: any;
  socket: any;
  gameData: any;
  allUsers: any;
  startGame: any;
  changeGameSubjects: any;
}) {
  const [betting, setBetting] = useState(false);
  const [answerTime, setAnswerTime] = useState(false);
  const [resultTime, setResultTime] = useState(false);
  const [questionDetail, setQuestionDetail] = useState([]); // detail of question
  const [userCoin, setUserCoin] = useState(0);
  const [answers, setAnswers] = useState<any>([]);
  const [winner, setWinner] = useState(false);

  useEffect(() => {
    // for get question details in this game time
    getQuestionDetail();

    // for get player coin
    getCoin();
  }, []);

  function getCoin() {
    axios
      .post("http://localhost:3001/points/getCoint", {
        gameKey: gameKey,
        username: userData.username,
      })
      .then((res) => {
        setUserCoin(res.data.coins);
      });
  }

  function weHaveWinner() {
    // when game is ended
    axios
      .post("http://localhost:3001/game/gameEnded", { gameKey: gameKey })
      .then(() => setWinner(true));
  }

  function getQuestionDetail() {
    axios
      .post("http://localhost:3001/questions/getQuestion", {
        gameKey: gameKey,
      })
      .then((res) => {
        setQuestionDetail(res.data);
      });
  }

  function changeBetting() {
    // when betting is true we chnage true in state(used in beads component)
    setBetting(true);
  }

  function itIsAnswerTime() {
    // we go to answer to question
    setBetting(false);
    setAnswerTime(true);
    setAnswers([]);

    if (userData.username == gameData.creator) {
      // create new answer time in database
      axios.post("http://localhost:3001/answer-times/create", {
        gameKey: gameKey,
      });
    }
  }

  function itIsShowResultTime() {
    // players go to see result game

    axios // to get all answers
      .post("http://localhost:3001/answers/getAnswers", {
        gameKey: gameKey,
      })
      .then((res) => {
        const uniques_answers = [
          ...new Map(res.data.map((a: any) => [a.username, a])).values(),
        ];
        setAnswers(uniques_answers);

        setAnswerTime(false);
        setResultTime(true);
        setBetting(false);
      });
  }

  function setTheUserCoin(coin: number) {
    // to set real time coin on state
    setUserCoin(coin);
  }

  function playAgain() {
    startGame();
  }

  useEffect(() => {
    // check status of game to know show wich component
    axios
      .post("http://localhost:3001/game/info", { key: gameKey })
      .then((res) => {
        const info = res.data;
        if (info.ended) {
          // for when game is ended
          setWinner(true);
          setBetting(false);
          setAnswerTime(false);
          setResultTime(false);
        } else if (info.result_time) {
          // for when result is ready to show
          setBetting(false);
          setAnswerTime(false);
          setResultTime(true);
        } else if (info.answer_time) {
          // for when it is time for answer to question
          setBetting(false);
          setAnswerTime(true);
          setResultTime(false);
        } else if (info.betting) {
          // for when it is time to bet on answers
          setBetting(true);
          setAnswerTime(false);
          setResultTime(false);
        } else if (info.result_time == false) {
          setResultTime(false);
        }
      });
  });

  return (
    <main>
      {betting ? (
        <header className="count-coin">
          <div className="coin-coin">
            <p className="coin-txt mt-4">{userCoin} : </p>
            <img src="../../../public/coin.png" className="coin-icon"></img>
          </div>
        </header>
      ) : (
        <></>
      )}
      {allUsers.length > 0 ? (
        showingQuesiton ? (
          <></>
        ) : winner ? (
          <Winners gameKey={gameKey} userData={userData} />
        ) : resultTime ? (
          <Result
            gameKey={gameKey}
            questionDetail={questionDetail}
            userData={userData}
            gameData={gameData}
            socket={socket}
            playAgain={playAgain}
            answers={answers}
            weHaveWinner={weHaveWinner}
            changeGameSubjects={changeGameSubjects}
          />
        ) : answerTime ? (
          <AnswerTime
            gameKey={gameKey}
            socket={socket}
            userData={userData}
            questionDetail={questionDetail}
            gameData={gameData}
            itIsShowResultTime={itIsShowResultTime}
            getQuestionDetail={getQuestionDetail}
          />
        ) : betting ? (
          <Betting
            users={allUsers}
            gameKey={gameKey}
            userData={userData}
            gameData={gameData}
            socket={socket}
            userCoin={userCoin}
            itIsAnswerTime={itIsAnswerTime}
            setTheUserCoin={setTheUserCoin}
            getCoin={getCoin}
          />
        ) : beads ? (
          <Beads
            gameKey={gameKey}
            userData={userData}
            socket={socket}
            gameData={gameData}
            changeBetting={changeBetting}
          />
        ) : (
          <div
            className="reloaded_status"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Lalezar Regular",
              fontSize: "2rem",
              textAlign: "center",
            }}
          >
            <p>
              نباید صفحه رو رفرش میکردین! چند ثانیه صبر کنید و صفحه رو مجدد رفرش
              کنید! اگر زمان نمایش سوال تمام شده باشد به بازی برخواهید گشت
            </p>
          </div>
        )
      ) : (
        <></>
      )}
    </main>
  );
}

export default Start;
