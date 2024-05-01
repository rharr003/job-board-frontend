import userContext from "./userContext";
import { useContext, useRef } from "react";
import JoblyApi from "./Api";
import "./Job.css";

function Job({ job }) {
  const user = useContext(userContext);

  const button = useRef();

  async function apply(e) {
    try {
      await JoblyApi.applyForJob(user.username, job.id);
      button.current.innerText = "Applied";
      button.current.disabled = true;
    } catch (e) {
      alert(e);
    }
  }
  return (
    <div className="job-card">
      <h1>{job.title}</h1>
      <p>Salary: {job.salary ? job.salary : 0}</p>
      <p>Equity: {job.equity}</p>
      {user.applications.every((val) => val.job_id !== job.id) ? (
        <button className="apply-button" onClick={apply} ref={button}>
          Apply
        </button>
      ) : (
        <p>Already Applied</p>
      )}
    </div>
  );
}

export default Job;
