import axios from "axios";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import Users from "./Users";
import "./GamePage.css";

function GamePage({
  userData,
  gameKey,
  gameData,
}: {
  userData: any;
  gameKey: any;
  gameData: any;
}) {
  const [socket, setSocket] = useState<Socket>();
  const [allUsers, setAllUsers] = useState<any[]>([]);

  useEffect(() => {
    // make conneciton to Websocket server
    const newSocket = io("http://localhost:8001", {
      query: {
        username: userData.username,
        gender: userData.gender,
        gameKey: gameKey,
        capacity: gameData.capacity,
      },
    });
    setSocket(newSocket);
  }, [setSocket]);

  const usersListener = (users: any) => {
    const usersData: any[] = [];
    users.map((user: any) =>
      usersData.push({ username: user.username, gender: user.gender })
    );

    const usernames = usersData.map((user) => user.username);
    const uniqeUsers = usersData.filter(
      ({ username }, index) => !usernames.includes(username, index + 1)
    );

    if (uniqeUsers.length >= gameData.capacity) {
      if (userData.username == gameData.creator) {
        axios.post("http://localhost:3001/game/change_status", {
          // when the number of users in equal to capacity, we closed the game
          key: gameKey,
          type: "close",
        });
      }
    } else {
      axios
        .post("http://localhost:3001/game/info", { key: gameKey })
        .then((res) => {
          if (res.data.status == "close") {
            axios.post("http://localhost:3001/game/change_status", {
              key: gameKey,
              type: "open",
            });
          }
        });
    }

    setAllUsers(uniqeUsers);
  };

  useEffect(() => {
    // make listener for when user joined the game or lifted
    socket?.on(`${gameKey}`, usersListener);
    return () => {
      socket?.off(`${gameKey}`, usersListener);
    };
  }, [usersListener]);

  return (
    <main>
      <header className="game-page-header">
        <p className="start-game-txt">شروع بازی</p>
      </header>
      <Users users={allUsers} gameData={gameData} />
    </main>
  );
}

export default GamePage;
