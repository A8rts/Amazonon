import axios from "axios";
import { useEffect, useState } from "react";
import Header from "@comp/layouts/Header";
import "@main/Profile.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Friends from "@main/Friends";

//register the chartjs to the component
ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.font.family = "Vazirmatn";

function Profile({
  chartCorrectAnswersData,
  getCorrectAnswersData,
}: {
  chartCorrectAnswersData: any;
  getCorrectAnswersData: any;
}) {
  const [userInfo, setUserInfo] = useState({
    username: "",
    phonenumber: "",
    gender: "",
    number_of_wins: 0,
    score: "",
    level: 0,
    online: true,
  });
  const [admin, setAdmin] = useState(false);
  const [emptyScore, setEmptyScore] = useState(false);
  const [showYourFriends, setShowYourFriends] = useState(false);

  useEffect(() => {
    // check user is authenticated then get the player informtaion
    axios
      .get("http://localhost:3001/authorization", { withCredentials: true })
      .then((res) => {
        const name = res.data.username;
        res.data.type == "admin" ? setAdmin(true) : null;

        getCorrectAnswersData(); // this func is in the Game.tsx
        axios
          .post("http://localhost:3001/users/getNumberOfWins", {
            username: name,
          })
          .then((res) => {
            res.data.score == 0 ? setEmptyScore(true) : null;

            if (res.data.gender == "man") {
              res.data.gender = "آقا";
            } else if (res.data.gender == "woman") {
              res.data.gender = "خانم";
            }

            setUserInfo(res.data);
          });
      })
      .catch(() => {
        window.location.href = "/";
      });
  }, []);

  // create the chart
  const chartData = {
    labels: ["سینما", "غذا", "مذهبی", "تاریخ", "طبیعت", "ورزش"],
    datasets: [
      {
        label: "تعداد پاسخ های درست",
        data: chartCorrectAnswersData,
        backgroundColor: [
          "#2c3e50",
          "#e74c3c",
          "#16a085",
          "#8e44ad",
          "#2ecc71",
          "#e67e22",
        ],
        borderColor: [
          "#1F2B38",
          "#B83C30",
          "#12826C",
          "#71368A",
          "#27AB5F",
          "#CC701E",
        ],
        borderWidth: 1,
        family: "Vazirmatn",
      },
    ],
  };

  return (
    <main className="mb-4">
      <Header authenticated={true} admin={admin} />

      {showYourFriends ? (
        <Friends />
      ) : (
        <div>
          {userInfo.gender == "آقا" ? (
            <img
              src="../../../public/man.png"
              alt="man"
              className="profile-icon mt-3"
            />
          ) : userInfo.gender == "خانم" ? (
            <img
              src="../../../public/woman.png"
              alt="woman"
              className="profile-icon mt-3"
            />
          ) : (
            <></>
          )}

          <p className="online mt-2">آنلاین</p>

          <button
            className="your-friends"
            onClick={() => setShowYourFriends(true)}
          >
            دوستان شما
          </button>

          <div className="profile-box mt-3">
            <p className="your-profile-txt mb-3">پروفایل شما</p>

            <div className="profile-content">
              <p className="profile-data">اسمتون : {userInfo.username}</p>
              <p className="profile-data">شمارتون : {userInfo.phonenumber}</p>
              <p className="profile-data">جنسیت : {userInfo.gender}</p>
            </div>

            <hr className="profile-hr" />
            {userInfo.level > 25 ? (
              <p className="level-circle-top">سطح {userInfo.level} </p>
            ) : (
              <p className="level-circle">سطح {userInfo.level} </p>
            )}
            <img
              src="../../../public/level-up.png"
              alt="level-up"
              className="level-icon"
            ></img>
            <p className="your-score mt-3 mb-3">
              امتیاز شما : {userInfo.score}
            </p>

            <strong className="about-score-txt">
              اگر پاسختان در بازی به سوال درست باشد به میزان امتیازه مهره ای که
              انتخاب کردید به شما امتیاز اضافه میشود
            </strong>
            <strong className="about-score-txt mb-4">
              هر 10 امتیاز موجب اضافه شدن یک سطح به شما میشود
            </strong>

            <hr className="profile-hr" />
            <p className="chart-txt mt-2">
              نمودار درستی جوابتان به دسته بندی سوالات
            </p>
            <strong className="about-chart-txt mt-2 mb-3">
              در نمودار زیر تعداد درست جواب دادن شما به سوالات هر دسته بندی ای
              نمایش داده میشود. این نمودار بر اساس پاسخ های شما طبقه بندی شده
              است.
            </strong>

            {emptyScore ? (
              <p className="empty-score mb-4">
                شما تا حالا هیچ جواب درستی نداشته اید!
              </p>
            ) : (
              <div className="chart mb-3">
                <Doughnut data={chartData} />
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default Profile;
