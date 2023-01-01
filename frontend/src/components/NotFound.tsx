import "@comp/NotFound.css";

function NotFound() {
  return (
    <div>
      <img
        src="../../public/404.png"
        className="notfound-icon mt-3 animate__animated animate__jello"
      ></img>
      <p className="notfound-txt mt-3">
        این جا کجاست؟؟؟ راهتو گم کردی! همچین صفحه ای وجو ندارد! برو به{" "}
        <a href="/home" className="hide-link">
          خانه
        </a>
      </p>
      <a href="/home" className="home-link-go">
        خانه
      </a>
      <strong className="notnot">404</strong>
    </div>
  );
}

export default NotFound;
