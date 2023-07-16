import React, {useState} from "react";
import "./VideoForm.css";
import {
  Form,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router-dom";
import * as tus from 'tus-js-client';
import axios from 'axios';
import { getAuthToken } from "../Utils/Auth";

const VideoForm = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [video_image, setImage] = useState(null);
  const [video_description, setDescription] = useState(null);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const {courseId} = useParams();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate(`/courses/${courseId}`);
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("video_image", video_image);
    formData.append("video_description", video_description);
       

    try {
      const token = getAuthToken();
      const response = await axios.post(
        "http://localhost:3000/api/v1/courses/" + courseId + "/videos",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
      const upload_url = response.data.upload.upload_link;

      const upload = new tus.Upload(file, {
        endPoint: "https://api.vimeo.com/me/videos",
        uploadUrl: upload_url,
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: {
          filename: file.name,
          filetype: file.type,
        },
        headers: {},
        onError: function (error) {
          console.log("Failed because: " + error);
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          let percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
          console.log(bytesUploaded, bytesTotal, percentage + "%");
        },
        onSuccess: function () {
          console.log("Download %s from %s", upload.file.filename, upload.url);
          navigate(`/courses/${courseId}`);
        },
      });

      upload.start();

      
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className="form">
      <Form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
        <h1>Add a new Video </h1>
        <p>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" name="title" value={title} onChange={handleTitleChange} required />
        </p>
        <p >
          <label htmlFor="file">Upload Video</label>
          <div className="input_container">
          <input name="file" type="file" id="file" onChange={handleFileChange} required />
          </div>
        </p>
        <p>
          <label htmlFor="video_image">Image</label>
          <input id="video_image" type="text" name="video_image" value={video_image} onChange={handleImageChange} required />
        </p>
        <p>
          <label htmlFor="video_description">Description</label>
          <textarea id="video_description" type="text" name="video_description" value={video_description} onChange={handleDescriptionChange} required />
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

export default VideoForm;


