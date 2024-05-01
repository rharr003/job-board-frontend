import Job from "./Job.jsx";
import { useState, useEffect } from "react";
import JoblyApi from "./Api.js";
function JobList(props) {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    async function getAllJobs() {
      const result = await JoblyApi.getAllJobs();
      setJobs(result);
    }
    if (!props.jobs) {
      getAllJobs();
    } else {
      setJobs((jobs) => [...props.jobs]);
    }
  }, [jobs]);
  return (
    <div>
      {jobs.map((val) => (
        <Job job={val} key={val.id} />
      ))}
    </div>
  );
}

export default JobList;
