import React from "react";
import Center from "../components/Center";

const ErrorPage = ({ errorMessage }) => (
  <Center>
    {errorMessage ? (
      <div>
        <p>{errorMessage}</p>
      </div>
    ) : (
      <div>
        <p>An error occured</p>
      </div>
    )}
  </Center>
);

export default ErrorPage;
