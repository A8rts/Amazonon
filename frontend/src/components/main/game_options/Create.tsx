import Swal from "sweetalert2";
import "@main/game_options/Create.css";
const MySwal = withReactContent(Swal);
import withReactContent from "sweetalert2-react-content";
import { useState } from "react";
import axios from "axios";
import SetMaxScore from "@main/game_options/SetMaxScore";

function Create({ name }: { name: string }) {
  const [topics, setTopics] = useState<string[]>([]);
  const [maxCoin, setMaxCoin] = useState<number>();

  function guideMessage() {
    MySwal.fire({
      title: <strong style={{ fontFamily: "Vazirmatn" }}>راهنما</strong>,
      html: (
        <p style={{ fontFamily: "Vazirmatn", fontSize: "1rem" }}>
          خب برای ایجاد یک بازی جدید باید اول فرم بالا رو پر کنیم. اول باید نوع
          بازی یعنی (عمومی یا خصوصی) رو انتخاب کنیم که اگه عمومی باشه بازی شما
          در بخش بازی های عمومی قرار داده میشه! اگر هم نه که فقط با کد الحاق
          بازی میشود وارد آن شد. بعدش باید موضوع های دلخواه که از آن ها در بازی
          سوال میاد رو انتخاب کنیم و بعدش هم تعداد بازیکن های آن بازی :) اگر
          نمیدانید بازی چگونه است به بخش درباره ی بازی بروید. (حداکثر امتیاز
          مشخص میکنه کی تا کی بازی ادامه پیدا کنه! تا 20 امتیاز تا 30 و ...)
        </p>
      ),
      icon: "info",
      confirmButtonText: "فهمیدم",
    });
  }

  function addQuestionGroup(e: any) {
    // for when user chooes game topics we added that data on array
    if (e.target.checked == true) {
      setTopics([...topics, e.target.value]);
    } else {
      setTopics(topics.filter((item) => item !== e.target.value));
    }
  }

  function updateMaximumCoin(maxCoin: number) {
    setMaxCoin(maxCoin); // set maximum coin
  }

  function createGame(e: any) {
    e.preventDefault();

    if (
      e.target.gameTitle.value !== "" &&
      e.target.numOfPlayers.value !== "" &&
      topics.length > 0 &&
      maxCoin !== undefined
    ) {
      axios
        .post("http://localhost:3001/game/create", {
          creator: name,
          type: e.target.gameTitle.value,
          subjects: topics,
          capacity: e.target.numOfPlayers.value,
          maximum_score: maxCoin,
        })
        .then((res) =>
          MySwal.fire({
            title: (
              <strong style={{ fontFamily: "Vazirmatn" }}>بازی ایجاد شد</strong>
            ),
            html: <p style={{ fontFamily: "Vazirmatn" }}>بروید به بازی خود</p>,
            icon: "success",
            confirmButtonText: "برو",
          }).then(() => (window.location.href = `/game/${res.data.key}`))
        )
        .catch(() => {
          MySwal.fire({
            title: <strong style={{ fontFamily: "Vazirmatn" }}>خطا</strong>,
            html: <p style={{ fontFamily: "Vazirmatn" }}>یه مشکلی هست</p>,
            icon: "error",
            confirmButtonText: "برو",
          });
        });
    } else {
      MySwal.fire({
        title: <strong style={{ fontFamily: "Vazirmatn" }}>یه چیزی کمه</strong>,
        html: (
          <p style={{ fontFamily: "Vazirmatn" }}>
            مطمئن شوید که همه ی موارد را انتخاب کردید
          </p>
        ),
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
  }

  return (
    <div className="create">
      <div className="main-box mt-3">
        <div className="create-icon-box">
          <img
            src="../../../../public/video-game (1).png"
            className="create-icon"
          ></img>
        </div>
        <form onSubmit={(e) => createGame(e)}>
          <div className="create-box mb-5">
            <p className="create-box-txt"> ایجاد بازی جدید</p>
            <div className="radio-button mb-4">
              <strong className="about-radio-group mt-2">نوع بازی </strong>
              <div className="game-title-groups">
                <ul className="title-game-group">
                  <li>
                    <input
                      type="radio"
                      value="public"
                      name="gameTitle"
                      id="public"
                      className="q-buttons inp-public"
                    />
                    <label
                      htmlFor="public"
                      className="label-q-buttons inp-public"
                    >
                      عمومی
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      value="private"
                      name="gameTitle"
                      id="private"
                      className="q-buttons inp-private"
                    />
                    <label
                      htmlFor="private"
                      className="label-q-buttons inp-private"
                    >
                      خصوصی
                    </label>
                  </li>
                </ul>
              </div>

              <strong className="about-radio-group mt-2">موضوع های سوال</strong>
              <div className="game-question-groups">
                <ul className="question-game-group">
                  <li>
                    <input
                      type="checkbox"
                      onChange={(e) => addQuestionGroup(e)}
                      value="cinema"
                      name="gameQuestion"
                      id="cinema"
                      className="q-buttons q-inp"
                    />
                    <label htmlFor="cinema" className="label-q-buttons q-inp">
                      سینما
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      onChange={(e) => addQuestionGroup(e)}
                      value="food"
                      name="gameQuestion"
                      id="food"
                      className="q-buttons q-inp"
                    />
                    <label htmlFor="food" className="label-q-buttons q-inp">
                      غذا
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      onChange={(e) => addQuestionGroup(e)}
                      value="religious"
                      name="gameQuestion"
                      id="religious"
                      className="q-buttons q-inp"
                    />
                    <label
                      htmlFor="religious"
                      className="label-q-buttons q-inp"
                    >
                      مذهبی
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      onChange={(e) => addQuestionGroup(e)}
                      value="history"
                      name="gameQuestion"
                      id="history"
                      className="q-buttons q-inp"
                    />
                    <label htmlFor="history" className="label-q-buttons q-inp">
                      تاریخ
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      onChange={(e) => addQuestionGroup(e)}
                      value="nature"
                      name="gameQuestion"
                      id="nature"
                      className="q-buttons q-inp"
                    />
                    <label htmlFor="nature" className="label-q-buttons q-inp">
                      طبیعت
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      onChange={(e) => addQuestionGroup(e)}
                      value="sport"
                      name="gameQuestion"
                      id="sport"
                      className="q-buttons q-inp"
                    />
                    <label htmlFor="sport" className="label-q-buttons q-inp">
                      ورزش
                    </label>
                  </li>
                </ul>
              </div>

              <strong className="about-radio-group mt-2">تعدا بازیکنا</strong>
              <div className="num-of-players">
                <ul className="num-of-players-buttons">
                  <li>
                    <input
                      type="radio"
                      value="3"
                      name="numOfPlayers"
                      id="three_player"
                      className="q-buttons inp-players"
                    />
                    <label
                      htmlFor="three_player"
                      className="label-q-buttons inp-players"
                    >
                      3 نفره
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      value="6"
                      name="numOfPlayers"
                      id="six-player"
                      className="q-buttons inp-players"
                    />
                    <label
                      htmlFor="six-player"
                      className="label-q-buttons inp-players"
                    >
                      6 نفره
                    </label>
                  </li>

                  <li>
                    <input
                      type="radio"
                      value="9"
                      name="numOfPlayers"
                      id="nine-player"
                      className="q-buttons inp-players"
                    />
                    <label
                      htmlFor="nine-player"
                      className="label-q-buttons inp-players"
                    >
                      9 نفره
                    </label>
                  </li>
                </ul>
              </div>

              <SetMaxScore updateMaximumCoin={updateMaximumCoin} />
            </div>
            <div className="end-create-buttons">
              <button className="create-game-btn" type="submit">
                ایجاد
              </button>
              <button
                className="create-game-btn guide-btn"
                type="button"
                onClick={() => guideMessage()}
              >
                راهنمایی درباره فرم بالا
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
