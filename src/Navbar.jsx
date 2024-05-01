import userContext from "./userContext";
import { useContext } from "react";
import "./Navbar.css";
function NavBar({ logOut }) {
  const user = useContext(userContext);
  const items = ["Companies", "Jobs"];
  return (
    <nav className="nav-main">
      <h2 className="nav-item">Job Board</h2>
      {user.username ? (
        <div className="nav-links">
          {items.map((val, idx) => (
            <a className="nav-item" href={`/${val.toLowerCase()}`} key={idx}>
              {val}
            </a>
          ))}
          <a className="nav-item" href="/profile" key={items.length}>
            Profile
          </a>
          <a
            className="nav-item"
            href={"/"}
            onClick={logOut}
            key={items.length + 1}
          >
            Log Out ({user.firstName})
          </a>
        </div>
      ) : (
        <div className="nav-links">
          <a className="nav-item" href="/login" key={items.length}>
            Log In
          </a>
          <a className="nav-item" href="/signup" key={items.length + 5}>
            Sign Up
          </a>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
