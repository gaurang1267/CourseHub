import React from "react";
import { useRouteError } from "react-router-dom";
import "./../components/Error.css";
import { SmileySad } from "phosphor-react";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  if (error.status === 500 || error.status === 400) {
    message = error.data.message;
  }

  return (
    <div className="error">
      <div className="error-heading">
        <SmileySad size={84} color="#2a6ff8" />
        <h1>{title}</h1>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default ErrorPage;
