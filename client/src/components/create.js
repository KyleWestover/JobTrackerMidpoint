import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    company: "",
    jobTitle: "",
    location: "",
    jobDescription: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ company: "", jobTitle: "", location: "", jobDescription: "" });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Add New Job</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            className="form-control"
            id="company"
            value={form.company}
            onChange={(e) => updateForm({ company: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobTitle">Job Title</label>
          <input
            type="text"
            className="form-control"
            id="jobTitle"
            value={form.jobTitle}
            onChange={(e) => updateForm({ jobTitle: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={form.location}
            onChange={(e) => updateForm({ location: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobDescription">Job Description</label>
          <input
            type="text"
            className="form-control"
            id="jobDescription"
            value={form.jobDescription}
            onChange={(e) => updateForm({ jobDescription: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create job"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
