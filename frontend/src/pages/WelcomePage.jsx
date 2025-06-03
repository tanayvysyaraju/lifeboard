import React, { useState } from "react";

const WelcomePage = () => {
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");
  const [sleepStart, setSleepStart] = useState("");
  const [sleepEnd, setSleepEnd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userType === "fullwork") window.location.href = "/fullscheduler";
    else if (userType === "flexwork") window.location.href = "/flexscheduler";
    else if (userType === "personalwork") window.location.href = "/personalscheduler";
  };

  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="text-center mb-4">
        <h1>Welcome to <strong>LifeBoard</strong>!</h1>
        <h4 className="text-muted">The first ever personalized AI-powered task planner</h4>
        <p className="mt-2">Fill out the form below so we can personalize your experience:</p>
      </div>

      <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label"><strong>Name:</strong></label>
          <input
            id="name"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="userType" className="form-label"><strong>User Type:</strong></label>
          <select
            id="userType"
            className="form-select"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="">Select...</option>
            <option value="fullwork">Work 9–5 + personal life</option>
            <option value="personalwork">Personal scheduler only</option>
            <option value="flexwork">Work scheduler only</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="sleepStart" className="form-label"><strong>Sleep Start Time:</strong></label>
          <input
            id="sleepStart"
            type="time"
            className="form-control"
            value={sleepStart}
            onChange={(e) => setSleepStart(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="sleepEnd" className="form-label"><strong>Sleep End Time:</strong></label>
          <input
            id="sleepEnd"
            type="time"
            className="form-control"
            value={sleepEnd}
            onChange={(e) => setSleepEnd(e.target.value)}
            required
          />
        </div>


        <div className="d-grid">
          <button type="submit" className="btn btn-dark">Get Started</button>
        </div>
      </form>
    </div>
  );
};

export default WelcomePage;
