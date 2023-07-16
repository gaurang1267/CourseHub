const mongoose = require('mongoose');
const video = require('./videos');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Course name is required']
    },
    description: {
        type: String,
        required: [true, 'Course description is required']
    },
    price: {
        type: Number,
        required: [true, 'Course price is required']
    },
    image: {
        type: String,
        required: [true, 'Course image is required']
    },
    paid: {
        type: Boolean,
        default: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    folderUri: {
        type: String,
    },
    user: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }
    ],
    videos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Videos'
        }
    ]
});

courseSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await video.deleteMany({
            _id: {
                $in: doc.videos
            }
        })
    }
})

module.exports = mongoose.model('Courses', courseSchema);