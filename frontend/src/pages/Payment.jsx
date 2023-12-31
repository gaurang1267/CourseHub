import React from "react";
import PaymentPage from "../components/PaymentPage";
import { useRouteLoaderData, json } from "react-router-dom";
import { getAuthToken, getUserFromLocalStorage } from "../Utils/Auth";

const Payment = () => {
  const data = useRouteLoaderData("course-detail");
  const token = useRouteLoaderData("root");

  return <PaymentPage course={data} />;
};

export default Payment;

export async function loader({ request, params }) {
  const id = params.courseId;
  const token = getAuthToken();
  console.log(getUserFromLocalStorage());
  const { _id } = getUserFromLocalStorage();
  console.log(_id);
  const postData = {
    user: _id,
  };
  const responsePost = await fetch(
    "http://localhost:3000/api/v1/courses/" + id + "/payment",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(postData),
    }
  );
  if (!responsePost.ok) {
    throw json(
      { message: "Could not complete your request." },
      {
        status: 500,
      }
    );
  } else {
    const resDataPost = await responsePost.json();
  }

  return null;
}
