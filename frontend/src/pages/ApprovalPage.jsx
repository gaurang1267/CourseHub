import React from "react";
import AdminApproval from "../components/AdminApproval";
import { useLoaderData, json } from "react-router-dom";
import { getAuthToken } from "../Utils/Auth";

const ApprovalPage = () => {
  const data = useLoaderData();

  return <AdminApproval users={data} />;
};

export default ApprovalPage;

export async function loader({ request, params }) {
  const token = getAuthToken();

  const response = await fetch(
    "http://localhost:3000/api/v1/auth/approve-artists",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch users",
      },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}
