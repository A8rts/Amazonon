import axios from "axios";
import { useEffect, useState } from "react";
import Header from "@comp/layouts/Header";
import "@main/About.css";


function About() {
  const [name, setName] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/authorization", { withCredentials: true })
      .then((res) => {
        setName(res.data.username);
        if (res.data.username == "arta") {
          setAdmin(true);
        }
      })
      .catch(() => {
        window.location.href = "/";
      });
  });

  return (
    <main>
      <Header authenticated={true} admin={admin}/>
      <div className="about">
        <p className="about-txt mt-4">خب بریم ببینیم این بازی چجوریه؟؟</p>
        <div className="about-icon-box">
          <img src="../../../public/videogame.png" className="about-icon"></img>
          <img
            src="../../../public/videogame (1).png"
            className="about-icon"
          ></img>
          <img
            src="../../../public/videogame (2).png"
            className="about-icon"
          ></img>
          <img
            src="../../../public/videogame (3).png"
            className="about-icon"
          ></img>
          <img
            src="../../../public/videogame (4).png"
            className="about-icon"
          ></img>
          <img
            src="../../../public/videogame (5).png"
            className="about-icon"
          ></img>
        </div>

        <div className="about-boxes">
          <div className="about-txt-box">
            <img
              src="../../../public/videogame.png"
              className="txt-icon-about mt-2"
            ></img>

            <p className="title-about-box mt-2">
              خب چطوری بازی رو شروع کنم یا عضو بازی ای بشم؟
            </p>
            <strong className="about-des-box">
              اگر میخواهید خودتان یک بازی جدید ایجاد کنید در خانه بروید و روی
              ایجاد بازی بزنید. در آنجا اگر نیاز به راهنمایی داشتید یک دکمه
              راهنما قرار داده شده است. و اما اگر میخواهید عضو یک بازی عمومی
              شوید بروید به خانه و روی (بازی های عمومی) بزنید. لیستی برای شما می
              آید که همه ی بازی های عمومی موجود در آن وجود دارد. (توجه : اگر نوع
              بازی خود را موقعی که مخواهید بازی ایجاد کنید عمومی انتخاب کنید
              بازی شما هم در لیست بازی های عمومی قرار میگیرد! ) و البته زمانی که
              نوع بازی ای که میخواهید ایجاد کنید را خصوصی انتخاب کنید افراد فقط
              با کد الحاق بازی تان میتوانند به آن بپیوندند با استفاده از دکمه
              الحاق شدتن به بازی در خانه.
            </strong>
          </div>
          <div className="about-txt-box">
            <img
              src="../../../public/videogame (1).png"
              className="txt-icon-about mt-2"
            ></img>

            <p className="title-about-box mt-2">در باره ی بازی برام بگو؟</p>
            <strong className="about-des-box">
              خب زمانی که وارد بازی ای شدید اول لیستی از بازیکن ها را میبینید که
              در یک بازی مشابه هستند. اگر شما سازنده آن بازی باشید فقط شما
              میتوانید بازی را شروع کنید در غیر این صورت باید صبر کنید تا سازنده
              بازی بازی را شروع کند. (البته برای شروع بازی باید به ظرفیت آن بازی
              توجه کرد ظرفیت یعنی تعداد بازیکن هایی که سازنده آن بازی انتخاب
              کرده است تا زمانی که ظرفیت تکمیل نشده است بازی قابل شروع شدن نیست
              ! ) کد الحاق هم قبل از شروع شدن بازی نمایش داده میشود. میتوانید آن
              را به دوستان خود بدهید و آن ها وارد بازی شوند (سازنده بازی میتواند
              هر کس را که بخواهد از بازی بیرون بیندازد) خب ادامه مطلب را در
              پایین بخوانید
            </strong>
          </div>
          <div className="about-txt-box">
            <img
              src="../../../public/videogame (2).png"
              className="txt-icon-about mt-2"
            ></img>
            <p className="title-about-box mt-2">شروع بازی چیجوریه؟</p>
            <strong className="about-des-box">
              زمانی که سازنده اتاق بازی رو شروع میکنه یک سوال به بازیکن ها نمایش
              داده میشه (موضوع سوال از موضوع هایی که سازنده بازی هنگام ایجاد
              بازی انتخاب کرده بور تصادفی انتخاب میشه) یک شماره معکوس میشوماریم
              و بازیکن ها سوال را میخوانند. بعد که شماره معکوس تمام شد یک لیست
              برای انتخاب مهره ها نمایش داده میشه. آن مهره ها شامل (1 امتازی و 2
              و 3 امتیازی هستند) اگر کاربر 3 امتیازی انتخاب کند بدون هیج
              راهنمایی باید به سوال جواب بدهد ولی اگر 2 امتیازی بود با یک
              راهنمایی و اگر 1 امتیازی بود با 2 راهنمایی به سوال جواب میدهد. بعد
              از انتخاب مهره ها یک لیست دگر می آید که درباره ی آن در پایین
              بخوانید.
            </strong>
          </div>
          <div className="about-txt-box">
            <img
              src="../../../public/videogame (3).png"
              className="txt-icon-about mt-2"
            ></img>
            <p className="title-about-box mt-2">بعدش چی؟</p>
            <strong className="about-des-box">
              خب بعد انتخاب مهره ها یک لیستی می آید که اسم آن (لیست شرط بندی
              است) در این لیست یه کار بین بازیکن ها تقسیم میشود (شرط بندی رو
              اطلاعات یکدیگر) به صورت تصادفی یک بازیکن باید روی اطلاعات یک هم
              بازیه خودش شرط ببندد. دو تا دکه در اختیار شما است . در یک سمت دکمه
              + و در سمت دیگر دکمه - است خب مثبت یعنی اینکه شما رو جواب دادن
              درست آن کاربر به سوال نمایش شده شرط میبندید برای مثال 2 سکه شرط
              میبندید که آن کاربر جواب درست را میدهد و اما میتوانید بر جواب
              ندادن همان کاربر هم شرط ببندید. این چرخه بین همه بازیکن ها وجود
              دارد یعنی هر کس بر یک هم تیمی خودش شرط میبندد
            </strong>
          </div>
          <div className="about-txt-box">
            <img
              src="../../../public/videogame (4).png"
              className="txt-icon-about mt-2"
            ></img>
            <p className="title-about-box mt-2">بعد شرط بندی؟</p>
            <strong className="about-des-box">
              زمانی که همه ی بازیکن ها شرطشان را بستند نوبت جواب دادن به سوال
              میرسد! نسبت به مهره های انتخاب شده راهنمایی های لازم به بازیکن ها
              نمایش داده میشود. بعد یک زمان خاصی زمان جواب دادن تمام میشود. جواب
              ها چک میشوند و درست غلط ها مشخص میشود. خب اگر برای مثال شما بر سر
              یک بازیکن بر روی جواب ندادن آن شرط بستی اگر آن بازیکن درست جواب
              داده باشد به میزان سکه هایی که در شرط مشخص کردی ازت کم میشه ولی
              اگر اشتباه جواب داده باشد به آن میزان به سکه هات اضافه میشه.
            </strong>
          </div>
          <div className="about-txt-box">
            <img
              src="../../../public/videogame (5).png"
              className="txt-icon-about mt-2"
            ></img>
            <p className="title-about-box mt-2">یعنی بازی تموم شد؟</p>
            <strong className="about-des-box">
              زمانی که سود و زیان هر کس معلوم شد دوباره این چرخه شروع میشه! این
              چرخه تا زمانی ادامه پیدا میکنه که یک بازیکن به 10 سکه دست بیابد و
              بقیه بازیکن ها بازنده حساب میشوند! پس موقع شرط بندی دقت کن :)
            </strong>
          </div>
        </div>
      </div>
    </main>
  );
}

export default About;
