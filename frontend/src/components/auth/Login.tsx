import { useState } from "react";
import Header from "../layouts/Header";
import "./Login.css";
import Register from "./Register";
import "animate.css";

function Login() {
  const [register, setRegister] = useState(false);

  return (
    <main>
      <Header authenticated={false} />
      {register ? (
        <Register />
      ) : (
        <div className="login-main mt-5">
          <img
            src="../../../public/login.png"
            className="login-icon animate__animated animate__jackInTheBox"
          ></img>

          <div className="login">
            <div className="login-from mt-5">
              <p className="login-txt">فرم ورود</p>
              <div className="phone-login mb-4 mt-2">
                <strong className="phone-txt-login">شمارتون</strong>
                <input type="number" className="phone-number-input" />
              </div>
              <button className="login-btn">
                <strong>ورود</strong>
              </button>
              <button
                className="register-btn"
                onClick={() => setRegister(true)}
              >
                <strong>ثبت نام</strong>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Login;
