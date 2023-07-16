import { useLoaderData, json } from "react-router-dom";

import CoursesList from "../components/CoursesList";
import { getAuthToken, getUserFromLocalStorage } from "./../Utils/Auth";

function CoursesPage() {
  const data = useLoaderData();

  return <CoursesList courses={data} />;
}

export default CoursesPage;

export async function loader() {
  const { role, id: _id } = getUserFromLocalStorage();
  const token = getAuthToken();
  if (role === "artist") {
    const response = await fetch(
      `http://localhost:3000/api/v1/courses/artist/${id}`,
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
  } else {
    const response = await fetch("http://localhost:3000/api/v1/courses");
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
}
