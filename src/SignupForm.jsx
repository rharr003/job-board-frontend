import { useState } from "react";
import "./SignupForm.css";
function SignUpForm({ register }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  function handleChange(e) {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    register(formData);
  }

  return (
    <form className="signup-form">
      <div className="signup-card">
        {Object.keys(formData).map((val) => (
          <div key={val}>
            <input
              name={val}
              placeholder={val}
              onChange={handleChange}
              value={formData[val]}
              className="signup-input"
            />
          </div>
        ))}
        <button className="signup-button" onClick={handleSubmit}>
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default SignUpForm;
