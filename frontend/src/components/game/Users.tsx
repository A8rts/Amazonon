import "./Users.css";

function Users({
  users,
  gameData,
}: {
  users: Array<{ username: string; gender: string }>;
  gameData: any;
}) {
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
              className="game-key-copy mb-3"
              onClick={() => navigator.clipboard.writeText(gameData.key)}
            >
              کد الحاق به بازی : {gameData.key}
            </button>
            <div className="users-box mb-3">
              <p className="count-users">تعداد بازیکنان : {users.length}</p>
              {users.map((user) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
