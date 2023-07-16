const ExpressError = require('./../utils/ExpressError');

const handleCastError = err => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new ExpressError(message, 400);
}

const handleValidationError = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data ${errors.join(', ')}`;
    return new ExpressError(message, 400);
}

const handleJsonWebTokenError = err => new ExpressError('Invalid token please login again', 401);

const handleTokenExpiredError = err => new ExpressError('Token is expired! Please log in again', 401);

module.exports = (err, req, res, next) => {
    const { statusCode = 500 } = err;
    err.status = err.status || 'error';
    if (!err.message) {
        err.message = 'Oh no, Something went wrong!';
    }
    if (err.name === 'CastError') {
        err = handleCastError(err);
    }
    if (err.name === 'ValidationError') {
        err = handleValidationError(err);
    }
    if (err.name === 'JsonWebTokenError') {
        err = handleJsonWebTokenError(err);
    }
    if (err.name === 'TokenExpiredError') {
        err = handleTokenExpiredError(err);
    }
    res.status(statusCode).json({
        status: err.status,
        messsage: err.message,
        stack: err.stack
    });

    // res.status(statusCode).json(err);
}
