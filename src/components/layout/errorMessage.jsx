const ErrorMessage = ({ message }) => (
  <div className="error-message">
    <span className="error-icon">⚠️</span>
    <p>{message}</p>
  </div>
);

export default ErrorMessage
