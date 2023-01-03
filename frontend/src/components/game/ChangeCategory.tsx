import "@game/styles/ChangeCategory.css";
import axios from "axios";
import { useState } from "react";

function ChagneCategory({
  gameKey,
  changeGameSubjects,
}: {
  gameKey: string;
  changeGameSubjects: any;
}) {
  const [category, setCategory] = useState<string[]>([]);
  const [changed, setChanged] = useState(false);

  function addCategory(e: any) {
    //add category to state
    if (e.target.checked == true) {
      setCategory([...category, e.target.value]);
    } else {
      setCategory(category.filter((item) => item !== e.target.value));
    }
  }

  function changeGameQuestionsCategory() {
    axios
      .post("http://localhost:3001/game/changeGameSubjects", {
        gameKey: gameKey,
        subjects: category,
      })
      .then(() => {
        changeGameSubjects(category); // update game subjects
        setChanged(true);
      });
  }

  return (
    <div className="main-category mb-3">
      {changed ? (
        <p className="changed-category mt-3">ویرایش اعمال شد :)</p>
      ) : (
        <div>
          <div className="change-category-div mb-2">
            <ul className="question-game-group">
              <li>
                <input
                  type="checkbox"
                  value="cinema"
                  name="gameQuestion"
                  id="cinema"
                  className="q-buttons q-inp"
                  onChange={(e) => addCategory(e)}
                />
                <label htmlFor="cinema" className="label-q-buttons q-inp">
                  سینما
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="food"
                  name="gameQuestion"
                  id="food"
                  className="q-buttons q-inp"
                  onChange={(e) => addCategory(e)}
                />
                <label htmlFor="food" className="label-q-buttons q-inp">
                  غذا
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="religious"
                  name="gameQuestion"
                  id="religious"
                  className="q-buttons q-inp"
                  onChange={(e) => addCategory(e)}
                />
                <label htmlFor="religious" className="label-q-buttons q-inp">
                  مذهبی
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="history"
                  name="gameQuestion"
                  id="history"
                  className="q-buttons q-inp"
                  onChange={(e) => addCategory(e)}
                />
                <label htmlFor="history" className="label-q-buttons q-inp">
                  تاریخ
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="nature"
                  name="gameQuestion"
                  id="nature"
                  className="q-buttons q-inp"
                  onChange={(e) => addCategory(e)}
                />
                <label htmlFor="nature" className="label-q-buttons q-inp">
                  طبیعت
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  value="sport"
                  name="gameQuestion"
                  id="sport"
                  className="q-buttons q-inp"
                  onChange={(e) => addCategory(e)}
                />
                <label htmlFor="sport" className="label-q-buttons q-inp">
                  ورزش
                </label>
              </li>
            </ul>
          </div>
          <button
            className="edit-category"
            onClick={() => changeGameQuestionsCategory()}
          >
            ویرایش
          </button>
        </div>
      )}
    </div>
  );
}

export default ChagneCategory;
