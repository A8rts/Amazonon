import "@game/styles/InviteOnlinePlayers.css";
import axios from "axios";
import { useEffect, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);
import io, { Socket } from "socket.io-client";

function InviteOnlinePlayers({ gameKey }: { gameKey: string }) {
  const [allOnlinePlayers, setAllOnlinePlayers] = useState<any>([]);
  const [availablePlayersToInvite, setAvailablePlayersToInvite] = useState<any>(
    []
  );
  const [searchUserName, setSearchUserName] = useState("");
  const [error, setError] = useState("");
  const [invitesSocket, setInvitesSocket] = useState<Socket>();

  useEffect(() => {
    // get all online players
    axios
      .get("http://localhost:3001/users/onlinePlayers")
      .then((res) => {
        setAvailablePlayersToInvite(res.data);
        setAllOnlinePlayers(res.data);
      })
      .catch(() => alert("یه مشکلی به وجود آمده است!"));
  }, [setAvailablePlayersToInvite]);

  useEffect(() => {
    //create the websocket connection to send the invite request to others
    const invitesSocket = io("http://localhost:8003");
    setInvitesSocket(invitesSocket);
  }, [setInvitesSocket]);

  function setSearchUserNameValue(e: any) {
    setSearchUserName(e.target.value);
  }

  function searchPlayer() {
    const player: any = [];
    for (let i = 0; i < allOnlinePlayers.length; i++) {
      if (allOnlinePlayers[i].username == searchUserName) {
        player.push(allOnlinePlayers[i]);
      }
    }

    if (player.length !== 0) {
      setError("");
      setAvailablePlayersToInvite(player);
    } else {
      setError("همچین بازیکن آنلاینی با این اسم وجود ندارد!");
    }
  }

  function InvitePlayer(username: string) {
    axios
      .post("http://localhost:3001/users/getNumberOfWins", {
        username: username,
      })
      .then((res) => {
        res.data.online == true
          ? axios
              .post(
                "http://localhost:3001/invite-online-players/checkItIsFirstRequestToPlayer",
                {
                  gameKey: gameKey,
                  to_user: username,
                }
              )
              .then((res) => {
                res.data == true
                  ? axios
                      .post(
                        "http://localhost:3001/invite-online-players/create",
                        {
                          gameKey: gameKey,
                          to_user: username,
                        }
                      )
                      .then((res) => {
                        invitesSocket?.emit(
                          "sendInviteRequest",
                          gameKey,
                          username
                        );
                        MySwal.fire({
                          title: (
                            <strong style={{ fontFamily: "Vazirmatn" }}>
                              درخواست ارسال شد!
                            </strong>
                          ),
                          html: (
                            <p style={{ fontFamily: "Vazirmatn" }}>
                              درخواست شما به بازیکن {username} ارسال شد
                            </p>
                          ),
                          confirmButtonText: "باشه",
                          icon: "success",
                        });
                      })
                  : MySwal.fire({
                      title: (
                        <strong style={{ fontFamily: "Vazirmatn" }}>
                          درخواست تکراری!
                        </strong>
                      ),
                      html: (
                        <p style={{ fontFamily: "Vazirmatn" }}>
                          شما قبلا به {username} درخواست داده بودید
                        </p>
                      ),
                      confirmButtonText: "باشه",
                      icon: "warning",
                    });
              })
          : MySwal.fire({
              title: (
                <strong style={{ fontFamily: "Vazirmatn" }}>
                  {username} آفلاین شد!
                </strong>
              ),
              html: (
                <p style={{ fontFamily: "Vazirmatn" }}>
                  {username} به تازگی آفلاین شده است
                </p>
              ),
              confirmButtonText: "باشه",
              icon: "warning",
            });
      });
  }

  return (
    <div className="mb-5">
      <header className="back-to-game invite-online-players-header">
        برگرد به بازیم
      </header>

      <img
        src="../../../public/invitation.png"
        alt="دعوت"
        className="invite-icon mt-5 animate__animated animate__jello"
      ></img>

      <div className="invite-box mt-5">
        <div className="search-box">
          <input
            type="text"
            className="search-online-players-input mt-3 mb-4"
            placeholder="اسم بازیکن مورد نظر را وارد کنید"
            onChange={(e) => setSearchUserNameValue(e)}
          ></input>
          <img
            src="../../../public/recycling.png"
            className="search-btn mt-2"
            onClick={() => searchPlayer()}
          ></img>
        </div>

        <hr className="invite-hr"></hr>

        <p className="invite-to-online-players mt-3 mb-2">
          دعوت از بازیکنان آنلاین
        </p>
        <div className="online-players-box mb-4">
          {error === "" ? (
            availablePlayersToInvite.map((player: any) => (
              <div className="online-player mt-4 mb-4" key={player.username}>
                <div className="online-playerInfo">
                  {player.gender == "woman" ? (
                    <img
                      src="../../../public/woman.png"
                      alt="خانم"
                      className="online-player-icon"
                    />
                  ) : player.gender == "man" ? (
                    <img
                      src="../../../public/man.png"
                      alt="خانم"
                      className="online-player-icon"
                    />
                  ) : (
                    <></>
                  )}
                  <p className="online-player-username">{player.username}</p>

                  <button
                    className="invite-btn"
                    onClick={() => InvitePlayer(player.username)}
                  >
                    دعوت
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="any-online-player">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default InviteOnlinePlayers;
