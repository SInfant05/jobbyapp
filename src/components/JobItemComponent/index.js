import "./index.css";
import { FaStar, FaExternalLinkAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { BsBriefcaseFill } from "react-icons/bs";

const SkillsCom = ({ imageUrl, name }) => (
  <li className="job-item-skill-item">
    <img className="job-item-skill-img" src={imageUrl} alt={name} />
    <p className="job-item-skill-name">{name}</p>
  </li>
);

const JobItemComponent = ({
  companyLogoUrl,
  employmentType,
  jobDescription,
  location,
  packagePerAnnum,
  rating,
  title,
  companyWebsiteUrl,
  skills,
  lifeAtCompany, // Default empty object if not passed
}) => {
  const { description, imageUrl } = lifeAtCompany;

  return (
    <div className="job-item-container">
      <div className="job-item-logo-title-container">
        <img
          className="job-item-logo-img"
          src={companyLogoUrl}
          alt="job details company logo"
        />
        <div className="job-item-c-name-rating">
          <h1 className="job-item-company-name">{title}</h1>
          <div className="job-item-rating-container">
            <FaStar color="#fbbf24" size={18} />
            <p className="job-item-rating">{rating}</p>
          </div>
        </div>
      </div>

      <div className="job-item-salary-container">
        <div className="job-item-location-container">
          <MdLocationOn color="#10b981" size={20} />
          <p className="job-item-location">{location}</p>
        </div>
        <div className="job-item-employment-type-container">
          <BsBriefcaseFill color="#f8fafc" size={20} />
          <p className="job-item-employment-type">{employmentType}</p>
        </div>
        <p className="job-item-salary">{packagePerAnnum}</p>
      </div>

      <hr className="job-item-hr" />
      <div className="job-item-link-container">
        <h1 className="job-item-description-title">Description</h1>
        <a
          href={companyWebsiteUrl}
          className="visit-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit <FaExternalLinkAlt size={20} />
        </a>
      </div>
      <p className="job-item-job-description">{jobDescription}</p>

      <h1 className="job-item-skills-title">Skills</h1>
      <ul className="job-item-skills-container">
        {skills.map((n) => (
          <SkillsCom {...n} key={n.name} />
        ))}
      </ul>

      <h1 className="job-item-life-title">Life at Company</h1>
      <div className="job-item-life-at-company-container">
        <p className="job-item-life-at-company-description">{description}</p>
        {imageUrl && (
          <img
            className="job-item-life-at-company-img"
            src={imageUrl}
            alt="life at company"
          />
        )}
      </div>
    </div>
  );
};

export default JobItemComponent;
