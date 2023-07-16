import React from "react";
import "./AdminApproval.css";
import { CheckCircle } from "phosphor-react";
import { json, redirect } from "react-router-dom";
import { getAuthToken } from "../Utils/Auth";

const AdminApproval = ({ users }) => {
  async function handleApprove(id) {
    const token = getAuthToken();
    const data = {
      isApproved: true,
    };

    const response = await fetch(
      "http://localhost:3000/api/v1/auth/approve-artists/" + id,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw json({ message: "Could not update user" }, { status: 500 });
    } else {
      console.log(response.json());
    }

    return redirect("admin-approval");
  }
  return (
    <div className="artists--container">
      <h1>All Artists</h1>
      <ul className="artists--list">
        {users &&
          users.map((user) => (
            <li key={user._id} className="artists--item">
              <h2>
                <span>Name:</span>
                {user.username}
              </h2>
              <h2>
                <span>Brandname:</span>
                {user.BrandName}
              </h2>

              <button onClick={() => handleApprove(user._id)}>
                {user.isApproved ? (
                  <CheckCircle size={32} color="#ffffff" weight="fill" />
                ) : (
                  "Approve"
                )}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AdminApproval;
