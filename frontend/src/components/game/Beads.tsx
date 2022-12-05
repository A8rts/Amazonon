import axios from "axios";
import { useEffect, useState } from "react";
import "./Beads.css";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);

function Beads({
  gameKey,
  userData,
  socket,
  gameData,
}: {
  gameKey: string;
  userData: any;
  socket: any;
  gameData: any;
}) {
  const [sendedBead, setSendedBead] = useState(false);

  useEffect(() => {
    // check the user is choose one bead or no
    axios
      .post("http://localhost:3001/game/checkBeadSended", {
        gameKey: gameKey,
        username: userData.username,
      })
      .then((res) => {
        if (res.data) {
          setSendedBead(true);
        }
      });
  });

  function sendBead(bead: number) {
    //save the user bead on database
    if (sendedBead == false) {
      axios
        .post("http://localhost:3001/game/saveBead", {
          gameKey: gameKey,
          username: userData.username,
          bead: bead,
        })
        .then((res) => {
          console.log(res.data);
        });

      setSendedBead(true);
      socket.emit("beadSended");
    } else {
      MySwal.fire({
        title: (
          <strong style={{ fontFamily: "Vazirmatn" }}>
            شما قبلا انتخاب کردید
          </strong>
        ),
        html: (
          <p style={{ fontFamily: "Vazirmatn" }}>
            شما مهره خود را قبلا انتخاب کرده اید هر زمان که همه مهره های خود را
            انتخاب کردند به بخش شرط بندی میروید
          </p>
        ),
        confirmButtonText: "باشه",
        icon: "warning",
      });
    }
  }

  return (
    <div className="beads mb-5">
      <p className="beads-page-txt">
        خب خب! حالا که سوالو خوندین مهره رنگی خود را انتخاب کنید
      </p>
      <div className="beads-box">
        <img src="../../../public/puzzle.png" className="bead-icon"></img>
        <button className="bead-btn one-score" onClick={() => sendBead(1)}>
          {sendedBead ? <>انتخاب شد</> : <>1 امتیازی</>}
        </button>
        <button className="bead-btn two-score" onClick={() => sendBead(2)}>
          {sendedBead ? <>انتخاب شد</> : <>2 امتیازی</>}
        </button>
        <button className="bead-btn three-score" onClick={() => sendBead(3)}>
          {sendedBead ? <>انتخاب شد</> : <>3 امتیازی</>}
        </button>
      </div>
    </div>
  );
}

export default Beads;
