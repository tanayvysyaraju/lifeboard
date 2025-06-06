import React, { useState } from "react";

const WelcomePage = () => {
  const [name, setName] = useState("");
  const [sleepStart, setSleepStart] = useState("");
  const [sleepEnd, setSleepEnd] = useState("");
  const [workStart, setWorkStart] = useState("");
  const [workEnd, setWorkEnd] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/userinfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          sleepStart,
          sleepEnd,
          workStart,
          workEnd
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      window.location.href = "/CalendarPage";
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="text-center mb-4">
        <h1>Welcome to <strong>PathPlan</strong>!</h1>
        <h4 className="text-muted">The first ever personalized AI-powered task planner for Life Science PMs</h4>
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
        <div className="mb-4">
          <label htmlFor="workStart" className="form-label"><strong>Work Start Time:</strong></label>
          <input
            id="workStart"
            type="time"
            className="form-control"
            value={workStart}
            onChange={(e) => setWorkStart(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="workEnd" className="form-label"><strong>Work End Time:</strong></label>
          <input
            id="workEnd"
            type="time"
            className="form-control"
            value={workEnd}
            onChange={(e) => setWorkEnd(e.target.value)}
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
