import "./Company.css";

function Company({ company }) {
  return (
    <div className="company-card">
      <a className="company-heading" href={`/companies/${company.handle}`}>
        <h1>{company.name}</h1>
      </a>
      <p>{company.description}</p>
      <p>Number of Employees: {company.numEmployees}</p>
    </div>
  );
}

export default Company;
