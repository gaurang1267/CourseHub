import React from "react";
import { useRouteLoaderData, json, redirect } from "react-router-dom";
import CourseItem from "../components/CourseItem";
import { getAuthToken } from "../Utils/Auth";

const CourseDetail = () => {
  const data = useRouteLoaderData("course-detail");
  return (
    <>
      <CourseItem course={data} />
    </>
  );
};

export default CourseDetail;

export async function loader({ request, params }) {
  const id = params.courseId;

  const response = await fetch("http://localhost:3000/api/v1/courses/" + id);
  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

export async function action({ request, params }) {
  const courseId = params.courseId;
  const token = getAuthToken();

  const response = await fetch(
    "http://localhost:3000/api/v1/courses/" + courseId,
    {
      method: request.method,
      headers: {
        'Authorization': "Bearer " + token,
      },
    }
  );

  if (!response.ok) {
    throw json(
      { message: "Could not delete event." },
      {
        status: 500,
      }
    );
  }
  return redirect("/courses");
}
