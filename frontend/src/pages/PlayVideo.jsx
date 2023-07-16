import React from "react";
import ReactPlayer from "react-player";
import { Play } from "phosphor-react";
import "./../components/PlayVideo.css";
import { useParams, useRouteLoaderData, Link } from "react-router-dom";
import { getUserFromLocalStorage } from "../Utils/Auth";
import { v4 as uuid } from "uuid";

const PlayVideo = () => {
  const ids = useParams();
  const videoId = ids.videoId;
  const courseId = ids.courseId;
  const data = useRouteLoaderData("course-detail");
  const token = useRouteLoaderData("root");
  const { username } = getUserFromLocalStorage();
  const id = uuid();
  return (
    <div
      className={
        token && data.paid && data.user.some((el) => el.username === username)
          ? ""
          : "player"
      }
    >
      {!token && (
        <h1 className="player--error">
          You should be logged in to view video!!
        </h1>
      )}
      {token && !data.user.some((el) => el.username === username) && (
        <h1 className="player--error">
          You must purchase the course to view the video
        </h1>
      )}
      {token &&
        data.paid &&
        data.user.some((el) => el.username === username) && (
          <div className="playerWrapper">
            <ReactPlayer
              id="MyId"
              className="reactPlayer"
              width="100%"
              height="100%"
              controls
              playing
              light="https://plus.unsplash.com/premium_photo-1671384378697-07cda21eafaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dmlkZW98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
              playIcon={
                <button>
                  <Play weight="fill" color="#000" size={40} />
                </button>
              }
              url={`https://vimeo.com/${videoId}`}
            ></ReactPlayer>
          </div>
        )}
      <Link to={`/courses/${courseId}`}>
        <button>Back to course</button>
      </Link>
    </div>
  );
};

export default PlayVideo;
