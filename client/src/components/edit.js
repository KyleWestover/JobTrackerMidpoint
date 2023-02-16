import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    company: "",
    jobTitle: "",
    location: "",
    jobDescription: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedJob = {
      company: form.company,
      jobTitle: form.jobTitle,
      location: form.location,
      jobDescription: form.jobDescription
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedJob),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Job</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="company">Company: </label>
          <input
            type="text"
            className="form-control"
            id="company"
            value={form.company}
            onChange={(e) => updateForm({ company: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobTitle">Job Title: </label>
          <input
            type="text"
            className="form-control"
            id="jobTitle"
            value={form.jobTitle}
            onChange={(e) => updateForm({ jobTitle: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location: </label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={form.location}
            onChange={(e) => updateForm({ location: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobDescription">Job Description: </label>
          <input
            type="text"
            className="form-control"
            id="jobDescription"
            value={form.jobDescription}
            onChange={(e) => updateForm({ jobDescription: e.target.value })}
          />
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Job"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
