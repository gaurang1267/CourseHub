const { promisify } = require('util');
const ExpressError = require("./utils/ExpressError");
const catchAsync = require("./utils/catchAsync");
const jwt = require('jsonwebtoken');
const User = require('./models/users');
const course = require('./models/courses');

module.exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    // console.log(token);

    if (!token) {
        return next(new ExpressError('You are not logged in! Please log in to get access', 401));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log(decoded);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new ExpressError('The user belonging to this token no longer exists.', 401));
    }

    req.user = currentUser;
    next();
});

module.exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ExpressError('You do not have permission to perform this action', 403));
        }
        if (req.user.role === 'artist' && !req.user.isApproved) {
            return next(new ExpressError('You do not have permission to perform this action', 403));
        }

        next();
    }
}

module.exports.verifyAuthor = async (req, res, next) => {
    const { id } = req.params;
    const findCourse = await course.findById(id);
    if (!findCourse.author.equals(req.user._id) && req.user.role !== 'admin') {
        return next(new ExpressError('You do not have permission to perform this action', 403));
    }
    next();
};
