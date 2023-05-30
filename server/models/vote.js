const {Schema, model} = require('mongoose');
const Vote = model('Vote', voteSchema);

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

module.exports = Vote;
