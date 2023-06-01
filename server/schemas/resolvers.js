const { AuthenticationError } = require('apollo-server-express');
const { User, Poll, Vote } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
    user: async (parent, { username }) => {
      return await User.findOne({ username }).populate('polls');
    },
    polls: async () => {
      return await Poll.find();
    },
    poll: async (parent, { pollId }) => {
      return await Poll.findOne({ _id: pollId })
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate('polls');
      } throw new AuthenticationError('Not Authenticated')
    },
    votes: async () => {
      return await Vote.find();
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.log(err);
        throw new Error('Failed to create user');
      }
    },
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError('Invalid email or password');
        }
        const correctPassword = await user.isCorrectPassword(password);
        if (!correctPassword) {
          throw new AuthenticationError('Invalid email or password');
        }
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.log(err);
        throw new Error('Failed to login');
      }
    },
    createPoll: async (parent, { pollId, value }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not Authenticated');
      }
      try {
        const user = await User.findById(context.user._id);
        const poll = await Poll.create({ _id: pollId, creator: user._id, value });
        user.polls.push(poll);
        await user.save();
        return poll;
      } catch (err) {
        console.log(err);
        throw new Error('Failed to create poll');
      }
    },
    removePoll: async (parent, { pollId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not Authenticated');
      }
      try {
        const user = await User.findById(context.user._id);
        const poll = await Poll.findById(pollId);
        if (!poll) {
          throw new Error('Poll not found');
        }
        if (poll.creator.toString() !== user._id.toString()) {
          throw new AuthenticationError('Not authorized to remove this poll');
        }
        await poll.remove();
        user.polls.pull(pollId);
        await user.save();
        return poll;
      } catch (err) {
        console.log(err);
        throw new Error('Failed to remove poll');
      }
    },
    createVote: async (parent, { pollId, optionId }, context) => {
      // if (!context.user) {
      //   throw new AuthenticationError('Not Authenticated');
      // }
      
      try {
        //   const user = await User.findById(context.user._id);
        const user = await User.findById("6477820b424319c1f4f5b8b4");
        const poll = await Poll.findOne({ _id: pollId });
        if (!poll) {
          throw new Error('Poll not found');
        }

        // const existingVote = await Vote.findOne({ poll: poll._id, user: user._id });

        // if (existingVote) {
        //   throw new Error('you already voted bishhh');
        // }

        const vote = await Vote.create({ poll: poll._id, user: user._id, option: optionId });
        return vote;
      } catch (err) {
        console.log(err);
        throw new Error('Failed to create vote');
      }
    },
    // updateUser: async (parent, args, context) => {
    //   if (!context.user) {
    //     throw new AuthenticationError('Not Authenticated');
    //   }
  
    //   try {
    //     const user = await User.findByIdAndUpdate(
    //       context.user._id,
    //       { $inc: {eggplants: 1}},
    //       { new: true }
    //     );
  
    //     console.log(`Eggplants rewarded to user ${user.username}`);
    //     return user;
    //   } catch (err) {
    //     console.log(err);
    //     throw new Error('Failed to update user');
    //   }
    // },
  },
};

module.exports = resolvers;

