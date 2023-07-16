const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Video title is required']
    },
    video_description: {
        type: String,
        required: [true, 'Video description is required']
    },
    video_image: {
        type: String,
        required: [true, 'Video image is required']
    },
    videoUrl: {
        type: String,
        required: true,
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
});

module.exports = mongoose.model('Videos', videoSchema);