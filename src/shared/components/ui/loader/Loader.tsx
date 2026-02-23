import "./Loader.css";

interface LoaderProps {
  fullscreen?: boolean;
  message?: string;
  whiteBackground?: boolean;
}

export const Loader = ({
  fullscreen = true,
  message,
  whiteBackground = false,
}: LoaderProps) => {
  if (fullscreen) {
    return (
      <div
        className={`fullscreen-loader-overlay ${
          whiteBackground ? "white-background" : ""
        }`}
      >
        <div className="fullscreen-loader-content">
          <div className="loader-container">
            <div className="loader"></div>
          </div>
          {message && (
            <p className={`fullscreen-loader-message dark-text`}>{message}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};
