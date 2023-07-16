const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    order_id: {
        type: 'String',
        required: true,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Courses',
        autopopulate: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        autopopulate: true,
    },

}, { timestamps: true });

bookingSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Bookings', bookingSchema);