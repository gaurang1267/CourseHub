import React from "react";
import { Form, Link, useNavigation } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="signup--container">
      <div className="form--container">
        <div className="left--image"></div>
        <Form method="post" className="signup--form">
          <h1 className="signup--form__heading">Hey, There!</h1>
          <div className="signup--form__text">
            Register yourself to begin your learning journey with us
          </div>
          <div className="form--input">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" placeholder="Email" />
          </div>
          <div className="form--input">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />
          </div>
          <div className="form--input">
            <label htmlFor="password">password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <button className="signup--submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing you up.." : "Sign up"}
          </button>
          <Link to="/artist-register">
            <a href="" className="artist--register">
              Sign up for becoming a artist &rarr;
            </a>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
