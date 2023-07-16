import React from "react";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";

const ArtistRegister = () => {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="signup--container">
      <div className="form--container">
        <div className="left--image"></div>
        <Form method="post" className="signup--form">
          <h1 className="signup--form__heading">Hey, There!</h1>
          <div className="signup--form__text">
            Register yourself as an artist and upload courses after being
            approved!
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
            <label htmlFor="BrandName">Brand Name</label>
            <input
              type="text"
              name="BrandName"
              id="BrandName"
              placeholder="Brand Name"
            />
          </div>
          <div className="form--input">
            <label htmlFor="logo">Logo</label>
            <input type="text" name="logo" id="logo" placeholder="Logo" />
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
        </Form>
      </div>
    </div>
  );
};

export default ArtistRegister;
