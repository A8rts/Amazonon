import "@game/styles/Users.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

function Users({
  users,
  gameData,
  userData,
  socket,
}: {
  users: Array<{ username: string; gender: string }>;
  gameData: any;
  userData: any;
  socket: any;
}) {
  const [maxCoin, setMaxCoin] = useState<number>();
  const [isCreator, setIsCreator] = useState(false);
  const [kickStatus, setKickStatus] = useState(false);

  useEffect(() => {
    // check player is creator or no
    gameData.creator == userData.username ? setIsCreator(true) : null;

    //get max score
    axios
      .post("http://localhost:3001/game/getMaxCoin", {
        gameKey: gameData.key,
      })
      .then((res) => {
        setMaxCoin(res.data);
      });
  });

  function kickPlayer(username: string) {
    MySwal.fire({
      title: (
        <strong style={{ fontFamily: "Vazirmatn" }}>
          {username} رو بیرون بندازیم؟
        </strong>
      ),
      html: (
        <p style={{ fontFamily: "Vazirmatn" }}>
          مطمئنید میخواهید {username} رو بیرون بندازین
        </p>
      ),
      confirmButtonText: "بلی",
      icon: "question",
    }).then((value) => {
      if (value.isConfirmed) {
        socket?.emit("kickPlayer", { username: username });
      }
    });
  }

  const kickOutPlayer = () => {
    window.location.href = "/home"; // go to home when creator kicked me
  };

  useEffect(() => {
    socket?.on(`kick${userData.username}`, kickOutPlayer);
    return () => {
      socket?.off(`kick${userData.username}`, kickOutPlayer);
    };
  }, [kickOutPlayer]);

  return (
    <div>
      <div className="users mb-5">
        <div className="users-icon-box">
          <img
            src="../../../public/log-in.png"
            className="users-icon-png"
          ></img>
        </div>
        <div className="users-content-box">
          <div className="users-content">
            <p className="users-txt">بازیکن های این بازی</p>
            <button
              className="game-key-copy "
              onClick={() => navigator.clipboard.writeText(gameData.key)}
            >
              کد الحاق به بازی : {gameData.key}
            </button>

            <p className="max-coin-txt">به {maxCoin} سکه برسی برنده ای </p>

            <div className="users-box mb-3">
              <p className="count-users">تعداد بازیکنان : {users.length}</p>
              {users.map((user) =>
                isCreator ? (
                  user.username !== gameData.creator ? (
                    <div
                      className="user-data mb-4 mt-3 can-kick"
                      key={user.username}
                      onClick={() => kickPlayer(user.username)}
                      onMouseEnter={() => setKickStatus(true)}
                      onMouseLeave={() => setKickStatus(false)}
                    >
                      <p className="user-name">{user.username}</p>
                      <div className="user-icon">
                        {kickStatus ? (
                          <img
                            src="../../../public/kick.png"
                            className="man-user-icon"
                          ></img>
                        ) : user.username == gameData.creator ? (
                          <img
                            src="../../../public/crown.png"
                            className="man-user-icon"
                          ></img>
                        ) : user.gender == "man" ? (
                          <img
                            src="../../../public/man.png"
                            className="man-user-icon"
                          ></img>
                        ) : (
                          <img
                            src="../../../public/woman.png"
                            className="man-user-icon"
                          ></img>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="user-data mb-4 mt-3 can-kick"
                      key={user.username}
                    >
                      <p className="user-name">{user.username}</p>
                      <div className="user-icon">
                        <img
                          src="../../../public/crown.png"
                          className="man-user-icon"
                        ></img>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="user-data mb-4 mt-3" key={user.username}>
                    <p className="user-name">{user.username}</p>
                    <div className="user-icon">
                      {user.username == gameData.creator ? (
                        <img
                          src="../../../public/crown.png"
                          className="man-user-icon"
                        ></img>
                      ) : user.gender == "man" ? (
                        <img
                          src="../../../public/man.png"
                          className="man-user-icon"
                        ></img>
                      ) : (
                        <img
                          src="../../../public/woman.png"
                          className="man-user-icon"
                        ></img>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
