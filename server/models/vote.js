const {Schema, model} = require('mongoose');


const voteSchema = new Schema({
  poll: {
    type: Schema.Types.ObjectId,
    ref: 'Poll',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  option1: {
    type: String,
    required: false,
  },
  option2: {
    type: String,
    required: false,
  },
});

const Vote = model('Vote', voteSchema);

module.exports = Vote;
