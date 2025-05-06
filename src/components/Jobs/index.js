import { Component } from "react";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";
import { GoSearch } from "react-icons/go";
import Header from "../Header";
import Profile from "../Profile";
import ConnectionLost from "../ConnectionLost";
import JobListItem from "../JobListItem";
import NoJobsFound from "../NoJobsFound";

import "./index.css";

const employmentTypesList = [
  {
    label: "Full Time",
    employmentTypeId: "FULLTIME",
  },
  {
    label: "Part Time",
    employmentTypeId: "PARTTIME",
  },
  {
    label: "Freelance",
    employmentTypeId: "FREELANCE",
  },
  {
    label: "Internship",
    employmentTypeId: "INTERNSHIP",
  },
];

const salaryRangesList = [
  {
    salaryRangeId: "1000000",
    label: "10 LPA and above",
  },
  {
    salaryRangeId: "2000000",
    label: "20 LPA and above",
  },
  {
    salaryRangeId: "3000000",
    label: "30 LPA and above",
  },
  {
    salaryRangeId: "4000000",
    label: "40 LPA and above",
  },
];

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.inProgress,
    selectedEmploymentTypes: [],
    selectedSalaryRange: "",
    searchInput: "",
    profileDetails: [],
    failedApi: null,
  };

  componentDidMount() {
    this.getProfileData();
    this.getData();
  }

  getProfileData = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    const jwtToken = Cookies.get("jwt_token");

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch("https://apis.ccbp.in/profile", options);
    const data = await response.json();
    if (response.ok) {
      const toCamel = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      };
      this.setState({
        profileDetails: toCamel,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        failedApi: this.getProfileData,
      });
    }
  };

  getData = async () => {
    const { selectedEmploymentTypes, selectedSalaryRange } = this.state;
    this.setState({ apiStatus: apiStatusConstants.inProgress });

    const jwtToken = Cookies.get("jwt_token");

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const employmentTypes = selectedEmploymentTypes.join(",");
    const salary = selectedSalaryRange;
    const { searchInput } = this.state;

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}&minimum_package=${salary}&search=${searchInput}`;

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      const updatedData = data.jobs.map((job) => ({
        id: job.id,
        title: job.title,
        rating: job.rating,
        location: job.location,
        jobDescription: job.job_description,
        packagePerAnnum: job.package_per_annum,
        employmentType: job.employment_type,
        companyLogoUrl: job.company_logo_url,
      }));
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        failedApi: this.getData,
      });
    }
  };

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#fff" height="50" width="50" />
    </div>
  );

  renderFailureView = () => {
    const { failedApi } = this.state;
    return <ConnectionLost handleRetry={failedApi} />;
  };

  renderJobsList = () => {
    const { jobsList } = this.state;

    if (jobsList.length === 0) {
      return (
        // <div className="no-jobs-view">
        //   <h1>No Jobs Found</h1>
        //   <p>Try adjusting your filters or search terms.</p>
        // </div>
        <NoJobsFound />
      );
    }

    return (
      <ul className="jobs-list">
        {jobsList.map((job) => (
          <JobListItem {...job} key={job.id} />
        ))}
      </ul>
    );
  };

  renderContent = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      case apiStatusConstants.inProgress:
        return this.renderLoading();
      default:
        return null;
    }
  };

  onChangeSalary = (event) => {
    this.setState({ selectedSalaryRange: event.target.value }, this.getData);
  };

  onChangeType = (event) => {
    const { value, checked } = event.target;
    this.setState((prevState) => {
      const updatedTypes = checked
        ? [...prevState.selectedEmploymentTypes, value]
        : prevState.selectedEmploymentTypes.filter((type) => type !== value);
      return { selectedEmploymentTypes: updatedTypes };
    }, this.getData);
  };

  handleInputChange = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.getData();
    }
  };

  clearFilter = () => {
    this.setState(
      {
        selectedEmploymentTypes: [],
        selectedSalaryRange: "",
        searchInput: "",
      },
      this.getData
    );
  };

  render() {
    const { selectedEmploymentTypes, selectedSalaryRange } = this.state;
    const { searchInput, profileDetails } = this.state;
    return (
      <div className="jobs-page-container">
        <Header />
        <div className="filter-result">
          <div className="jobs-page-filter-container">
            <Profile {...profileDetails} />
            <hr className="jobs-page-hr1" />
            <h1 className="jobs-page-f1-heafing">Type of Employment</h1>
            <ul>
              {employmentTypesList.map((type) => (
                <li key={type.employmentTypeId}>
                  <input
                    type="checkbox"
                    id={type.employmentTypeId}
                    value={type.employmentTypeId}
                    onChange={this.onChangeType}
                    checked={selectedEmploymentTypes.includes(
                      type.employmentTypeId
                    )}
                  />
                  <label htmlFor={type.employmentTypeId}>{type.label}</label>
                </li>
              ))}
            </ul>
            <hr className="jobs-page-hr1" />
            <h1 className="jobs-page-f1-heafing">Salary Range</h1>
            <ul>
              {salaryRangesList.map((range) => (
                <li key={range.salaryRangeId}>
                  <input
                    type="radio"
                    id={range.salaryRangeId}
                    value={range.salaryRangeId}
                    checked={selectedSalaryRange === range.salaryRangeId}
                    onChange={this.onChangeSalary}
                    name="salary"
                  />
                  <label htmlFor={range.salaryRangeId}>{range.label}</label>
                </li>
              ))}
            </ul>
            <button
              className="clearFilter-btn"
              type="button"
              onClick={this.clearFilter}
            >
              Clear Filter
            </button>
          </div>
          <div className="jobs-page-result-container">
            <div className="search-container">
              <input
                type="search"
                className="search-box"
                value={searchInput}
                onChange={this.handleInputChange}
                onKeyDown={this.handleKeyDown}
                placeholder="Search"
              />
              <button type="button" data-testid="searchButton">
                <GoSearch
                  color="#fff"
                  className="search-icon"
                  size={25}
                  onClick={this.getData}
                />
              </button>
            </div>

            {this.renderContent()}
          </div>
        </div>
      </div>
    );
  }
}

export default Jobs;
