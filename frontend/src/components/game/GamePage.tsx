import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);

function GamePage() {
  const { key } = useParams(); // this is game key
  const [show, setShow] = useState(false);

  useEffect(() => {
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
  });

  return <main>{show ? <h1>Welcom to the Amazonon</h1> : <></>}</main>;
}

export default GamePage;
