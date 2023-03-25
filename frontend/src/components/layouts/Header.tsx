import axios from "axios";
import { Link } from "react-router-dom";
import "@comp/layouts/Header.css";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);

function Header({
  authenticated,
  admin,
  username,
}: {
  authenticated: boolean;
  admin: boolean;
  username: string;
}) {
  const [invitesSocket, setInvitesSocket] = useState<Socket>();

  useEffect(() => {
    //create the websocket connection to get all invite game requests from others
    if (authenticated) {
      const invitesSocket = io("http://localhost:8003");
      setInvitesSocket(invitesSocket);
    }
  }, [setInvitesSocket]);

  function logOut() {
    axios
      .post("http://localhost:3001/logout", undefined, {
        withCredentials: true,
      })
      .then((res) => {
        window.location.href = "/";
      });
  }

  function inviteRequestListener(gameKey: string) {
    // get all invite request from other players
    MySwal.fire({
      title: <strong style={{ fontFamily: "Vazirmatn" }}>درخواست بازی!</strong>,
      html: (
        <p style={{ fontFamily: "Vazirmatn" }}>
          شما به بازی ای با کلید {gameKey} دعوت شده اید
        </p>
      ),
      showCancelButton: true,
      confirmButtonText: "قبوله",
      cancelButtonText: "رد کن",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      icon: "warning",
    }).then((result) => {
      result.isConfirmed ? (window.location.href = `/game/${gameKey}`) : null;
    });
  }

  useEffect(() => {
    invitesSocket?.on(`getInviteRequest${username}`, inviteRequestListener);
    return () => {
      invitesSocket?.off(`getInviteRequest${username}`, inviteRequestListener);
    };
  }, [inviteRequestListener]);

  return (
    <header className="header">
      {authenticated ? (
        <div className="authenticated-header">
          <div className="main-of-header">
            <img
              onClick={() => (window.location.href = "/home")}
              src="../../../public/book.png"
              className="header-icon animate__animated animate__jello"
            ></img>
            <div className="header-lables">
              <Link className="header-lable" to="/home">
                خانه
              </Link>
              <Link className="header-lable" to="/profile">
                پروفایل
              </Link>
              <Link className="header-lable" to="/about">
                درباره بازی
              </Link>
              <Link className="header-lable best-players" to="/bestPlayers">
                بازیکنان برتر
              </Link>
              {admin ? (
                <Link className="header-lable" to="/admin">
                  مدیریت
                </Link>
              ) : (
                <></>
              )}
              <a className="header-lable logout-btn" onClick={() => logOut()}>
                خروج
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="not-authenticated-header">
          <p>به بازی اَمزونون خوش آمدید :)</p>
        </div>
      )}
    </header>
  );
}

export default Header;
