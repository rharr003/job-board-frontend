import { useState } from "react";
import "./LoginForm.css";
function LogInForm({ logIn }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  function handleChange(e) {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("hello");
    logIn(formData);
  }
  return (
    <form className="login-form">
      <div className="login-card">
        {Object.keys(formData).map((val) => (
          <div key={val}>
            <input
              name={val}
              placeholder={val}
              onChange={handleChange}
              value={formData[val]}
              className="login-input"
            />
          </div>
        ))}
        <button className="login-button" onClick={handleSubmit}>
          Log In
        </button>
      </div>
    </form>
  );
}

export default LogInForm;
