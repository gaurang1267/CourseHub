import React from "react";
import Login from "../components/Login";
import { redirect, json } from "react-router-dom";
import { addUsertoLocalStorage } from "../Utils/Auth";

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;

export async function action({ request, params }) {
  const data = await request.formData();
  const loginData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:3000/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  console.log(resData);
  const token = resData.token;
  localStorage.setItem("token", token);
  const user = resData.data;
  addUsertoLocalStorage(user);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}
