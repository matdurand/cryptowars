import React from "react";

const ErrorPage = ({ errorMessage }) => (
  <div>
    {errorMessage ? (
      <div>
        <p>{errorMessage}</p>
      </div>
    ) : (
      <div>
        <p>An error occured</p>
      </div>
    )}
  </div>
);

export default ErrorPage;
