import { useEffect, useState } from "react";
import Header from "@comp/layouts/Header";
import "@auth/Login.css";
import Register from "@comp/auth/Register";
import "animate.css";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import VerifyCode from "@comp/auth/VerifyCode";
const MySwal = withReactContent(Swal);
import Cookies from "js-cookie";

function Login() {
  const [register, setRegister] = useState(false);
  const [codeSended, setCodeSended] = useState(false);
  const [userData, setUserData] = useState<any>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/authorization", { withCredentials: true })
      .then(() => {
        MySwal.fire({
          title: (
            <strong style={{ fontFamily: "Vazirmatn" }}>
              شما وارد شده اید!
            </strong>
          ),
          html: (
            <p style={{ fontFamily: "Vazirmatn" }}>
              نیازی به ورود نیست شما قبلا وارد شده اید!
            </p>
          ),
          icon: "success",
          confirmButtonText: "برو به خانه",
          footer: (
            <p style={{ fontFamily: "Vazirmatn", textAlign: "center" }}>
              اگر میخواهید اکانت خود را تغییر دهید به خانه بروید و روی (خروج)
              بزنید
            </p>
          ),
        }).then(() => (window.location.href = "/home"));
      })
      .catch(() => {
        const ls_account = Cookies.get("ls_account");
        const is_authenticated = Cookies.get("is_authenticated");

        is_authenticated && ls_account
          ? receiveUser(ls_account, Number(is_authenticated))
          : null;
      });
  });

  function receiveUser(hashedUsername: string, userId: number) {
    // get user data with user id(now we compare hashedUsername with this post request response)
    axios
      .post("http://localhost:3001/users/getUserDataWithId", { id: userId })
      .then((res) => {
        let username = res.data.username;
        let phonenumber = res.data.phonenumber; // we get user data

        res.data
          ? axios
              .post("http://localhost:3001/checkHashedData", {
                hash: hashedUsername,
                username: res.data.username,
              })
              .then((res) => {
                // we check if the hasehd username is equal to response username log in again the user :D
                res.data[0]
                  ? axios
                      .post(
                        "http://localhost:3001/login",
                        {
                          username: username,
                          phonenumber: phonenumber,
                        },
                        { withCredentials: true }
                      )
                      .then(() => {
                        MySwal.fire({
                          title: (
                            <strong style={{ fontFamily: "Vazirmatn" }}>
                              ما شما رو میشناسیم!
                            </strong>
                          ),
                          html: (
                            <p style={{ fontFamily: "Vazirmatn" }}>
                              بروید به خانه {username} عزیز
                            </p>
                          ),
                          icon: "success",
                          confirmButtonText: "برو بریم",
                        }).then(() => {
                          window.location.href = "/home";
                        });
                      })
                  : alert(
                      "کوکی های شما به هم نمیخواند! لطفا دوباره خودتان وارد شوید!"
                    );
              })
          : alert("کوکی های شما به هم نمیخواند! لطفا دوباره خودتان وارد شوید!");
      })
      .catch(() => {
        alert(
          "مشکل در بازیابی کاربر! اگر این مشکل بعد از چند بار تلاش درست نشد دوباره خودتان وارد شوید"
        );
      });
  }

  function loginUser(e: any) {
    e.preventDefault();

    const phonenumber = e.target.phonenumber.value;

    axios
      .post("http://localhost:3001/users/findUserName", {
        phonenumber: phonenumber,
      })
      .then((res) => {
        const username = res.data.username;
        const gender = res.data.gender;
        if (username !== undefined && gender !== undefined) {
          createVerifyCode(username, phonenumber, gender);
        } else {
          MySwal.fire({
            title: (
              <strong style={{ fontFamily: "Vazirmatn" }}>یافت نشد</strong>
            ),
            html: (
              <p style={{ fontFamily: "Vazirmatn" }}>
                اکانتی با این شماره وجود ندارد!
              </p>
            ),
            icon: "error",
            confirmButtonText: "باشه",
          });
        }
      });
  }

  function createVerifyCode(username: any, phonenumber: any, gender: any) {
    const userDataForCreateVerifyCode = { username, phonenumber, gender };

    axios
      .post("http://localhost:3001/verification-code", {
        userData: userDataForCreateVerifyCode,
      })
      .then((res) => {
        if (res.data[0] !== "notOk") {
          setUserData(res.data); // userData on useState is just for VerifyCode Component!
          setCodeSended(true);
        } else {
          setError(`بعد از ${30 - res.data[1]} ثانیه دگر درخواست کد دهید!`);
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

  return (
    <main>
      <Header authenticated={false} admin={false} username="null" />
      {register ? (
        <Register />
      ) : (
        <div className="login-main mt-5">
          <img
            src="../../../public/login.png"
            className="login-icon animate__animated animate__jackInTheBox"
          ></img>
          {codeSended ? (
            <VerifyCode userData={userData} type={"login"} />
          ) : (
            <form onSubmit={(e) => loginUser(e)}>
              <div className="login">
                <div className="login-from mt-5">
                  <p className="login-txt">فرم ورود</p>
                  <div className="phone-login mb-4 mt-2">
                    <strong className="phone-txt-login">شمارتون</strong>
                    <input
                      type="number"
                      className="phone-number-input"
                      required
                      name="phonenumber"
                    />
                  </div>
                  <p className="time-error">{error}</p>
                  <button className="login-btn" type="submit">
                    <strong>ورود</strong>
                  </button>
                  <button
                    className="register-btn"
                    type="button"
                    onClick={() => setRegister(true)}
                  >
                    <strong>ثبت نام</strong>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      )}
    </main>
  );
}

export default Login;
