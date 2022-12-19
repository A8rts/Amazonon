import axios from "axios";
import { useEffect, useState } from "react";
import AnswerTime from "./AnswerTime";
import Beads from "./Beads";
import Betting from "./Betting";

function Start({
  beads,
  showingQuesiton,
  gameKey,
  userData,
  socket,
  gameData,
  allUsers,
}: {
  beads: boolean;
  showingQuesiton: boolean;
  gameKey: string;
  userData: any;
  socket: any;
  gameData: any;
  allUsers: any;
}) {
  const [betting, setBetting] = useState(false);
  const [answerTime, setAnswerTime] = useState(false);
  const [resultTime, setResultTime] = useState(false);
  const [questionDetail, setQuestionDetail] = useState([]);

  useEffect(() => {
    // for get question details in this game time
    axios
      .post("http://localhost:3001/questions/getQuestion", {
        gameKey: gameKey,
      })
      .then((res) => {
        setQuestionDetail(res.data);
      });
  }, []);

  function changeBetting() {
    // when betting is true we chnage true in state(used in beads component)
    setBetting(true);
  }

  function itIsAnswerTime() {
    setBetting(false);
    setAnswerTime(true);

    if (userData.username == gameData.creator) {
      // create new answer time in database
      axios.post("http://localhost:3001/answer-times/create", {
        gameKey: gameKey,
      });
    }
  }

  function itIsShowResultTime() {
    setAnswerTime(false);
    setResultTime(true);
  }

  useEffect(() => {
    // check status of game to know show wich component
    if (gameData.result_time) {
      setBetting(false);
      setAnswerTime(false);
      setResultTime(true);
    } else if (gameData.answer_time) {
      setBetting(false);
      setAnswerTime(true);
    } else if (gameData.betting) {
      setBetting(true);
    }
  });

  return (
    <main>
      {allUsers.length > 0 ? (
        showingQuesiton ? (
          <></>
        ) : resultTime ? (
          <>it is result</>
        ) : answerTime ? (
          <AnswerTime
            gameKey={gameKey}
            socket={socket}
            userData={userData}
            questionDetail={questionDetail}
            gameData={gameData}
            itIsShowResultTime={itIsShowResultTime}
          />
        ) : betting ? (
          <Betting
            users={allUsers}
            gameKey={gameKey}
            userData={userData}
            gameData={gameData}
            socket={socket}
            itIsAnswerTime={itIsAnswerTime}
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
