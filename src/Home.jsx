import { useContext } from "react";
import userContext from "./userContext";
import "./Home.css";

function Home() {
  const user = useContext(userContext);
  return (
    <div className="home">
      <h1 className="main-heading">Welcome to the worlds best job board</h1>
      <h4 className="sub-heading">{user.username ? `` : "Join Today"}</h4>
      <a href={user.username ? "/jobs" : "/signup"}>
        <button className="home-button">
          {user.username ? "Find Jobs" : "Signup"}
        </button>
      </a>
    </div>
  );
}

export default Home;
