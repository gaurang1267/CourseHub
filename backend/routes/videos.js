const express = require('express');
const Video = require('../models/videos');
const Course = require('../models/courses');
const catchAsync = require('../utils/catchAsync');
const { protect, restrictTo, verifyAuthor } = require('./../middleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const axios = require('axios');

const router = express.Router({ mergeParams: true });

router.post('/', protect, verifyAuthor, restrictTo('admin', 'artist'), upload.single('file'), catchAsync(async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  // console.log(req.body);
  const video = new Video(req.body);
  const name = video.title;
  const folder_uri = course.folderUri;
  const uploadUrl = `https://api.vimeo.com/me/videos`;
  // console.log(req.file);
  const file = req.file;
  const fileSize = file.size;

  const response = await axios.post(uploadUrl, {
    upload: {
      approach: 'tus',
      size: fileSize,
    },
    embed: {
      buttons: {
        embed: false,
        like: false,
        share: false,
        watchlater: false,

      },
      end_screen: {
        type: 'empty',
      },
      logos: {
        custom: {
          active: true,
        },
        vimeo: false,

      },
      title: {
        name: 'hide',
        owner: 'hide',
        portrait: 'hide',
      }
    },
    name: name,
    folder_uri: folder_uri,
  }, {
    headers: {
      Authorization: `Bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.vimeo.*+json;version=3.4',
    },
  });

  // console.log(response.data);
  res.status(200).json(response.data);
  video.videoUrl = response.data.uri; 
  course.videos.push(video);
  await video.save();
  await course.save();
  res.redirect(`/api/v1/courses/${course._id}`);
}))



// router.delete('/:videoId', protect, verifyAuthor, restrictTo('admin', 'artist'), catchAsync(async (req, res) => {
//   const { id, videoId } = req.params;
//   await Course.findByIdAndUpdate(id, { $pull: { videos: videoId } });
//   await Video.findByIdAndDelete(videoId);
//   res.redirect(`/api/v1/courses/${id}`);
// }))

module.exports = router;