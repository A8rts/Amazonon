import "./Betting.css";

function Betting() {
  return (
    <div className="betting mb-5">
        <img
          src="../../../public/5175256.png"
          className="first-betting-icon mt-3 animate__animated animate__jello hide-bet"
        />

      <div className="bet-main mt-4">
        <div className="bet-icon-box">
          <img
            src="../../../public/5175214.png"
            className="bet-icon animate__animated"
          />
        </div>

        <div className="bet-icon-box-2">
          <img
            src="../../../public/5175251.png"
            className="bet-icon-2 animate__animated"
          />
        </div>

        <div className="betting-box">
          <p className="betting-box-txt">وقت شرط بندی شد!</p>
          <div className="bet-players-box mb-4">
            <img
              src="../../../public/5175214.png"
              className="bet-icon-mobiles"
            />

            <div className="player-bet mt-4 mb-4">
              <p className="bet-coin coin-bet-icon-add">+</p>
              <p className="player-name ">آرتا</p>
              <p className="bet-coin coin-bet-icon-remove">-</p>
            </div>

            <div className="player-bet mt-4 mb-4">
              <p className="bet-coin coin-bet-icon-add">+</p>
              <p className="player-name ">آوینا</p>
              <p className="bet-coin coin-bet-icon-remove">-</p>
            </div>

            <div className="player-bet mt-4 mb-4">
              <p className="bet-coin coin-bet-icon-add">+</p>
              <p className="player-name ">بهاره</p>
              <p className="bet-coin coin-bet-icon-remove">-</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Betting;
