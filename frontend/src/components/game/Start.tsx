import { useEffect, useState } from "react";
import Beads from "./Beads";
import Betting from "./Betting";

function Start({
  beads,
  showingQuesiton,
  gameKey,
  userData,
  socket,
  gameData,
  allUsers,
}: {
  beads: boolean;
  showingQuesiton: boolean;
  gameKey: string;
  userData: any;
  socket: any;
  gameData: any;
  allUsers: any;
}) {
  const [betting, setBetting] = useState(false);

  function changeBetting() {
    setBetting(true);
  }

  useEffect(() => {
    // for if betting section is true we show that
    if (gameData.betting) {
      setBetting(true);
    }
  });

  return (
    <main>
      {allUsers.length > 0 ? (
        showingQuesiton ? (
          <></>
        ) : betting ? (
          <Betting
            users={allUsers}
            gameKey={gameKey}
            userData={userData}
            gameData={gameData}
          />
        ) : beads ? (
          <Beads
            gameKey={gameKey}
            userData={userData}
            socket={socket}
            gameData={gameData}
            changeBetting={changeBetting}
          />
        ) : (
          <div
            className="reloaded_status"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Lalezar Regular",
              fontSize: "2rem",
              textAlign: "center",
            }}
          >
            <p>
              نباید صفحه رو رفرش میکردین! چند ثانیه صبر کنید و صفحه رو مجدد رفرش
              کنید! اگر زمان نمایش سوال تمام شده باشد به بازی برخواهید گشت
            </p>
          </div>
        )
      ) : (
        <></>
      )}
    </main>
  );
}

export default Start;
