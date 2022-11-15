import Swal from "sweetalert2";
import "./Create.css";
const MySwal = withReactContent(Swal);
import withReactContent from "sweetalert2-react-content";
import { useState } from "react";

function Create() {
  const [topics, setTopics] = useState<string[]>([]);

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
          نمیدانید بازی چگونه است به بخش درباره ی بازی بروید.
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

  function createGame(e: any) {
    e.preventDefault();

    if (
      e.target.gameTitle.value !== "" &&
      e.target.numOfPlayers.value !== "" &&
      topics.length > 0
    ) {
      MySwal.fire({ title: "ثبت", text: "بازی شما ساخته شد", icon: "success" });
    } else {
      MySwal.fire({ title: "خطا", text: "کامل نی", icon: "error" });
    }
  }

  return (
    <div className="create">
      <div className="main-box mt-3">
        <div className="create-icon-box">
          <img src="../../../../public/video-game (1).png" className="create-icon"></img>
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
                      value="three_player"
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
                      value="six-player"
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
                      value="nine-player"
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
