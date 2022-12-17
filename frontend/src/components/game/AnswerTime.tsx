import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
import "./AnswerTime.css";

function AnswerTime() {
  return (
    <div>
      <div className="answer-time">
        <img
          src="../../../public/9028942.png"
          className="answer-question-icon mt-4"
        ></img>
        <div className="answer-box mt-4">
          <p className="answer-txt">جواب رو بنویس!</p>
          <div className="q-box mb-4">
            سوال : کوچکترین سوره قرآن چه نام دارد؟
          </div>
          <div className="guidance-box mb-4">
            <p className="guidance-txt">راهنمایی ها</p>
            <ul className="guidances">
              <li>اسم بعضی از میدان های ایران هم هست</li>
              <li className="mt-2">اسم سوره اسم یک بیمه هم است</li>
            </ul>
          </div>
          <input
            className="answer-input mb-4"
            type="text"
            placeholder="جوابو بنویس :"
          ></input>
        </div>
      </div>
    </div>
  );
}

export default AnswerTime;
