import { Component } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import JobItemComponent from "../JobItemComponent";
import ConnectionLost from "../ConnectionLost";
import SimilarJobs from "../SimilarJobs";
import Header from "../Header";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

class JobItem extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
    similarJobs: [],
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    const { id } = match.params;

    if (id !== prevProps.match.params.id) {
      this.getData();
    }
  }

  getData = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });

    const { match } = this.props;
    const { id } = match.params;
    const jwtToken = Cookies.get("jwt_token");

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options);
    const data = await response.json();

    if (response.ok) {
      const updatedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        skills: data.job_details.skills.map((skill) => ({
          imageUrl: skill.image_url,
          name: skill.name,
        })),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      };

      const updatedSimilarJobs = data.similar_jobs.map((job) => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        rating: job.rating,
        title: job.title,
      }));

      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
      });
    } else {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000" height="50" width="50" />
    </div>
  );

  renderSuccess = () => {
    const { jobDetails, similarJobs } = this.state;
    return (
      <div className="jobItem-box">
        <JobItemComponent {...jobDetails} />
        <h1 className="sim-heading">Similar Jobs</h1>
        <ul className="similarJobs-list">
          {similarJobs.map((n) => (
            <Link to={`/jobs/${n.id}`} className="nav-link" key={n.id}>
              <SimilarJobs {...n} />
            </Link>
          ))}
        </ul>
      </div>
    );
  };

  renderContent = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader();
      case apiStatusConstants.success:
        return this.renderSuccess();
      case apiStatusConstants.failure:
        return <ConnectionLost handleRetry={this.getData} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="bg-JobItem">
        <Header />
        {this.renderContent()}
      </div>
    );
  }
}

export default JobItem;
