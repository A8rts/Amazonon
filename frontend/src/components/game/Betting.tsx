import "./Betting.css";

function Betting() {
  return (
    <div className="betting">
      <img
        src="../../../public/5175256.png"
        className="first-betting-icon mt-3 animate__animated animate__jello"
      />
      <div className="bet-main mt-4">
        <div className="bet-icon-box">
          <img
            src="../../../public/5175214.png"
            className="bet-icon animate__animated animate__jello"
          />
        </div>

        <div className="bet-icon-box-2">
          <img
            src="../../../public/5175251.png"
            className="bet-icon-2 animate__animated animate__jello"
          />
        </div>

        <div className="betting-box">
          <p className="betting-box-txt">وقت شرط بندی شد!</p>
        </div>
      </div>
    </div>
  );
}

export default Betting;
