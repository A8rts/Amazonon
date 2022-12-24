import axios from "axios";
import { useEffect, useState } from "react";
import "@game/styles/Result.css";

function Result({
  gameKey,
  questionDetail,
  userCoin,
  gameData,
  userData,
  socket,
  playAgain,
}: {
  gameKey: string;
  questionDetail: any;
  userCoin: any;
  gameData: any;
  userData: any;
  socket: any;
  playAgain: any;
}) {
  const [result, setResult] = useState([]);
  const [counter, setCounter] = useState(30);

  useEffect(() => {
    const timer: any =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    return () => {
      clearInterval(timer);
      if (counter - 1 == 0) {
        sendPlayAgainEvent();
      }
    };
  }, [counter]);

  let countOfPlayAgainTimeCreated = 0;

  useEffect(() => {
    axios
      .post(
        "http://localhost:3001/play-again-times/checkPlayAgainTimeCreated",
        {
          gameKey: gameKey,
        }
      )
      .then((res) => {
        if (
          gameData.creator == userData.username &&
          res.data == "not_created" &&
          countOfPlayAgainTimeCreated == 0
        ) {
          axios
            .post("http://localhost:3001/play-again-times/create", {
              gameKey: gameKey,
            })
            .then((res) => console.log(res.data));
          countOfPlayAgainTimeCreated++;
        } else if (res.data !== "not_created") {
          // to change the date for start the game again
          const playAgainTimeDate = new Date(String(res.data[0].date));
          const nowDate = new Date();

          const diffDate = nowDate.getTime() - playAgainTimeDate.getTime();

          const total_seconds = parseInt(String(Math.floor(diffDate / 1000)));

          if (total_seconds > 30) {
            sendPlayAgainEvent();
          } else {
            setCounter(30 - total_seconds);
          }
        }
      });

    // to save betting list and answers
    let bettingList: any = [];
    let answersList: any = [];

    axios
      .post("http://localhost:3001/betting/getBettingList", {
        gameKey: gameKey,
      })
      .then((res) => {
        bettingList.push(res.data);
        axios
          .post("http://localhost:3001/answers/getAnswers", {
            gameKey: gameKey,
          })
          .then((res) => {
            answersList.push(res.data);
            answers_checker(bettingList[0], res.data);
          });
      });
  }, []);

  function sendPlayAgainEvent() {
    if (gameData.creator == userData.username) {
      axios
        .post("http://localhost:3001/game/setPlayAgain", {
          gameKey: gameKey,
        })
        .then(() => {
          socket.emit("playAgain");
        });
    }
  }

  function answers_checker(bettingList: any, answersList: any) {
    // check players answers is right or no and save that
    const status_of_answers = [];
    const true_answer = questionDetail.answer;

    for (let i = 0; i < answersList.length; i++) {
      if (answersList[i].answer == true_answer) {
        status_of_answers.push({
          username: answersList[i].username,
          status: "right",
        });
      } else {
        status_of_answers.push({
          username: answersList[i].username,
          status: "wrong",
        });
      }
    }

    bettings_checker(bettingList, status_of_answers);
  }

  function bettings_checker(bettingList: any, status_of_answers: any) {
    // to know to add coin to player or remove coin from player(with betting list and status of answers)
    const betting_result: any = [];

    for (let j = 0; j < bettingList.length; j++) {
      const to_player_answer_status = status_of_answers.filter(
        (answer: any) => answer.username == bettingList[j].to_player
      );

      if (bettingList[j].bet_coin > 0) {
        if (to_player_answer_status[0].status == "right") {
          betting_result.push({
            username: bettingList[j].username,
            coin: Math.abs(bettingList[j].bet_coin),
            type: "add",
          });
        } else {
          betting_result.push({
            username: bettingList[j].username,
            coin: Math.abs(bettingList[j].bet_coin),
            type: "remove",
          });
        }
      } else {
        if (to_player_answer_status[0].status == "wrong") {
          betting_result.push({
            username: bettingList[j].username,
            coin: Math.abs(bettingList[j].bet_coin),
            type: "add",
          });
        } else {
          betting_result.push({
            username: bettingList[j].username,
            coin: Math.abs(bettingList[j].bet_coin),
            type: "remove",
          });
        }
      }
    }
    apply_results(betting_result, bettingList, status_of_answers);
  }

  function apply_results(
    betting_result: any,
    bettingList: any,
    status_of_answers: any
  ) {
    const r: any = [];

    for (let o = 0; o < bettingList.length; o++) {
      const to_player_answer_status = status_of_answers.filter(
        (answer: any) => answer.username == bettingList[o].username
      );

      const my_betting_result = betting_result.filter(
        (b: any) => b.username == bettingList[o].username
      );

      r.push({
        name: bettingList[o].username,
        answer_status: to_player_answer_status[0].status,
        to: bettingList[o].to_player,
        bet_coin: Math.abs(bettingList[o].bet_coin),
        type_of_bet: bettingList[o].bet_coin > 0 ? "can" : "can't",
        work_on_coin_type: my_betting_result[0].type,
        count_coin: my_betting_result[0].coin,
      });
    }

    setResult(r);

    let countOfApplyResults = 0;

    // apply result on databse(add coin or remove coin)
    if (countOfApplyResults == 0) {
      axios
        .post("http://localhost:3001/game-times/checkGameTimeStatus", {
          gameKey: gameKey,
        })
        .then((res) => {
          if (res.data.status !== "finished") {
            axios.post("http://localhost:3001/points/applyResults", {
              gameKey: gameKey,
              result: betting_result,
            });
            axios
              .post("http://localhost:3001/game-times/finishGameTime", {
                gameKey: gameKey,
              })
              .then(() => {
                countOfApplyResults++;
              });
          }
        });
    }
  }

  const startAgainListener = () => {
    playAgain(); // call playAgain function in (Start.tsx)
  };

  useEffect(() => {
    socket.on(`startAgain${gameKey}`, startAgainListener);
    return () => {
      socket.off(`startAgain${gameKey}`, startAgainListener);
    };
  }, [startAgainListener]);

  return (
    <div className="mb-5">
      <header className="start-header">{counter}</header>

      <div className="result">
        <img src="../../../public/result.png" className="result-icon"></img>
        <p className="result-txt">خب خب این دست تمام شد! ببینید چه کردید!</p>

        <div className="count-player-coin mb-3">
          <p className="mt-4">{userCoin} : </p>
          <img src="../../../public/coin.png" className="coin-icon-2"></img>
        </div>

        <p className="answer-question mb-4">
          جواب درست : {questionDetail.answer}
        </p>
        <table className="result-table">
          <tbody>
            <tr className="result-line">
              <td className="td-result">نام</td>
              <td className="td-result">جوابش به سوال</td>
              <td className="td-result">روی کسی که شرط بسته</td>
              <td className="td-result">تعداد سکه ای که شرط بسته</td>
              <td className="td-result">روی چه چیزی شرط بسته؟</td>
              <td className="td-result">سود و زیان بازیکن</td>
            </tr>
            {result.map((r: any) => (
              <tr className="result-line" key={r.name}>
                <td className="td-result">{r.name}</td>
                <td className="td-result">
                  {r.answer_status == "wrong" ? <>اشتباه</> : <>درست</>}
                </td>
                <td className="td-result">{r.to}</td>
                <td className="td-result">{r.bet_coin}</td>
                <td className="td-result">
                  {r.type_of_bet == "can" ? (
                    <>درست جواب دادن {r.to}</>
                  ) : (
                    <>اشتباه جواب دادن {r.to}</>
                  )}
                </td>
                <td className="td-result">
                  {r.work_on_coin_type == "add" ? (
                    <>+{r.count_coin}</>
                  ) : (
                    <>-{r.count_coin}</>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Result;