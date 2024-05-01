import { useState, useContext } from "react";
import userContext from "./userContext";
import "./ProfileForm.css";
function ProfileForm({ update }) {
  const user = useContext(userContext);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: "",
  });
  console.log(user.applications);
  function handleChange(e) {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    update(formData);
  }
  return (
    <>
      <form className="profile-form">
        <div className="profile-card">
          <h5>You can edit your information below:</h5>
          {Object.keys(formData).map((val) => (
            <div key={val} style={{ textAlign: "center" }}>
              <input
                name={val}
                placeholder={val}
                onChange={handleChange}
                value={formData[val]}
                className="profile-input"
              />
            </div>
          ))}
          <button className="profile-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
      <h4 className="application-heading">Your Applications:</h4>
      <div className="application-container">
        {user.applications.map((val) => (
          <div className="application">
            <h5>{val.title}</h5>
            <p>
              for{" "}
              {val.company_handle
                .split("-")
                .map((val) => val[0].toUpperCase() + val.slice(1))
                .join(" ")}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProfileForm;
