import Beads from "./Beads";

function Start({
  beads,
  showingQuesiton,
}: {
  beads: boolean;
  showingQuesiton: boolean;
}) {
  return (
    <main>
      {showingQuesiton ? (
        <></>
      ) : beads ? (
        <Beads />
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
      )}
    </main>
  );
}

export default Start;
