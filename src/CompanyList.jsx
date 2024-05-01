import { useState, useEffect, useContext } from "react";
import Company from "./Company";
import JoblyApi from "./Api";
import userContext from "./userContext";
import SearchForm from "./SearchForm";
const _ = require("lodash");

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const curr_user = useContext(userContext);

  async function getAll() {
    const result = await JoblyApi.getAllCompanies();
    setCompanies(result);
    setLoading(false);
  }

  useEffect(() => {
    getAll();
    console.log(curr_user);
  }, []);

  function liveUpdate(nameLike) {
    async function Search(company) {
      const res = await JoblyApi.searchCompany(company);
      console.log(res);
      setCompanies(res.companies);
    }

    nameLike === "" ? getAll() : Search(nameLike);
  }

  return (
    <div>
      <SearchForm search={_.debounce(liveUpdate, 1000)} />
      {loading ? (
        <h1>Loading</h1>
      ) : (
        companies.map((val) => <Company company={val} key={val.handle} />)
      )}
    </div>
  );
}

export default CompanyList;
