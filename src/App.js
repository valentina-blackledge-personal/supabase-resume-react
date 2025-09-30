import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./App.css"; // make sure this is included

function App() {
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: expData, error: expError } = await supabase
        .from("experience")
        .select("*");

      if (!expError) setExperience(expData);

      const { data: eduData, error: eduError } = await supabase
        .from("education")
        .select("*");

      if (!eduError) setEducation(eduData);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      {/* ================= EXPERIENCE SECTION ================= */}
      <h1>Experience</h1>
      {experience.length === 0 ? (
        <p>No experience data found.</p>
      ) : (
        experience.map((job) => (
          <div key={job.id} className="job-card">
            <h2>
              {job.title} — {job.company}
            </h2>
            <p className="job-meta">
              {job.location} <br />
              {job.start_date} → {job.end_date || "Present"}
            </p>
            {job.description && (
              <ul>
                {job.description.split("\n").map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}

      {/* ================= EDUCATION SECTION ================= */}
      <h1>Education</h1>
      {education.length === 0 ? (
        <p>No education data found.</p>
      ) : (
        education.map((edu) => (
          <div key={edu.id} className="edu-card">
            <h2>{edu.degree}</h2>
            <p className="edu-meta">
              {edu.institution} — {edu.location} <br />
              Graduated: {edu.graduation_date}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
