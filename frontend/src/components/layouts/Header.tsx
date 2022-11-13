import axios from "axios";
import { Link } from "react-router-dom";
import "./Header.css";

function Header({ authenticated }: { authenticated: boolean }) {
  function logOut() {
    axios
      .post("http://localhost:3001/logout", undefined, {
        withCredentials: true,
      })
      .then((res) => {
        window.location.href = "/";
      });
  }

  return (
    <header className="header">
      {authenticated ? (
        <div className="authenticated-header">
          <div className="main-of-header">
            <img src="../../../public/book.png" className="header-icon animate__animated animate__jello"></img>
            <div className="header-lables">
              <Link className="header-lable" to="/home">
                خانه
              </Link>
              <Link className="header-lable" to="/profile">
                پروفایل
              </Link>
              <Link className="header-lable" to="/about">
                درباره
              </Link>
              <a className="header-lable logout-btn" onClick={() => logOut()}>
                خروج
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="not-authenticated-header">
          <p>به بازی آمازونوم خوش آمدید :)</p>
        </div>
      )}
    </header>
  );
}

export default Header;
