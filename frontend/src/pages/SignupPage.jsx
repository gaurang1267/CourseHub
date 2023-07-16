import React from "react";
import Signup from "../components/Signup";
import { redirect, json } from "react-router-dom";

const SignupPage = () => {
  return <Signup />;
};

export default SignupPage;

export async function action({ request, params }) {
  const data = await request.formData();
  const signupData = {
    email: data.get("email"),
    username: data.get("username"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:3000/api/v1/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signupData),
  });

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;
  localStorage.setItem("token", token);
  const user = resData.data;
  addUsertoLocalStorage(user);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}
