const { Schema, model } = require('mongoose');

const pollSchema = new Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    option1: {
        type: String,
        required: true,
    },
    option2: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    endTime: {
        type: Date,
        required: false,
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]

});

const Poll = model('Poll', pollSchema);

module.exports = Poll;