import React from "react";
import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";
import { getAuthToken } from "../Utils/Auth";
import "./CourseForm.css";

const CourseForm = ({ method, course }) => {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }
  return (
    <div className="form">
      <Form method={method}>
        <h1>{course ? "Edit the Course" : "Add a new Course"}</h1>
        <p>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            required
            defaultValue={course ? course.name : ""}
          />
        </p>
        <p>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="text"
            name="price"
            required
            defaultValue={course ? course.price : ""}
          />
        </p>
        <p>
          <label htmlFor="image">Image</label>
          <input
            id="image"
            type="text"
            name="image"
            required
            defaultValue={course ? course.image : ""}
          />
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            type="text"
            name="description"
            required
            defaultValue={course ? course.description : ""}
          />
        </p>

        <div className="form--actions">
          <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
            Cancel
          </button>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CourseForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const courseData = {
    name: data.get("name"),
    image: data.get("image"),
    price: data.get("price"),
    description: data.get("description"),
  };

  let url = "http://localhost:3000/api/v1/courses";

  if (method === "PATCH") {
    const courseId = params.courseId;
    url = "http://localhost:3000/api/v1/courses/" + courseId;
  }
  const token = getAuthToken();
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(courseData),
  });

  if (response.statusCode === 400) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save course" }, { status: 500 });
  }

  return redirect("/courses");
}
