import axios from "axios";
import { useEffect, useState } from "react";
import Header from "@comp/layouts/Header";
import "@main/Admin.css";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);

function Admin() {
  const [name, setName] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/authorization", { withCredentials: true })
      .then((res) => {
        setName(res.data.username);
        if (res.data.username == "arta") {
          setAdmin(true);
        } else {
          window.location.href = "/home"; // if user is not admin back to the home page
        }
      })
      .catch(() => {
        window.location.href = "/";
      });
  });

  function sendQuestion(e: any) {
    e.preventDefault();

    axios
      .post("http://localhost:3001/questions/addQuestion", {
        subject: e.target.subject.value,
        question: e.target.question.value,
        guide1: e.target.guide1.value,
        guide2: e.target.guide2.value,
        answer: e.target.answer.value,
      })
      .then(() => {
        MySwal.fire({
          title: <strong style={{ fontFamily: "Vazirmatn" }}>ثبت شد</strong>,
          html: (
            <p style={{ fontFamily: "Vazirmatn", fontSize: "1rem" }}>
              سوال شما ثبت شد :)
            </p>
          ),
          icon: "success",
          confirmButtonText: "باشه",
        }).then(() => {
          window.location.href = "/home";
        });
      });
  }

  return (
    <>
      {admin ? (
        <main>
          <Header authenticated={true} admin={admin} />
          <div>
            <p className="hello-admin mt-4">سلام مدیر :)</p>
            <form onSubmit={(e) => sendQuestion(e)}>
              <div className="admin-panel mt-4 mb-5">
                <p className="add-question-txt">سوال اضافه کنید</p>
                <div className="add-question-box mt-3 mb-3">
                  <input
                    name="subject"
                    className="add-question-inp mt-3 mb-3"
                    placeholder="موضوع سوال"
                    required
                  ></input>
                  <input
                    name="question"
                    className="add-question-inp mt-3 mb-3"
                    placeholder="خود سوال"
                    required
                  ></input>
                  <input
                    name="guide1"
                    className="add-question-inp mt-3 mb-3"
                    placeholder="راهنمایی 1"
                    required
                  ></input>
                  <input
                    name="guide2"
                    className="add-question-inp mt-3 mb-3"
                    placeholder="راهنمایی 2"
                    required
                  ></input>
                  <input
                    name="answer"
                    className="add-question-inp mt-3 mb-3"
                    placeholder="جواب"
                    required
                  ></input>
                </div>
                <button className="send-question mt-4" type="submit">
                  ثبت سوال
                </button>
                ّ
              </div>
            </form>
          </div>
        </main>
      ) : (
        <></>
      )}
    </>
  );
}

export default Admin;
