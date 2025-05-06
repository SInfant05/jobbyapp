import "./index.css";

const NotFound = () => (
  <div className="bg-NotFound">
    <img
      className="NotFound-img"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
    />
    <h1 className="NotFound-h1">Page Not Found</h1>
    <p className="NotFound-p">
      We are sorry, the page you requested could not be found
    </p>
  </div>
);

export default NotFound;
