import "./index.css";

const ConnectionLost = ({ handleRetry }) => {
  const retryBtn = () => {
    handleRetry();
  };
  return (
    <div className="ConnectionLost">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-h1">Oops! Something Went Wrong</h1>
      <p className="failure-p">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="failure-retry-btn" onClick={retryBtn}>
        Retry
      </button>
    </div>
  );
};

export default ConnectionLost;
