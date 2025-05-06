import "./index.css";
// import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { BsBriefcaseFill } from "react-icons/bs";

const SimilarJobs = ({
  companyLogoUrl,
  title,
  rating,
  jobDescription,
  location,
  employmentType,
  id,
}) => (
  <li className="SimilarJobs-card">
    <div className="SimilarJobs-headding">
      <img
        className="SimilarJobs-logo"
        src={companyLogoUrl}
        alt="similar job company logo"
      />
      <div className="SimilarJobs-details">
        <h1 className="SimilarJobs-title">{title}</h1>
        <div className="SimilarJobs-rating-container">
          <FaStar color="#fbbf24" size={18} />
          <p className="SimilarJobs-rating">{rating}</p>
        </div>
      </div>
    </div>
    <h1 className="job-item-description-title">Description</h1>
    <p className="SimilarJobs-jobDescription">{jobDescription}</p>
    <div className="SimilarJobs-salary-container">
      <div className="SimilarJobs-location-container">
        <MdLocationOn color="#10b981" size={20} />
        <p className="SimilarJobs-location">{location}</p>
      </div>
      <div className="SimilarJobs-employment-type-container">
        <BsBriefcaseFill color="#64748b" size={20} />
        <p className="SimilarJobs-employment-type">{employmentType}</p>
      </div>
    </div>
  </li>
);

export default SimilarJobs;
