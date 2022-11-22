import axios from "axios";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

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
        gameKey: gameKey,
        capacity: gameData.capacity,
      },
    });
    setSocket(newSocket);
  }, [setSocket]);

  const usersListener = (users: any) => {
    const usersNames: any[] = [];
    users.map((user: any) => usersNames.push(user.username));
    const uniqeUsers = [...new Set(usersNames)];

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
      <div>
        <h1>This is GamePage</h1>
        {allUsers.map((username) => (
          <strong
            style={{ margin: "1rem", background: "orange" }}
            key={username}
          >
            {username}
          </strong>
        ))}
      </div>
    </main>
  );
}

export default GamePage;
