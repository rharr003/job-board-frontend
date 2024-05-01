import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./Api";
import JobList from "./JobList";
import "./CompanyDetail.css";

function CompanyDetail() {
  const [company, setCompany] = useState({});
  let { id } = useParams();
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    async function getCompany(handle) {
      const result = await JoblyApi.getCompany(handle);
      setCompany(result);
      console.log(result.jobs);
      setJobs(result.jobs);
    }

    getCompany(id);
  }, []);

  return (
    <>
      <div className="company-header">
        <div>
          <h1 className="company-title">{company.name}</h1>
        </div>
        <div className="company-info">
          <h5>About Us:</h5>
          <p>{company.description}</p>
          <p>Number of Employees: {company.numEmployees}</p>
        </div>
      </div>
      <JobList jobs={jobs} />
    </>
  );
}

export default CompanyDetail;
