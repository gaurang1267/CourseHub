const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter a email address'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true
    },
    BrandName: {
        type: String,
    },
    logo: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'artist', 'user'],
        default: 'user'
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    folderUri: {
        type: String,
        default: 'null',
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        select: false
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

module.exports = mongoose.model('Users', userSchema);