import axios from "axios";
import { useEffect, useState } from "react";
import "./Betting.css";

function Betting({
  users,
  gameKey,
  userData,
  gameData,
  socket,
}: {
  users: any;
  gameKey: string;
  userData: any;
  gameData: any;
  socket: any;
}) {
  const [betting, setBetting] = useState<
    Array<{ username: string; to_player: string; id: number }>
  >([]);

  const [myBet, setMyBet] = useState<Array<{ to_player: string }>>([]);
  const [coin, setCoin] = useState(1);
  const [mark, setMark] = useState("+");

  let sended = 0;

  useEffect(() => {
    axios
      .post("http://localhost:3001/game/checkBettingCreated", {
        gameKey: gameKey,
      })
      .then((res) => {
        if (
          userData.username == gameData.creator &&
          res.data == false &&
          sended == 0
        ) {
          const names: any = [];
          for (let i = 0; i < users.length; i++) {
            names.push(users[i].username);
          }

          const bet_list = betting_list_maker(move_up(names));
          axios
            .post("http://localhost:3001/game/saveBettings", {
              betting_list: bet_list,
              gameKey: gameKey,
            })
            .then((res) => {
              socket.emit("getBettingList", { bet_list: res.data });
            });

          sended++;
        } else if (res.data == true) {
          axios
            .post("http://localhost:3001/game/getBettingList", {
              gameKey: gameKey,
            })
            .then((res) => {
              sort_betting_list(res.data);
            });
        }
      });
  }, []);

  function sort_betting_list(bet_list: any) {
    //move to first element in bet_list who the player is going to bet on that
    const my_bet: any = [];

    bet_list.map((bet: any) => {
      bet.username == userData.username ? my_bet.push(bet) : <></>;
    });

    bet_list = bet_list.filter(
      (bet: any) => bet.username !== userData.username
    );
    bet_list.unshift(my_bet[0]);

    setBetting(bet_list);
    setMyBet(my_bet[0]);
  }

  function get_random(arr: any) {
    // get random element of array
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function move_up(names: any) {
    //to change all elements place in array
    const len_names = names.length;
    const new_names = [];

    for (let i = 0; i < len_names; i++) {
      let rand_name = get_random(names);
      new_names.push(rand_name);

      names = names.filter((name: string) => name !== rand_name);
    }

    return new_names;
  }

  function betting_list_maker(users_names: any) {
    //make betting list to use
    const betting_list = [];

    for (let i = 0; i < users_names.length; i++) {
      if (users_names[i] == users_names.slice(-1)) {
        betting_list.push({ name: users_names[i], to: users_names[0] });
      } else {
        betting_list.push({ name: users_names[i], to: users_names[i + 1] });
      }
    }

    return betting_list;
  }

  const showBettingListListener = (bet_list: any) => {
    sort_betting_list(bet_list);
  };

  useEffect(() => {
    socket.on("showBettingList", showBettingListListener);
    return () => {
      socket.off("showBettingList", showBettingListListener);
    };
  }, [showBettingListListener]);

  function saveCoin(type: string) {
    if (type == "add") {
      setCoin(coin + 1);
      if (coin + 1 == 0) {
        setCoin(1);
        setMark("+");
      }
      if (coin + 1 > 0) {
        setMark("+");
      }
    } else if (type == "remove") {
      setCoin(coin - 1);
      if (coin - 1 == 0) {
        setCoin(-1);
        setMark("");
      }
      if (coin - 1 < 0) {
        setMark("");
      }
    }
  }

  return (
    <div className="betting mb-5">
      <img
        src="../../../public/5175256.png"
        className="first-betting-icon mt-3 animate__animated animate__jello hide-bet"
      />

      <div className="bet-main mt-4">
        <div className="bet-icon-box">
          <img
            src="../../../public/5175214.png"
            className="bet-icon animate__animated"
          />
        </div>

        <div className="bet-icon-box-2">
          <img
            src="../../../public/5175251.png"
            className="bet-icon-2 animate__animated"
          />
        </div>

        <div className="betting-box">
          <p className="betting-box-txt">وقت شرط بندی شد!</p>
          <p className="to-player-txt mb-3">
            شما باید روی {myBet.to_player} شرط بندی کنید
          </p>

          <div className="bet-players-box mb-4">
            <img
              src="../../../public/5175214.png"
              className="bet-icon-mobiles"
            />

            {betting.map((bet) =>
              bet.to_player == myBet.to_player ? (
                <div className="king-player-bet mt-4 mb-4" key={bet.id}>
                  <div className="player-bet">
                    <button
                      className="bet-coin coin-bet-icon-add"
                      onClick={() => saveCoin("add")}
                    >
                      +
                    </button>

                    <p className="player-name">{bet.to_player}</p>
                    <button
                      className="bet-coin coin-bet-icon-remove"
                      onClick={() => saveCoin("remove")}
                    >
                      -
                    </button>
                  </div>
                  <div className="bet-coin-sec mt-2">
                    <p className="count-coin-bet mt-4">
                      {mark}
                      {coin} :{" "}
                    </p>
                    <img
                      src="../../../public/coin.png"
                      className="coin-ic"
                    ></img>
                  </div>
                </div>
              ) : (
                <div
                  className="player-bet mt-4 mb-4 disable-player-bet"
                  key={bet.id}
                >
                  <p className="bet-coin coin-bet-icon-add disable-coin">+</p>
                  <p className="player-name disable-name">{bet.to_player}</p>
                  <p className="bet-coin coin-bet-icon-remove disable-coin">
                    -
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Betting;
