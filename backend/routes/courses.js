const express = require('express');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { protect, restrictTo, verifyAuthor } = require('./../middleware');
const axios = require('axios');
const { v4: uuid } = require('uuid');
const course = require('../models/courses');
const booking = require('../models/bookings');
const router = express.Router();

router.get('/', catchAsync(async (req, res) => {
    const { search } = req.query;
    const queryObject = new Object();
    if (search) {
        queryObject.name = { $regex: search, $options: 'i' };
    }
    let result = course.find(queryObject).populate('user');
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const getAllCourses = await result;

    const totalCourses = await course.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalCourses / limit);

    res.status(200).json({ getAllCourses, totalCourses, numOfPages });
}));

router.get('/my-courses', catchAsync(async (req, res) => {
    const getAllCourses = await course.find({}).populate('user');
    res.status(200).json(getAllCourses);
}))

router.post('/', protect, restrictTo('admin', 'artist'), catchAsync(async (req, res) => {
    const newCourse = new course(req.body);
    newCourse.author = req.user._id;
    newCourse.user.push(req.user._id);
    newCourse.user.push("648b38edc6edcf97339cd578");
    try {
        const response = await axios.post('https://api.vimeo.com/me/projects', {
            name: newCourse.name,
            parent_folder_uri: req.user.folderUri,
        }, {
            headers: {
                Authorization: `Bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
                contentType: 'application/json',
            }
        });
        newCourse.folderUri = response.data.uri;
        // console.log(response.data);
    } catch (e) {
        // console.log(e);
    }
    // console.log(folderUri);
    const savedCourse = await newCourse.save();
    res.status(200).json(savedCourse);
}));

router.get('/:id', catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const Course = await course.findById(id).populate('videos').populate('user').populate('author');
    if (!Course) {
        next(new ExpressError('Course not found', 404));
    }
    res.status(200).json(Course);
}));

router.post('/:id/payment', protect, catchAsync(async (req, res) => {
    const { id } = req.params;
    const findCourse = await course.findById(id);
    const newBooking = await booking.create({
        order_id: uuid(),
        course: findCourse._id,
        user: req.user._id,
    });
    findCourse.user.push(req.user._id);
    await findCourse.save();
    res.status(200).json({
        orderDetails: newBooking,
        purchasedCourse: findCourse,
    });
}));

router.patch('/:id', protect, verifyAuthor, restrictTo('admin', 'artist'), catchAsync(async (req, res) => {
    const { id } = req.params;
    const updatedCourse = await course.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).json(updatedCourse);
}));

router.delete('/:id', protect, verifyAuthor, restrictTo('admin', 'artist'), catchAsync(async (req, res) => {
    const { id } = req.params;

    await course.findByIdAndDelete(id);

    res.status(200).json("Course is deleted");
}));

module.exports = router;