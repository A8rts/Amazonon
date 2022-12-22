import "@auth/Register.css";
import "animate.css";
import { useState } from "react";
import VerifyCode from "@auth/VerifyCode";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);

function Register() {
  const [error, setError] = useState("");
  const [codeSended, setCodeSended] = useState(false);
  const [userData, setUserData] = useState<any>([]);

  function registerUser(e: any) {
    e.preventDefault();

    const username = e.target.username.value;
    const phonenumber = e.target.phonenumber.value;
    const gender = e.target.gender.value;
    const userData = {
      username: username,
      phonenumber: phonenumber,
      gender: gender,
    };
    setUserData(userData);

    axios
      .post("http://localhost:3001/users", {
        // send user data for validation (in users.controller)
        userData: userData,
      })
      .then((res) => {
        if (res.data == "longUserNameError") {
          setError("نام شما بیشتر از 13 کاراکتر میباشد");
        } else if (res.data == "duplicatesPhoneNumberError") {
          setError("شماره شما قبلا وارد شده است");
        } else if (res.data == "successful") {
          axios
            .post("http://localhost:3001/verification-code", {
              // send user data for save in code information (in verification-code.controller)
              userData: userData,
            })
            .then((res) => {
              setUserData(res.data);
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
          setCodeSended(true);
        }
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
  }

  return (
    <div className="register-main mt-5">
      <div>
        <img
          src="../../../public/register.png"
          className="register-icon animate__animated animate__jackInTheBox"
        ></img>
        {codeSended ? (
          <VerifyCode userData={userData} />
        ) : (
          <form onSubmit={(e) => registerUser(e)}>
            <div className="register">
              <div className="register-from mt-3">
                <p className="register-txt">فرم ثبت نام</p>

                <div className="user-info-register">
                  <div className="phone-register mb-4 mt-2">
                    <strong className="phone-txt-register">شمارتون</strong>
                    <input
                      type="number"
                      className="phone-number-input"
                      required
                      name="phonenumber"
                    />
                  </div>
                  <div className="name-register mb-3 mt-2">
                    <strong className="name-txt-register">اسمتون</strong>
                    <input
                      type="text"
                      className="name-input"
                      required
                      name="username"
                    />
                  </div>
                  <strong className="name-error">{error}</strong>
                </div>

                <div className="user-gender mt-3">
                  <div className="man-gender">
                    <input
                      type="radio"
                      id="man"
                      name="gender"
                      value="man"
                      className="gender-input"
                      required
                    />
                    <label htmlFor="man">آقا</label>
                  </div>

                  <div className="woman-gender">
                    <input
                      type="radio"
                      id="woman"
                      name="gender"
                      required
                      value="woman"
                      className="gender-input"
                    />
                    <label htmlFor="woman">خانم</label>
                  </div>
                </div>

                <button className="register-btn" type="submit">
                  <strong>ثبت </strong>
                </button>
                <button
                  type="button"
                  className="login-btn"
                  onClick={() => window.location.reload()}
                >
                  <strong>ورود</strong>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;
