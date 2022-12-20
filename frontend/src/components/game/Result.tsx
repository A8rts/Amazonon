import axios from "axios";
import { useEffect } from "react";
import "./styles/Result.css";

function Result({
  gameKey,
  questionDetail,
}: {
  gameKey: string;
  questionDetail: any;
}) {
  useEffect(() => {
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
    apply_results(betting_result);
  }

  function apply_results(betting_result: any) {
    // apply result on databse(add coin or remove coin)
    axios.post("http://localhost:3001/points/applyResults", {
      gameKey: gameKey,
      result: betting_result,
    });
  }

  return (
    <div>
      <div className="result">
        <p className="result-txt mt-5">
          خب خب این دست تمام شد! ببینید چه کردید!
        </p>
      </div>
    </div>
  );
}

export default Result;
