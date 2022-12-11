import axios from "axios";
import { useEffect } from "react";
import "./Betting.css";

function Betting({
  users,
  gameKey,
  userData,
  gameData,
}: {
  users: any;
  gameKey: string;
  userData: any;
  gameData: any;
}) {
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
          axios.post("http://localhost:3001/game/saveBettings", {
            betting_list: bet_list,
            gameKey: gameKey,
          });

          sended++;
        }
      });
  }, []);

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
          <div className="bet-players-box mb-4">
            <img
              src="../../../public/5175214.png"
              className="bet-icon-mobiles"
            />

            <div className="player-bet mt-4 mb-4">
              <p className="bet-coin coin-bet-icon-add">+</p>
              <p className="player-name ">آرتا</p>
              <p className="bet-coin coin-bet-icon-remove">-</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Betting;
