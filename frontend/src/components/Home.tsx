import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./layouts/Header";

function Home() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/authorization", { withCredentials: true })
      .then(() => {
        setShow(true);
      })
      .catch(() => {
        window.location.href = "/";
      });
  });

  return (
    <main className="home">
      <Header authenticated={true} />
    </main>
  );
}

export default Home;
