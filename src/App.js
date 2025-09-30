import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";

// If you later rename the table to "personal_info", just change this constant:
const PERSONAL_TABLE = "Valentina Blackledge";

/** Helper: pick the first present value from a list of possible keys */
function pick(obj, candidates, fallback = "") {
  for (const k of candidates) {
    if (obj && Object.prototype.hasOwnProperty.call(obj, k) && obj[k] != null) {
      // If value is a string, trim it
      return typeof obj[k] === "string" ? obj[k].trim() : obj[k];
    }
  }
  return fallback;
}

function App() {
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [personalInfo, setPersonalInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // ----- Experience -----
      const { data: expData, error: expError } = await supabase
        .from("experience")
        .select("*")
        .order("start_date", { ascending: false });
      if (expError) console.error("Error fetching experience:", expError);
      else setExperience(expData || []);

      // ----- Education -----
      const { data: eduData, error: eduError } = await supabase
        .from("education")
        .select("*")
        .order("graduation_date", { ascending: false });
      if (eduError) console.error("Error fetching education:", eduError);
      else setEducation(eduData || []);

      // ----- Certifications -----
      // Your column is named "Acquired" (capital A). If you renamed it, adjust below.
      const { data: certData, error: certError } = await supabase
        .from("certifications")
        .select("*")
        .order("Acquired", { ascending: false });
      if (certError) console.error("Error fetching certifications:", certError);
      else setCertifications(certData || []);

      // ----- Personal Info -----
      // Table name contains a space; supabase-js can handle it, but exact match matters.
      const { data: infoData, error: infoError } = await supabase
        .from(PERSONAL_TABLE)
        .select("*");
      if (infoError) console.error("Error fetching personal info:", infoError);
      else setPersonalInfo(infoData || []);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
{/* ================= PERSONAL INFO (TOP) ================= */}
<h1 className="section-header">Contact Info</h1>
{personalInfo.length === 0 ? (
  <p>No personal info found.</p>
) : (
  personalInfo.map((info) => (
    <div key={info.id} className="card">
      <h2 className="card-title">Valentina Blackledge</h2>
      <p>
        <span className="contact-label">Position Applying For:</span>{" "}
        <span className="contact-value">{info["Position applying for:"]}</span>
      </p>
      <p>
        <span className="contact-label">Email:</span>{" "}
        <span className="contact-value">{info["Email:"]}</span>
      </p>
      <p>
        <span className="contact-label">Phone:</span>{" "}
        <span className="contact-value">{info["Phone:"]}</span>
      </p>
    </div>
  ))
)}

      {/* ================= EXPERIENCE ================= */}
      <h1 className="section-header">Experience</h1>
      {experience.length === 0 ? (
        <p>No experience data found.</p>
      ) : (
        experience.map((job) => (
          <div key={job.id} className="card">
            <h2 className="card-title">
              {job.title} — {job.company}
            </h2>
            <p className="card-location">{job.location}</p>
            <p className="card-dates">
              {job.start_date} → {job.end_date || "Present"}
            </p>
            {job.description && (
              <ul>
                {job.description
                  .split("\n")
                  .filter((line) => line.trim() !== "")
                  .map((line, i) => (
                    <li key={i}>{line.trim()}</li>
                  ))}
              </ul>
            )}
          </div>
        ))
      )}

      {/* ================= EDUCATION ================= */}
      <h1 className="section-header">Education</h1>
      {education.length === 0 ? (
        <p>No education data found.</p>
      ) : (
        education.map((edu) => (
          <div key={edu.id} className="card">
            <h2 className="card-title">{edu.degree}</h2>
            <p className="card-location">{edu.institution}</p>
            <p className="card-location">{edu.location}</p>
            <p className="card-dates">Graduated: {edu.graduation_date}</p>
          </div>
        ))
      )}

      {/* ================= CERTIFICATIONS ================= */}
      <h1 className="section-header">Certifications</h1>
      {certifications.length === 0 ? (
        <p>No certifications found.</p>
      ) : (
        certifications.map((cert) => (
          <div key={cert.id} className="card">
            <h2 className="card-title">{cert.Certificate}</h2>
            <p className="card-location">{cert.Institution}</p>
            <p className="card-dates">Acquired: {cert.Acquired}</p>
            {cert.Expiration && (
              <p className="card-dates">Expires: {cert.Expiration}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default App;
