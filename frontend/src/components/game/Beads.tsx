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
  changeBetting,
}: {
  gameKey: string;
  userData: any;
  socket: any;
  gameData: any;
  changeBetting: any;
}) {
  const [sendedBead, setSendedBead] = useState(false);
  const [beads, setBeads] = useState<number[]>([]);
  const [countBeads, setCountBeads] = useState(0);

  useEffect(() => {
    // check the user is choose one bead or no
    axios
      .post("http://localhost:3001/beads/checkBeadSended", {
        gameKey: gameKey,
        username: userData.username,
      })
      .then((res) => {
        if (res.data) {
          setSendedBead(true);
        }
      });

    axios
      .post("http://localhost:3001/beads/checkClosedBeads", {
        gameKey: gameKey,
      })
      .then((res) => {
        const prevBeads = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].bead == 1) {
            res.data[i].bead = "one";
            prevBeads.push(res.data[i].bead);
          } else if (res.data[i].bead == 2) {
            res.data[i].bead = "two";
            prevBeads.push(res.data[i].bead);
          } else if (res.data[i].bead == 3) {
            res.data[i].bead = "three";
            prevBeads.push(res.data[i].bead);
          }
        }
        setBeads(prevBeads);
        setCountBeads(prevBeads.length);
      });
  }, []);

  function checkDisabled(bead: number, limit: number, counts: any) {
    //check if the selected bead is open or not
    if (bead == 1) {
      if (counts.one >= limit) {
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
    const counts: any = {};
    beads.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });
    const limit_bead = gameData.capacity / 3;

    const func = checkDisabled(bead, limit_bead, counts);

    if (func) {
      //save the user bead on database
      if (sendedBead == false) {
        axios.post("http://localhost:3001/beads/saveBead", {
          gameKey: gameKey,
          username: userData.username,
          bead: bead,
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
    setCountBeads(beads.length);
    //save bead in state
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

  useEffect(() => {
    if (beads.length == gameData.capacity) {
      changeBetting();
      if (userData.username == gameData.creator) {
        axios
          .post("http://localhost:3001/beads/chooseBeadsFinished", {
            gameKey: gameKey,
          })
          .then((res) => {
            console.log(res.data);
          });
      }
    }
  });

  return (
    <div className="beads mb-5">
      <p className="beads-page-txt">
        خب خب! حالا که سوالو خوندین مهره رنگی خود را انتخاب کنید
      </p>
      <p className="count-beads-page-txt">
        {countBeads} نفر مهره های خود را انتخاب کرده اند
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
