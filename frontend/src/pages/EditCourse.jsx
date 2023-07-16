import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import CourseForm from "../components/CourseForm";

const EditCourse = () => {
  const data = useRouteLoaderData("course-detail");

  return <CourseForm method="patch" course={data} />;
};

export default EditCourse;
