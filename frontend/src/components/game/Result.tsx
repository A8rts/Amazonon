import axios from "axios";
import { useEffect, useState } from "react";
import "@game/styles/Result.css";
import ChagneCategory from "./ChangeCategory";

function Result({
  gameKey,
  questionDetail,
  gameData,
  userData,
  socket,
  playAgain,
  answers,
  weHaveWinner,
  changeGameSubjects,
  maximumCoin,
}: {
  gameKey: string;
  questionDetail: any;
  gameData: any;
  userData: any;
  socket: any;
  playAgain: any;
  answers: any;
  weHaveWinner: any;
  changeGameSubjects: any;
  maximumCoin: any;
}) {
  const [result, setResult] = useState([]);
  const [playerCoin, setPlayerCoin] = useState(0);
  const [chagneCategory, setChangeCategory] = useState(false);
  const [counter, setCounter] = useState(60);

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
    const choosed_beads: any = [];
    axios // to get all players choosed beads
      .post("http://localhost:3001/beads/getAllBeadsFromGame", {
        gameKey: gameKey,
      })
      .then((res) => {
        choosed_beads.push(res.data);
      });

    axios
      .post("http://localhost:3001/points/getCoint", {
        gameKey: gameKey,
        username: userData.username,
      })
      .then((res) => {
        setPlayerCoin(res.data.coins);
      });

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
          axios.post("http://localhost:3001/play-again-times/create", {
            gameKey: gameKey,
          });
          countOfPlayAgainTimeCreated++;
        } else if (res.data !== "not_created") {
          // to change the date for start the game again
          const playAgainTimeDate = new Date(String(res.data[0].date));
          const nowDate = new Date();

          const diffDate = nowDate.getTime() - playAgainTimeDate.getTime();

          const total_seconds = parseInt(String(Math.floor(diffDate / 1000)));

          if (total_seconds > 60) {
            sendPlayAgainEvent();
          } else {
            setCounter(60 - total_seconds);
          }
        }
      });

    // to save betting list and answers
    let bettingList: any = [];
    axios
      .post("http://localhost:3001/betting/getBettingList", {
        gameKey: gameKey,
      })
      .then((res) => {
        bettingList.push(res.data);

        if (answers.length <= 0) {
          axios // to get all answers
            .post("http://localhost:3001/answers/getAnswers", {
              gameKey: gameKey,
            })
            .then((res) => {
              answers_checker(bettingList[0], res.data, choosed_beads);
            });
        } else {
          answers_checker(bettingList[0], answers, choosed_beads); // start work to make results
        }
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

  function answers_checker(
    bettingList: any,
    answersList: any,
    choosed_beads: any
  ) {
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

    bettings_checker(bettingList, status_of_answers, choosed_beads);
    update_players_correct_answers_chart(status_of_answers);
  }

  function update_players_correct_answers_chart(status_of_answers: any) {
    // to update the correct_answers_for_categories column on database(that data shows in the profile correct answers chart)
    const right_answers: any = [];
    status_of_answers.map((answer: any) => {
      answer.status !== "wrong" ? right_answers.push(answer) : <></>;
    });
    const subject = questionDetail.subject;

    axios.post(
      "http://localhost:3001/users/updateCorrectAnswersForCategories",
      {
        subject: subject,
        list: right_answers,
        gameKey: gameKey,
      }
    );
  }

  function bettings_checker(
    bettingList: any,
    status_of_answers: any,
    choosed_beads: any
  ) {
    // to know to add coin to player or remove coin from player(with betting list and status of answers)
    const betting_result: any = [];

    for (let j = 0; j < bettingList.length; j++) {
      const to_player_answer_status = status_of_answers.filter(
        (answer: any) => answer.username == bettingList[j].to_player
      );
      const status_of_answ = status_of_answers.filter(
        (status: any) => status.username == bettingList[j].username
      );
      const player_choosed_beads = choosed_beads[0].filter(
        (choosed_bead: any) => choosed_bead.username == bettingList[j].username
      );

      if (bettingList[j].bet_coin > 0) {
        if (to_player_answer_status[0].status == "right") {
          betting_result.push({
            username: bettingList[j].username,
            coin: Math.abs(bettingList[j].bet_coin),
            type: "add",
            status_of_answers: status_of_answ[0].status,
            choosed_bead: player_choosed_beads[0].bead,
          });
        } else {
          betting_result.push({
            username: bettingList[j].username,
            coin: Math.abs(bettingList[j].bet_coin),
            type: "remove",
            status_of_answers: status_of_answ[0].status,
            choosed_bead: player_choosed_beads[0].bead,
          });
        }
      } else {
        if (to_player_answer_status[0].status == "wrong") {
          betting_result.push({
            username: bettingList[j].username,
            coin: Math.abs(bettingList[j].bet_coin),
            type: "add",
            status_of_answers: status_of_answ[0].status,
            choosed_bead: player_choosed_beads[0].bead,
          });
        } else {
          betting_result.push({
            username: bettingList[j].username,
            coin: Math.abs(bettingList[j].bet_coin),
            type: "remove",
            status_of_answers: status_of_answ[0].status,
            choosed_bead: player_choosed_beads[0].bead,
          });
        }
      }
    }

    save_results_to_show(bettingList, status_of_answers, betting_result); // to save results and show
    if (gameData.creator == userData.username) {
      apply_results(betting_result);
    }

    axios
      .post("http://localhost:3001/points/getCoint", {
        gameKey: gameKey,
        username: userData.username,
      })
      .then((res) => setPlayerCoin(res.data.coins));
  }

  let countOfApplyResults = 0; // for count requests to apply result
  let countOfCreatedWinner = 0;

  function apply_results(betting_result: any) {
    // apply result on databse(add coin or remove coin)
    if (countOfApplyResults == 0) {
      axios
        .post("http://localhost:3001/game-times/checkGameTimeStatus", {
          gameKey: gameKey,
        })
        .then((res) => {
          if (res.data.status !== "finished") {
            axios
              .post("http://localhost:3001/points/applyResults", {
                gameKey: gameKey,
                result: betting_result,
              })
              .then(() => {
                countOfApplyResults++;
                socket.emit("checkPoints");
              });
            axios.post("http://localhost:3001/game-times/finishGameTime", {
              gameKey: gameKey,
            });
          }
        });
    }
    countOfApplyResults++;
  }

  function save_results_to_show(
    bettingList: any,
    status_of_answers: any,
    betting_result: any
  ) {
    const r: any = [];

    for (let o = 0; o < bettingList.length; o++) {
      const my_answer_status = status_of_answers.filter(
        (answer: any) => answer.username == bettingList[o].username
      );
      const my_betting_result = betting_result.filter(
        (b: any) => b.username == bettingList[o].username
      );

      r.push({
        // save result data to show that
        name: bettingList[o].username,
        answer_status: my_answer_status[0].status,
        to: bettingList[o].to_player,
        bet_coin: Math.abs(bettingList[o].bet_coin),
        type_of_bet: bettingList[o].bet_coin > 0 ? "can" : "can't",
        work_on_coin_type: my_betting_result[0].type,
        count_coin: my_betting_result[0].coin,
        added_coins_with_answers:
          my_answer_status[0].status == "right"
            ? my_betting_result[0].choosed_bead
            : 0,
      });
    }
    setResult(r);
  }

  const startAgainListener = () => {
    playAgain(); // play again the game
  };

  const getYourCoinAndCheckWinnerListener = () => {
    countOfApplyResults++;

    const players_coins: any = [];
    axios
      .post("http://localhost:3001/points/getAllCoinsFromGame", {
        gameKey: gameKey,
      })
      .then((res) => {
        players_coins.push(res.data);

        // update player coin next to betting
        res.data.filter((p_coin: any) =>
          p_coin.username == userData.username ? (
            setPlayerCoin(p_coin.coins)
          ) : (
            <></>
          )
        );

        //to check if one player coins are bigger than maximumCoin coins we say that player is winner :)))
        const winners: any = [];
        for (let c = 0; c < res.data.length; c++) {
          if (res.data[c].coins >= maximumCoin) {
            winners.push(res.data[c].username);
          }
        }
        console.log();

        if (winners.length > 0 && countOfCreatedWinner == 0) {
          // if we have winner we save that on database
          axios
            .post("http://localhost:3001/winners/create", {
              gameKey: gameKey,
              winners: winners,
            })
            .then(() => {
              {
                axios
                  .post(
                    "http://localhost:3001/winners/updateNumberOfWinsUsers",
                    {
                      gameKey: gameKey,
                      winners: winners,
                    }
                  )
                  .then(() => {
                    weHaveWinner(); // call this function for show winner page
                    countOfApplyResults++;
                    countOfCreatedWinner++;
                  });
              }
            });
        }
      });
  };

  useEffect(() => {
    socket.on(`startAgain${gameKey}`, startAgainListener);
    socket.on(
      `getYourCoinAndCheckWinner${gameKey}`,
      getYourCoinAndCheckWinnerListener
    );
    return () => {
      socket.off(`startAgain${gameKey}`, startAgainListener);
      socket.off(
        `getYourCoinAndCheckWinner${gameKey}`,
        getYourCoinAndCheckWinnerListener
      );
    };
  }, [startAgainListener, getYourCoinAndCheckWinnerListener]);

  return (
    <div className="mb-5">
      <header className="start-header">
        {counter} ثانیه تا شروع دوباره بازی :)
      </header>

      <div className="result">
        <img src="../../../public/result.png" className="result-icon"></img>
        <p className="result-txt">خب خب این دست تمام شد! ببینید چه کردید!</p>
        {gameData.creator == userData.username ? (
          chagneCategory ? (
            <ChagneCategory
              gameKey={gameKey}
              changeGameSubjects={changeGameSubjects}
            /> // if creator want to change the questions category, we handle that
          ) : (
            <button
              className="change-category mb-3"
              onClick={() => setChangeCategory(true)}
            >
              میخوام دسته بندی سوالا رو تغییر بدم
            </button>
          )
        ) : (
          <></>
        )}
        <div className="count-player-coin mb-3">
          <p className="mt-4">{playerCoin} : </p>
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
              <td className="td-result">سود و زیان بازیکن از شرط ها</td>
              <td className="td-result">سود بازیکن از جوابش</td>
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
                <td className="td-result">{r.added_coins_with_answers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Result;
