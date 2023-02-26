import { useEffect, useState } from "react";
import "@auth/VerifyCode.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
const MySwal = withReactContent(Swal);

function VerifyCode({ userData, type }: { userData: any; type: string }) {
  const [verifyCode, setVerifyCode] = useState("");
  const [counter, setCounter] = useState(30);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer: any =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    return () => clearInterval(timer);
  }, [counter]);

  function getCode(e: any) {
    e.preventDefault();
    const userData_date = userData.date;
    const code_date = new Date(String(userData_date));
    const now_date = new Date();
    const diff = now_date.getTime() - code_date.getTime();

    if (verifyCode == userData.code && diff < 30000) {
      createUser(userData.code);
    } else {
      setError("کد اشتباه است یا زمان آن تمام شده است");
    }
  }

  function createUser(code: number) {
    if (type == "login") {
      MySwal.fire({
        title: <strong style={{ fontFamily: "Vazirmatn" }}>ثبت شد!</strong>,
        html: (
          <p style={{ fontFamily: "Vazirmatn" }}>حالا شما رو میشناسیم :)</p>
        ),
        icon: "success",
        confirmButtonText: "برو به بازی",
      }).then(() => {
        axios
          .post(
            "http://localhost:3001/login",
            {
              username: userData.username,
              phonenumber: userData.phonenumber,
            },
            { withCredentials: true }
          )
          .then((res) => {
            window.location.href = "http://localhost:3000/home";
          })
          .catch((err) => {
            MySwal.fire({
              title: <strong style={{ fontFamily: "Vazirmatn" }}>خطا</strong>,
              html: (
                <p style={{ fontFamily: "Vazirmatn" }}>
                  یک مشکلی به وجود امده است! دوباره تلاش کنید
                </p>
              ),
              icon: "error",
              confirmButtonText: "باشه",
            });
          });
      });
    } else {
      axios
        .post("http://localhost:3001/users/create", {
          userData: userData,
        })
        .then((res) => {
          if (res.data) {
            MySwal.fire({
              title: (
                <strong style={{ fontFamily: "Vazirmatn" }}>ثبت شد!</strong>
              ),
              html: (
                <p style={{ fontFamily: "Vazirmatn" }}>
                  حالا شما رو میشناسیم :)
                </p>
              ),
              icon: "success",
              confirmButtonText: "برو به بازی",
            }).then(() => {
              axios
                .post(
                  "http://localhost:3001/login",
                  {
                    username: userData.username,
                    phonenumber: userData.phonenumber,
                  },
                  { withCredentials: true }
                )
                .then(() => {
                  window.location.href = "http://localhost:3000/home";
                })
                .catch(() => {
                  MySwal.fire({
                    title: (
                      <strong style={{ fontFamily: "Vazirmatn" }}>خطا</strong>
                    ),
                    html: (
                      <p style={{ fontFamily: "Vazirmatn" }}>
                        یک مشکلی به وجود امده است! دوباره تلاش کنید
                      </p>
                    ),
                    icon: "error",
                    confirmButtonText: "باشه",
                  });
                });
            });
          }
        })
        .catch(() => {
          MySwal.fire({
            title: <strong style={{ fontFamily: "Vazirmatn" }}>خطا</strong>,
            html: (
              <p style={{ fontFamily: "Vazirmatn" }}>
                یک مشکلی به وجود امده است! دوباره تلاش کنید
              </p>
            ),
            icon: "error",
            confirmButtonText: "باشه",
          });
        });
    }

    deleteVerifyCode(code);
  }

  function deleteVerifyCode(code: number) {
    // delete the verify code to keep clean table :D
    axios.post("http://localhost:3001/verification-code/deleteVerifyCode", {
      code: code,
    });
  }

  return (
    <form onSubmit={(e) => getCode(e)} className="mt-2">
      <div className="register">
        <div className="register-from mt-3">
          <p className="register-txt">کدو وارد کن</p>

          <div className="user-info-register">
            <div className="code-register mb-4 mt-2">
              <strong className="code-txt-register">کد</strong>
              <input
                onChange={(e) => setVerifyCode(e.target.value)}
                type="number"
                className="code-number-input"
                required
                name="verify_code"
              />
            </div>

            <strong className="name-error" style={{ display: "block" }}>
              {error}
            </strong>

            <strong
              className="name-error mt-3"
              style={{ color: "black", display: "block" }}
            >
              زمان : {counter}
            </strong>

            <button className="go-btn" type="submit">
              <strong>برو بریم </strong>
            </button>
            <button
              type="button"
              className="back-btn"
              onClick={() => window.location.reload()}
            >
              <strong>برگشت به اول</strong>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default VerifyCode;
