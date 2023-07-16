import React from "react";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="login--container">
      <div className="form--container">
        <div className="left--image"></div>
        <Form method="post" className="login--form">
          <h1 className="login--form__heading">Welcome Back!</h1>
          <div className="login--form__text">
            Resume your learning journey by logging in
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
            {isSubmitting ? "Logging you in.." : "Login"}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
