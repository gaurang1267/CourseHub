if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config({ path: './config.env' });
}

const express = require('express');
const mongoose = require('mongoose');
const courseRoutes = require('./routes/courses');
const userRoutes = require('./routes/users');
const videoRoutes = require('./routes/videos')
const bookingRoutes = require('./routes/bookings');
const ExpressError = require('./utils/ExpressError');
const errorController = require('./controllers/errorController');
const cors = require("cors");


const dbUrl = process.env.MONGO_DB_URL || 'mongodb://127.0.0.1:27017/CourseApp';

mongoose.set('strictQuery', true);
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();
app.use(express.json());
app.use(express.static('client/build'));
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use('/api/v1/transactions', bookingRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/courses/:id/videos', videoRoutes);
app.use('/api/v1/auth', userRoutes);

app.get('/', (req, res) => {
    res.send("hi");
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not Found', 404));
})

app.use(errorController);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})