import "./Beads.css";

function Beads() {
  return (
    <div className="beads mb-5">
      <p className="beads-page-txt">خب خب! حالا که سوالو خوندین مهره رنگی خود را انتخاب کنید</p>
      <div className="beads-box">
        <img src="../../../public/puzzle.png" className="bead-icon"></img>
        <button className="bead-btn one-score">1 امتیازی</button>
        <button className="bead-btn two-score">2 امتیازی</button>
        <button className="bead-btn three-score">3 امتیازی</button>
      </div>
    </div>
  );
}

export default Beads;
