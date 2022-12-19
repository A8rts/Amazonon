import axios from "axios";
import { useEffect, useState } from "react";
import "./AnswerTime.css";

function AnswerTime({
  gameKey,
  socket,
  userData,
  questionDetail,
  gameData,
  itIsShowResultTime,
}: {
  gameKey: string;
  socket: any;
  userData: any;
  questionDetail: any;
  gameData: any;
  itIsShowResultTime: any;
}) {
  const [counter, setCounter] = useState(30);
  const [answer, setAnswer] = useState("");
  const [choosedBead, setChoosedBead] = useState(0);

  useEffect(() => {
    const timer: any =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    return () => {
      clearInterval(timer);

      if (counter - 1 == 0) {
        socket.emit("answetTimeFinished");
      }
    };
  }, [counter]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/answer-times/getTime", {
        gameKey: gameKey,
      })
      .then((res) => {
        // get the diff of dates and set counter of that
        const answerTimeDate = new Date(String(res.data[0].date));
        const nowDate = new Date();

        const diffDate = nowDate.getTime() - answerTimeDate.getTime();

        const total_seconds = parseInt(String(Math.floor(diffDate / 1000))); // the seconds passed

        if (total_seconds < 30) {
          setCounter(30 - total_seconds);
        } else {
          setCounter(0);
          socket.emit("answetTimeFinished"); // when answer time is ended, send event
        }
      });
  }, []);

  useEffect(() => {
    // to get choosed bead from player
    axios
      .post("http://localhost:3001/beads/getBead", {
        gameKey: gameKey,
        username: userData.username,
      })
      .then((res) => {
        setChoosedBead(res.data.bead);
      });
  });

  const sendAnswersListener = () => {
    axios
      .post("http://localhost:3001/answers/checkSaved", {
        gameKey: gameKey,
        username: userData.username,
      })
      .then((res) => {
        if (res.data.length == 0) {
          axios
            .post("http://localhost:3001/answers/create", {
              gameKey: gameKey,
              answer: answer,
              username: userData.username,
            })
            .then((res) => console.log(res.data));
        }
      });

    if (gameData.creator == userData.username) {
      // set result_time to true in databsae
      axios.post("http://localhost:3001/game/itIsResultTime", {
        gameKey: gameKey,
      });
    }

    itIsShowResultTime();
  };

  useEffect(() => {
    socket.on(`sendAnswers${gameKey}`, sendAnswersListener);
    return () => {
      socket.off(`sendAnswers${gameKey}`, sendAnswersListener);
    };
  }, [sendAnswersListener]);

  return (
    <div>
      <div className="answer-time">
        <img
          src="../../../public/9028942.png"
          className="answer-question-icon mt-4"
        ></img>
        <div className="answer-box mt-4">
          <p className="answer-txt">جواب رو بنویس!</p>
          <div className="q-box mb-4">{questionDetail.question}</div>
          <div className="guidance-box mb-4">
            <p className="guidance-txt">راهنمایی ها</p>
            <ul className="guidances">
              {choosedBead == 1 ? (
                <div>
                  <li>{questionDetail.guide1}</li>
                  <li className="mt-2">{questionDetail.guide2}</li>
                </div>
              ) : choosedBead == 2 ? (
                <li>{questionDetail.guide1}</li>
              ) : (
                <li style={{ color: "#2c3e50" }}>شما بدون راهنمایی هستید!</li>
              )}
            </ul>
          </div>
          <input
            onChange={(e) => setAnswer(e.target.value)}
            className="answer-input mb-4"
            type="text"
            placeholder="جوابو بنویس :"
          ></input>
          <p className="answer-timer mb-3">{counter}</p>
        </div>
      </div>
    </div>
  );
}

export default AnswerTime;
