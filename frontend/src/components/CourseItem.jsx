import React from "react";
import { Link, useSubmit, useRouteLoaderData } from "react-router-dom";
import "./CourseItem.css";
import { getUserFromLocalStorage } from "../Utils/Auth";

const CourseItem = ({ course }) => {
  const token = useRouteLoaderData("root");
  const submit = useSubmit();
  const { role, username } = getUserFromLocalStorage();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  return (
    <div className="details">
      <div className="course--details">
        <div className="course--details__left">
          <h1 className="course--details__heading">{course.name}</h1>
          <p>{course.description}</p>
          <p className="course--details__price">
            Buy Now at <span>Rs. {course.price}</span>{" "}
          </p>
          <p className="course--details__price">
            Uploaded by: {course.author.username}
          </p>
        </div>
        <div className="course--details__right">
          <img src={course.image} alt="..." />
          {token && !course.user.some((el) => el.username === username) && (
            <Link to="payment">
              <a href="" className="link">
                Purchase Now
              </a>
            </Link>
          )}
        </div>
      </div>
      {token && (role === "admin" || username === course.author.username) && (
        <div className="course--details__admin">
          <Link to="edit">
            <button>Edit</button>
          </Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </div>
      )}

      {token && (role === "admin" || username === course.author.username) && (
        <Link to="videos/new" className="link">
          Add a new video
        </Link>
      )}
      <div className="video--details">
        <h1>Course Content</h1>
        <ul className="video--list">
          {course.videos.map((video) => (
            <li key={video._id} className="video--item">
              <img src={video.video_image} alt="..." />
              <div className="video--content">
                <h2>{video.title}</h2>
                <p>{video.video_description}</p>
                {video === course.videos[0] ? (
                  <Link
                    to={`/courses/${course._id}/play-video/${
                      video.videoUrl.split("/")[2]
                    }`}
                  >
                    <button>Click here to view video</button>
                  </Link>
                ) : (
                  ""
                )}
                {video !== course.videos[0] &&
                course.paid &&
                course.user.some((el) => el.username === username) ? (
                  <Link
                    to={`/courses/${course._id}/play-video/${
                      video.videoUrl.split("/")[2]
                    }`}
                  >
                    <button>Click here to view video</button>
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseItem;
