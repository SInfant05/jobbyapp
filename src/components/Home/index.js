import "./index.css";
import { Link } from "react-router-dom";
import Header from "../Header";

const Home = () => (
  <div className="bg-home">
    <Header />
    <div className="Home-component">
      <h1 className="home-h1">Find The Job That Fits Your Life</h1>
      <p className="home-p">Millions of people are searching for jobs</p>
      <Link to="/jobs">
        <button className="home-btn" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
);

export default Home;
