import "./index.css";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { BsBriefcaseFill } from "react-icons/bs";

const JobListItem = (props) => {
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = props;

  return (
    <Link to={`/jobs/${id}`} className="nav-link">
      <div className="JobListItem">
        <div className="logo-title-container">
          <img className="logo-img" src={companyLogoUrl} alt="company logo" />
          <div className="c-name-rating">
            <h1 className="listItem-company-name">{title}</h1>
            <div className="listItem-rating-container">
              <FaStar color="#fbbf24" size={18} />
              <p className="listItem-rating">{rating}</p>
            </div>
          </div>
        </div>

        <div className="salary-container">
          <div className="listItem-location-container">
            <MdLocationOn color="#10b981" size={20} />
            <p className="listItem-location">{location}</p>
          </div>
          <div className="listItem-location-container">
            <BsBriefcaseFill color="#f8fafc" size={20} />
            <p className="listItem-location">{employmentType}</p>
          </div>
          <p className="listItem-salary">{packagePerAnnum}</p>
        </div>

        <hr className="listItem-hr" />
        <h1 className="listItem-Description">Description</h1>
        <p className="listItem-jobDescription">{jobDescription}</p>
      </div>
    </Link>
  );
};

export default JobListItem;
