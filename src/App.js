import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("experience")
        .select("*");

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setExperience(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
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
    </div>
  );
}

export default App;
