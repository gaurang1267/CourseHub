import React from "react";
import ArtistRegister from "../components/ArtistRegister";
import { redirect } from "react-router-dom";
import { addUsertoLocalStorage } from "./../Utils/Auth";

const ArtistPage = () => {
  return <ArtistRegister />;
};

export default ArtistPage;

export async function action({ request, params }) {
  const data = await request.formData();

  const artistData = {
    email: data.get("email"),
    username: data.get("username"),
    password: data.get("password"),
    BrandName: data.get("BrandName"),
    logo: data.get("logo"),
  };

  const response = await fetch(
    "http://localhost:3000/api/v1/auth/artists-register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(artistData),
    }
  );

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
