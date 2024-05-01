import { useState } from "react";
import "./SearchForm.css";
function SearchForm({ search }) {
  const [formData, setFormData] = useState({
    company: "",
  });
  function handleChange(e) {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));

    search(e.target.value);
  }

  return (
    <form>
      {Object.keys(formData).map((val) => (
        <input
          name={val}
          placeholder={`Search by ${val} name`}
          onChange={handleChange}
          value={formData[val]}
          key="Search"
          className="search-input"
        />
      ))}
    </form>
  );
}

export default SearchForm;
