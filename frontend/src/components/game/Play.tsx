import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GamePage from "./GamePage";
const MySwal = withReactContent(Swal);

function Play() {
  const { key } = useParams(); // this is game key
  const [userData, setUserData] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // for get all user infromation
    axios
      .get("http://localhost:3001/authorization", { withCredentials: true })
      .then((res) => {
        setUserData(res.data);
      })
      .catch(() => {
        window.location.href = "/";
      });

    // for check game key (is valid or not)
    axios
      .post("http://localhost:3001/game/valid_key", { key: key })
      .then((res) => {
        if (res.data.length > 0 && res.data.length < 2) {
          setShow(true);
        } else {
          MySwal.fire({
            title: (
              <strong style={{ fontFamily: "Vazirmatn" }}>اینجا کجاست ؟</strong>
            ),
            html: (
              <p style={{ fontFamily: "Vazirmatn" }}>
                همچین بازی ای با این کلید ({key}) وجود ندارد
              </p>
            ),
            confirmButtonText: "بریم صفحه اصلی",
            icon: "error",
          }).then(() => (window.location.href = "/home"));
        }
      });
  }, []);

  return (
    <main>{show ? <GamePage userData={userData} gameKey={key} /> : <></>}</main>
  );
}

export default Play;
