import "./App.css";
import { Route, Routes, useNavigate, redirect } from "react-router-dom";
import Home from "./Home";
import CompanyList from "./CompanyList";
import LogInForm from "./LoginForm";
import ProfileForm from "./ProfileForm";
import SignUpForm from "./SignupForm";
import JobList from "./JobList";
import NavBar from "./Navbar";
import CompanyDetail from "./CompanyDetail";
import { useEffect, useState } from "react";
import userContext from "./userContext";
import JoblyApi from "./Api";
import useLocalStorage from "./useLocalStorage";

function App() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [setLocaleStorage, getLocaleStorage] = useLocalStorage();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function getCurrUser(token) {
      JoblyApi.token = token;
      const curr_user = await JoblyApi.getUser(token);
      setToken(token);
      setUser(curr_user);
      setLocaleStorage({ token: token });
      setLoading(false);
    }
    const { token: storedToken } = getLocaleStorage();

    storedToken ? getCurrUser(storedToken) : getCurrUser(token);
  }, [token]);

  async function logIn(formData) {
    try {
      const new_token = await JoblyApi.logIn(formData);
      setToken(new_token);
      navigate("/");
    } catch (e) {
      alert(e[0]);
    }
  }

  function logOut() {
    localStorage.token = "";
    setToken("");
    return redirect("/");
  }

  async function register(formData) {
    try {
      const new_token = await JoblyApi.registerUser(formData);
      setToken(new_token);
      navigate("/");
    } catch (e) {
      alert(e[0]);
    }
  }

  async function update(formData) {
    try {
      const user = await JoblyApi.updateUser(formData);
      setUser(user);
      navigate("/");
    } catch (e) {
      alert(e);
    }
  }
  if (loading) return <h1>Loading</h1>;

  return (
    <div className="App container-fluid">
      <userContext.Provider value={user}>
        <NavBar logOut={logOut} />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<LogInForm logIn={logIn} />} />
          <Route
            exact
            path="/signup"
            element={<SignUpForm register={register} />}
          />

          {user.username ? (
            <>
              <Route exact path="/companies" element={<CompanyList />}></Route>
              <Route
                exact
                path="/companies/:id"
                element={<CompanyDetail />}
              ></Route>
              <Route
                exact
                path="/profile"
                element={<ProfileForm update={update} />}
              />
              <Route exact path="/jobs" element={<JobList />} />
            </>
          ) : (
            ""
          )}
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </userContext.Provider>
    </div>
  );
}

export default App;
