import Header from "@comp/layouts/Header";
import "@main/BestPlayers.css";
import axios from "axios";
import { useEffect, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);
import PublicProfile from "@game/PublicProfile";

function BestPlayers() {
  const [admin, setAdmin] = useState(false);
  const [bestPlayers, setBestPlayers] = useState<any>([]);
  const [threeFirstPlayers, setThreeFirstPlayers] = useState<any>([]);
  const [userData, setUserData] = useState({
    username: "",
    gender: "",
    number_of_wins: "",
  });
  const [userPublicProfile, setUserPublicProfile] = useState(false);
  const [publicProfilesUsername, setPublicProfilesUsername] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/authorization", { withCredentials: true })
      .then((res) => {
        setUserData(res.data);
      });

    //check user is authenticated or not
    axios
      .get("http://localhost:3001/authorization", { withCredentials: true })
      .then((res) => {
        if (res.data.type == "admin") {
          setAdmin(true);
        }
      })
      .catch(() => {
        window.location.href = "/";
      });

    // to get all users informations
    axios.get("http://localhost:3001/users/getAll").then((res) => {
      const users = res.data;

      sortByWins(users);
    });
  }, []);

  function sortByWins(users: any) {
    // to sort users by number of wins
    users.sort((a: any, b: any) =>
      a.number_of_wins > b.number_of_wins ? 1 : -1
    );
    users.reverse();

    users.map((user: any) => {
      delete user.phonenumber;
      delete user.type;
      delete user.id;
    });

    let limitedUsers = [];
    let i = 0;

    while (i < 10) {
      if (users[i] == undefined) {
        break;
      }

      const winner = {
        username: users[i].username,
        number_of_wins: users[i].number_of_wins,
        gender: users[i].gender,
        num: i + 1,
      };

      limitedUsers.push(winner);

      i++;
    }

    if (limitedUsers.length >= 3) {
      const threePlayers = [limitedUsers[0], limitedUsers[1], limitedUsers[2]];

      setThreeFirstPlayers(threePlayers);
    } else {
      let allBestPlayers = [];

      limitedUsers.length == 2
        ? allBestPlayers.push(limitedUsers[0], limitedUsers[1])
        : limitedUsers.length == 1
        ? allBestPlayers.push(limitedUsers[0], limitedUsers[1])
        : null;

      setThreeFirstPlayers(allBestPlayers);
    }

    setBestPlayers(limitedUsers);
  }

  function showAboutMe() {
    axios
      .post("http://localhost:3001/users/getNumberOfWins", {
        username: userData.username,
      })
      .then((res) => {
        MySwal.fire({
          title: (
            <strong style={{ fontFamily: "Vazirmatn" }}>
              {userData.username} عزیز
            </strong>
          ),
          html: (
            <p style={{ fontFamily: "Vazirmatn" }}>
              شما {res.data.number_of_wins} بار در بازی ها برنده شده اید!
            </p>
          ),
          confirmButtonText: "باشه",
          background: "#8e44ad",
          color: "white",
          showClass: {
            popup: "animate__animated animate__bounceIn",
          },
          hideClass: {
            popup: "animate__animated animate__bounceOut",
          },
          confirmButtonColor: "#27ae60",
        });
      })
      .catch((err) => console.log(err));
  }

  function showUserPublicProfile(username: string, show: boolean) {
    // to show the best player public profile
    show
      ? (setPublicProfilesUsername(username), setUserPublicProfile(true))
      : setUserPublicProfile(false);
  }

  return (
    <main>
      {userPublicProfile ? (
        <PublicProfile
          showUserPublicProfile={showUserPublicProfile}
          username={publicProfilesUsername}
        />
      ) : (
        <div>
          <Header authenticated={true} admin={admin} />

          <div className="best-players-div mb-5">
            <strong className="best-players-game mt-4">
              (( 10 تا از بهترین بازیکنان این بازی ))
            </strong>

            <img
              src="../../../public/trophy.png"
              alt="cup"
              className="cup animate__animated animate__bounce"
            />

            <div className="best-players-box mt-4">
              <div className="about-me mb-5" onClick={() => showAboutMe()}>
                وضع من چطوره؟
              </div>

              {bestPlayers.map((player: any) => (
                <div
                  className="best-player-info mb-5"
                  key={player.username}
                  onClick={() => showUserPublicProfile(player.username, true)}
                >
                  <strong className="count-of-best-players">
                    {player.num}
                  </strong>
                  {player.username == threeFirstPlayers[0].username ||
                  player.username == threeFirstPlayers[1].username ||
                  player.username == threeFirstPlayers[2].username ? (
                    <img
                      src="../../../public/medal.png"
                      alt="badge"
                      className="medal"
                    />
                  ) : (
                    <></>
                  )}

                  <strong
                    className="name-best-player mt-2"
                    onClick={() => showUserPublicProfile(player.username, true)}
                  >
                    {player.username}
                  </strong>

                  <div className="number_of_wins_player mt-2 mb-2">
                    <p className="mt-3">
                      این بازیکن {player.number_of_wins} بار در بازی ها برده است
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default BestPlayers;
