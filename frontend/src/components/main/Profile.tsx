import axios from "axios";
import { useEffect, useState } from "react";
import Header from "@comp/layouts/Header";
import "@main/Profile.css";

function Profile() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    phonenumber: "",
    gender: "",
  });
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3001/authorization", { withCredentials: true })
      .then((res) => {
        if (res.data.gender === "man") {
          res.data.gender = "آقا";
        } else if (res.data.gender === "woman") {
          res.data.gender = "خانم";
        }
        setUserInfo(res.data);
        if (res.data.type == "admin") {
          setAdmin(true);
        }
      })
      .catch(() => {
        window.location.href = "/";
      });
  });

  return (
    <main className="mb-4">
      <Header authenticated={true} admin={admin} />
      <div className="profile">
        <img
          src="../../public/profile.png"
          className="profile-icon mt-4 animate__animated animate__jackInTheBox"
        ></img>
        <div className="profile-box mt-4">
          <div className="profile-content">
            <p className="profile-txt">پروفایل شما</p>
            <p className="profile-data">اسم : {userInfo.username}</p>
            <p className="profile-data">شماره : {userInfo.phonenumber}</p>
            <p className="profile-data">جنسیت : {userInfo.gender}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
