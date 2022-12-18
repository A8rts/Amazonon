import axios from "axios";
import { useEffect, useState } from "react";
import "./AnswerTime.css";

function AnswerTime(gameKey: { gameKey: string }) {
  const [counter, setCounter] = useState(30);

  useEffect(() => {
    const timer: any =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    return () => clearInterval(timer);
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
        console.log(total_seconds);

        if (total_seconds < 30) {
          setCounter(30 - total_seconds);
        } else {
          setCounter(0);
        }
      });
  }, []);

  return (
    <div>
      <div className="answer-time">
        <img
          src="../../../public/9028942.png"
          className="answer-question-icon mt-4"
        ></img>
        <div className="answer-box mt-4">
          <p className="answer-txt">جواب رو بنویس!</p>
          <div className="q-box mb-4">
            سوال : کوچکترین سوره قرآن چه نام دارد؟
          </div>
          <div className="guidance-box mb-4">
            <p className="guidance-txt">راهنمایی ها</p>
            <ul className="guidances">
              <li>اسم بعضی از میدان های ایران هم هست</li>
              <li className="mt-2">اسم سوره اسم یک بیمه هم است</li>
            </ul>
          </div>
          <input
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
