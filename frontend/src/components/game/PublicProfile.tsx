import axios from "axios";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "@game/styles/PublicProfile.css";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);

function PublicProfile({
  username,
  showUserPublicProfile,
  myUserName,
}: {
  username: string;
  showUserPublicProfile: any;
  myUserName: string;
}) {
  const [userProfileData, setUserProfileData] = useState({
    username: "",
    phonenumber: "",
    gender: "",
    level: 0,
    score: 0,
    correct_answers_for_categories: "",
    online: false,
  });
  const [emptyScore, setEmptyScore] = useState(false);

  ChartJS.register(ArcElement, Tooltip, Legend);
  ChartJS.defaults.font.family = "Vazirmatn";

  useEffect(() => {
    axios
      .post("http://localhost:3001/users/getNumberOfWins", {
        username: username,
      })
      .then((res) => {
        if (res.data.gender == "man") {
          res.data.gender = "آقا";
        } else if (res.data.gender == "woman") {
          res.data.gender = "خانم";
        }
        res.data.score == 0 ? setEmptyScore(true) : null;

        setUserProfileData(res.data);
      })
      .catch(() => {
        alert("خطا! لطفا دوباره تلاش کنید یه مشکلی پی امده");
      });

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  const chartData = {
    labels: ["سینما", "غذا", "مذهبی", "تاریخ", "طبیعت", "ورزش"],
    datasets: [
      {
        label: "تعداد پاسخ های درست",
        data: userProfileData.correct_answers_for_categories,
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
    <main className="mb-4 animate__animated animate__fadeIn">
      <header
        className="back-to-game"
        onClick={() => showUserPublicProfile(userProfileData.username, false)}
      >
        برگشت به بازی
      </header>

      <div>
        {userProfileData.gender == "آقا" ? (
          <img
            src="../../../public/man.png"
            alt="man"
            className="profile-icon mt-3"
          />
        ) : userProfileData.gender == "خانم" ? (
          <img
            src="../../../public/woman.png"
            alt="woman"
            className="profile-icon mt-3"
          />
        ) : (
          <></>
        )}

        {userProfileData.online ? (
          <div>
            <p className="online">آنلاین</p>
          </div>
        ) : (
          <p className="offline">آفلاین</p>
        )}

        <div className="profile-box mt-3">
          <p className="your-profile-txt mb-3">
            پروفایل {userProfileData.username}
          </p>

          <div className="profile-content">
            <p className="profile-data p-d">اسم : {userProfileData.username}</p>
            <p className="profile-data p-d">جنسیت : {userProfileData.gender}</p>
          </div>

          <hr className="profile-hr" />
          {userProfileData.level > 25 ? (
            <p className="level-circle-top">سطح {userProfileData.level} </p>
          ) : (
            <p className="level-circle">سطح {userProfileData.level} </p>
          )}
          <img
            src="../../../public/level-up.png"
            alt="level-up"
            className="level-icon"
          ></img>
          <p className="your-score mt-3 mb-3">
            امتیاز {userProfileData.username} : {userProfileData.score}
          </p>

          <strong className="about-score-txt">
            اگر پاسخ بازیکن در بازی به سوال درست باشد به میزان امتیازه مهره ای
            که انتخاب کرده به بازیکن امتیاز اضافه میشود
          </strong>
          <strong className="about-score-txt mb-4">
            هر 10 امتیاز موجب اضافه شدن یک سطح به بازیکن میشود
          </strong>

          <hr className="profile-hr" />
          <p className="chart-txt mt-2">
            نمودار درستی جواب های {userProfileData.username} به دسته بندی سوالات
          </p>
          <strong className="about-chart-txt mt-2 mb-3">
            در نمودار زیر تعداد درست جواب دادن های {userProfileData.username} به
            سوالات هر دسته بندی ای نمایش داده میشود. این نمودار بر اساس پاسخ های{" "}
            {userProfileData.username} طبقه بندی شده است.
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
    </main>
  );
}

export default PublicProfile;
