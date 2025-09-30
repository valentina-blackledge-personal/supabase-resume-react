import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const fetchExperience = async () => {
      const { data, error } = await supabase.from("experience").select("*");
      if (error) {
        console.error("Error fetching experience:", error);
      } else {
        setExperience(data);
      }
    };

    const fetchEducation = async () => {
      const { data, error } = await supabase.from("education").select("*");
      if (error) {
        console.error("Error fetching education:", error);
      } else {
        setEducation(data);
      }
    };

    fetchExperience();
    fetchEducation();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      {/* EXPERIENCE SECTION */}
      <h1>Experience</h1>
      {experience.length === 0 ? (
        <p>No experience data found.</p>
      ) : (
        experience.map((job) => (
          <div key={job.id} style={{ marginBottom: "1.5rem" }}>
            <h2>
              {job.title} — {job.company}
            </h2>
            <p>{job.location}</p>
            <p>
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

      {/* EDUCATION SECTION */}
      <h1>Education</h1>
      {education.length === 0 ? (
        <p>No education data found.</p>
      ) : (
        education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: "1.5rem" }}>
            <h2>{edu.degree}</h2>
            <p>{edu.institution}</p>
            <p>{edu.location}</p>
            <p>Graduated: {edu.graduation_date}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
