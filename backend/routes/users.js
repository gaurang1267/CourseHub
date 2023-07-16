const express = require('express');
const catchAsync = require('./../utils/catchAsync');
const ExpressError = require('./../utils/ExpressError');
const user = require('./../models/users');
const jose = require('jose');
const { protect, restrictTo } = require('./../middleware');
const axios = require('axios');

const router = express.Router();

router.post('/register', catchAsync(async (req, res, next) => {
    const newUser = new user({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });
    if (newUser.role === 'admin') {
        newUser.folderUri = '/users/200478931/projects/16612383';
    }
    const savedUser = await newUser.save();

    const token = await new jose.SignJWT({ userId: newUser._id }).setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(process.env.JWT_EXPIRES_IN)
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    })
    res.status(200).json({
        token,
        data: savedUser
    });

}));

router.post('/artists-register', catchAsync(async (req, res, next) => {
    const newUser = await user.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        BrandName: req.body.BrandName,
        logo: req.body.logo,
        role: 'artist',
    })
    const token = await new jose.SignJWT({ userId: newUser._id }).setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(process.env.JWT_EXPIRES_IN)
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    })
    res.status(200).json({
        token,
        data: newUser
    });
}));

router.post('/login', catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return next(new ExpressError('Please enter your username and password', 400));
    }
    const User = await user.findOne({ username }).select('+password');

    if (!User || !await User.correctPassword(password, User.password)) {
        return next(new ExpressError('Invalid username or password', 401));
    }
    const token = await new jose.SignJWT({ userId: User._id }).setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(process.env.JWT_EXPIRES_IN)
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    })
    res.status(201).json({
        token,
        data: User
    });
}));

router.get('/approve-artists', protect, restrictTo('admin'), catchAsync(async (req, res, next) => {
    const getArtists = await user.find({ role: 'artist' });
    res.status(200).json(getArtists);
}));

router.patch('/approve-artists/:id', protect, restrictTo('admin'), catchAsync(async (req, res) => {
    const { id } = req.params;
    const findUser = await user.findById(id);
    const response = await axios.post('https://api.vimeo.com/me/projects', {
        name: findUser.username,
        parent_folder_uri: '/users/200478931/projects/16530949'
    }, {
        headers: {
            Authorization: `Bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
            contentType: 'application/json',
        }
    });
    const folderUri = response.data.uri;
    const updatedUser = await user.findByIdAndUpdate(id, { $set: { isApproved: true, folderUri: folderUri } }, { new: true });

    res.status(200).json(updatedUser);
}));

module.exports = router;