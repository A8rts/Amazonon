import "./Register.css";
import "animate.css";

function Register() {
  return (
    <div className="register-main mt-5">
      <div>
        <img
          src="../../../public/register.png"
          className="register-icon animate__animated animate__jackInTheBox"
        ></img>

        <div className="register">
          <div className="register-from mt-3">
            <p className="register-txt">فرم ثبت نام</p>

            <div className="user-info-register">
              <div className="phone-register mb-4 mt-2">
                <strong className="phone-txt-register">شمارتون</strong>
                <input type="number" className="phone-number-input" />
              </div>
              <div className="name-register mb-4 mt-2">
                <strong className="name-txt-register">اسمتون</strong>
                <input type="text" className="name-input" />
              </div>
            </div>

            <div className="user-gender">
              <div className="man-gender">
                <input
                  type="radio"
                  id="man"
                  name="gender"
                  value="man"
                  className="gender-input"
                />
                <label htmlFor="man">آقا</label>
              </div>

              <div className="woman-gender">
                <input
                  type="radio"
                  id="woman"
                  name="gender"
                  value="woman"
                  className="gender-input"
                />
                <label htmlFor="woman">خانم</label>
              </div>
            </div>

            <button className="register-btn">
              <strong>ثبت نام</strong>
            </button>
            <button
              className="login-btn"
              onClick={() => window.location.reload()}
            >
              <strong>ورود</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
