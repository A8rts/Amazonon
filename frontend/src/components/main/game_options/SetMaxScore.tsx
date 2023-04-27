import "@main/game_options/Create.css"; // this component style set in Create.css file

function SetMaxScore({ updateMaximumCoin }: { updateMaximumCoin: any }) {
  // to know when we should stop the game and announced winners

  function setMaxCoin(e: any) {
    if (e.target.value) {
      updateMaximumCoin(e.target.value);
    }
  }

  return (
    <div>
      <strong className="about-radio-group mt-2">حداکثر امتیاز</strong>

      <div className="max-score">
        <ul className="max-score-buttons">
          <li>
            <input
              type="radio"
              value="10"
              name="maxScore"
              id="tenScore"
              className="q-buttons inp-max-score"
              onClick={(e) => setMaxCoin(e)}
            />
            <label htmlFor="tenScore" className="label-q-buttons inp-max-score">
              10
            </label>
          </li>
          <li>
            <input
              type="radio"
              value="20"
              name="maxScore"
              id="twentyScore"
              className="q-buttons inp-max-score"
              onClick={(e) => setMaxCoin(e)}
            />
            <label
              htmlFor="twentyScore"
              className="label-q-buttons inp-max-score"
            >
              20
            </label>
          </li>

          <li>
            <input
              type="radio"
              value="30"
              name="maxScore"
              id="thirtyScore"
              className="q-buttons inp-max-score"
              onClick={(e) => setMaxCoin(e)}
            />
            <label
              htmlFor="thirtyScore"
              className="label-q-buttons inp-max-score"
            >
              30
            </label>
          </li>

          <li>
            <input
              type="radio"
              value="40"
              name="maxScore"
              id="fortyScore"
              className="q-buttons inp-max-score"
              onClick={(e) => setMaxCoin(e)}
            />
            <label
              htmlFor="fortyScore"
              className="label-q-buttons inp-max-score"
            >
              40
            </label>
          </li>

          <li>
            <input
              type="radio"
              value="50"
              name="maxScore"
              id="fiftyScore"
              className="q-buttons inp-max-score"
              onClick={(e) => setMaxCoin(e)}
            />
            <label
              htmlFor="fiftyScore"
              className="label-q-buttons inp-max-score"
            >
              50
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SetMaxScore;
