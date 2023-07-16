import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { getUserFromLocalStorage } from "../Utils/Auth";

const ProfilePage = () => {
  const data = useLoaderData();
  const { username } = getUserFromLocalStorage();
  return (
    <>
      <div className="courses--card">
        <h1>User Dashboard</h1>
        <ul className="courses--list">
          {data?.map(
            (course) =>
              course.paid &&
              course.user.some((el) => el.username === username) && (
                <li key={course._id} className="courses--item">
                  <img src={course.image} alt={course.name} />
                  <div className="card--content">
                    <h2>{course.name}</h2>
                    <p>{course.description.substring(0, 150)}...</p>
                    <Link to={`/courses/${course._id}`}>
                      <a href="" className="card--content__link">
                        View Details
                      </a>
                    </Link>
                  </div>
                </li>
              )
          )}
        </ul>
      </div>
    </>
  );
};

export default ProfilePage;

export async function loader({ req, params }) {
  const response = await fetch(
    "http://localhost:3000/api/v1/courses/my-courses"
  );

  if (!response.ok) {
    throw json(
      {
        message: "Could not load courses",
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
