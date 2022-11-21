import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

function GamePage({ userData, gameKey }: { userData: any; gameKey: any }) {
  const [socket, setSocket] = useState<Socket>();
  const [allUsers, setAllUsers] = useState<any[]>([]);

  useEffect(() => {
    // make conneciton to Websocket server
    const newSocket = io("http://localhost:8001", {
      query: {
        username: userData.username,
        gameKey: gameKey,
      },
    });
    setSocket(newSocket);
  }, [setSocket]);

  const usersListener = (users: any) => {
    // save users names
    const usersNames: any[] = [];
    users.map((user: any) => usersNames.push(user.username));

    const uniqeUsers = [...new Set(usersNames)];
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
