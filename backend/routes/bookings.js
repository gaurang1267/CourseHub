const express = require('express');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { protect, restrictTo } = require('./../middleware');
const booking = require('./../models/bookings');
const course = require('./../models/courses');

const router = express.Router();

router.get('/users', protect, catchAsync(async (req, res) => {
    const { sort } = req.query;
    let result = booking.find({ user: req.user._id });
    if (sort === 'latest') {
        result = result.sort('-createdAt');
    }
    if (sort === 'oldest') {
        result = result.sort('createdAt');
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const getAllBookings = await result;

    const totalTransactions = await booking.countDocuments({ user: req.user._id });
    const numOfPages = Math.ceil(totalTransactions / limit);
    res.status(200).json({ getAllBookings, totalTransactions, numOfPages });
}));

router.get('/artists', protect, restrictTo('artist'), catchAsync(async (req, res) => {
    const { sort } = req.query;
    let getArtistBookings = booking.find({});
    let getAllBookings = [];

    if (sort === 'latest') {
        getArtistBookings = getArtistBookings.sort('-createdAt');
    }
    if (sort === 'oldest') {
        getArtistBookings = getArtistBookings.sort('createdAt');
    }
    // const page = Number(req.query.page) || 1;
    // const limit = Number(req.query.limit) || 5;
    // const skip = (page - 1) * limit;

    // getArtistBookings = getArtistBookings.skip(skip).limit(limit);

    const getBookings = await getArtistBookings;
    for (let i = 0; i < getBookings.length; i++) {
        if (getBookings[i].course.author.equals(req.user._id)) {
            getAllBookings.push(getBookings[i]);
        }
    }

    // const totalTransactions = getAllBookings.length;
    // const numOfPages = Math.ceil(totalTransactions / 5);

    res.status(200).json({ getAllBookings });
}));

router.get('/admin', protect, restrictTo('admin'), catchAsync(async (req, res) => {
    const { sort } = req.query;
    let result = booking.find({});
    if (sort === 'latest') {
        result = result.sort('-createdAt');
    }
    if (sort === 'oldest') {
        result = result.sort('createdAt');
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const getAllBookings = await result;

    const totalTransactions = await booking.countDocuments({});
    const numOfPages = Math.ceil(totalTransactions / limit);
    res.status(200).json({ getAllBookings, totalTransactions, numOfPages });
}));

module.exports = router;
