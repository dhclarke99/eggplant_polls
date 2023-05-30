const { Schema, model } = require('mongoose');

const pollSchema = new Schema({
    title: {
        type: string,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    options: [{
        type: String,
        required: true,
    }],
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
        required: true,
    },

});

const Poll = model('Poll', pollSchema);

module.exports = Poll;