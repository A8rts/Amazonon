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
  const [beads, setBeads] = useState<number[]>([]);

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

  function checkDisabled(bead: number, limit: number, counts: any) {
    console.log(counts);
    console.log(limit);

    if (bead == 1) {
      if (counts.one <= limit) {
        MySwal.fire({
          title: (
            <strong style={{ fontFamily: "Vazirmatn" }}>
              این مهره رو تموم کردیم!
            </strong>
          ),
          html: (
            <p style={{ fontFamily: "Vazirmatn" }}>
              این مهره توسط بقیه بازیکنها انتخاب شده است! سریع باشید!!
            </p>
          ),
          confirmButtonText: "باش",
          icon: "error",
        });
        return false;
      } else {
        return true;
      }
    } else if (bead == 2) {
      if (counts.two <= limit) {
        MySwal.fire({
          title: (
            <strong style={{ fontFamily: "Vazirmatn" }}>
              این مهره رو تموم کردیم!
            </strong>
          ),
          html: (
            <p style={{ fontFamily: "Vazirmatn" }}>
              این مهره توسط بقیه بازیکنها انتخاب شده است! سریع باشید!!
            </p>
          ),
          confirmButtonText: "باش",
          icon: "error",
        });
        return false;
      } else {
        return true;
      }
    } else if (bead == 3) {
      if (counts.three <= limit) {
        MySwal.fire({
          title: (
            <strong style={{ fontFamily: "Vazirmatn" }}>
              این مهره رو تموم کردیم!
            </strong>
          ),
          html: (
            <p style={{ fontFamily: "Vazirmatn" }}>
              این مهره توسط بقیه بازیکنها انتخاب شده است! سریع باشید!!
            </p>
          ),
          confirmButtonText: "باش",
          icon: "error",
        });
        return false;
      } else {
        return true;
      }
    }
  }

  function sendBead(bead: number) {
    console.log(beads);
    
    const counts: any = {};
    beads.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });
    const limit_bead = gameData.capacity / 3;

    const func = checkDisabled(bead, limit_bead, counts);

    if (func) {
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
        socket.emit("beadSended", { bead: bead });
      } else {
        MySwal.fire({
          title: (
            <strong style={{ fontFamily: "Vazirmatn" }}>
              شما قبلا انتخاب کردید
            </strong>
          ),
          html: (
            <p style={{ fontFamily: "Vazirmatn" }}>
              شما مهره خود را قبلا انتخاب کرده اید هر زمان که همه مهره های خود
              را انتخاب کردند به بخش شرط بندی میروید
            </p>
          ),
          confirmButtonText: "باشه",
          icon: "warning",
        });
      }
    }
  }

  const saveBeadListener = (beads: any) => {
    console.log(beads);

    const allBeads = [];
    for (let i = 0; i < beads.length; i++) {
      if (beads[i].bead == 1) {
        beads[i].bead = "one";
        allBeads.push(beads[i].bead);
      } else if (beads[i].bead == 2) {
        beads[i].bead = "two";
        allBeads.push(beads[i].bead);
      } else if (beads[i].bead == 3) {
        beads[i].bead = "three";
        allBeads.push(beads[i].bead);
      }
    }

    setBeads(allBeads);
  };

  useEffect(() => {
    socket.on(`saveBead${gameKey}`, saveBeadListener);
    return () => {
      socket.off(`saveBead${gameKey}`, saveBeadListener);
    };
  }, [saveBeadListener]);

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
