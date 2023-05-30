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
  option: {
    type: String,
    required: true,
  },
});

const Vote = model('Vote', voteSchema);

module.exports = Vote;
