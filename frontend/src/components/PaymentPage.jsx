import { useState } from "react";
import React from "react";
import "./PaymentPage.css";
import { Link, useNavigate } from "react-router-dom";

const PaymentPage = ({ course }) => {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("..");
  };
  return (
    <div className="payment--container">
      <h1>Complete your Payment by clicking the link below</h1>
      <a href="" className="link" onClick={navigateHandler}>
        Click Here to pay
      </a>
      <div>{course.name}</div>
    </div>
  );
};

export default PaymentPage;
