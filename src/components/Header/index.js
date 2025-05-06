import "./index.css";
import { Link, withRouter } from "react-router-dom";
import Cookies from "js-cookie";

const Header = (props) => {
  const handlelogout = () => {
    Cookies.remove("jwt_token");
    const { history } = props;
    history.replace("/login");
  };
  return (
    <div className="bg-header">
      <Link to="/" className="nav-link">
        <img
          className="header-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul className="nav-center">
        <li>
          <Link to="/" className="nav-link">
            <p className="home-link">Home</p>
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="nav-link">
            <p className="home-link">Jobs</p>
          </Link>
        </li>
        <li>
          <button className="logout-btn" type="button" onClick={handlelogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Header);
