const { AuthenticationError } = require('apollo-server-express');
const { User, Poll, Vote } = require('../models');
const { signToken } = require('../');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find();
        },
        user: async (parent, {username}) => {
            return await User.findOne({username}).populate('polls');
        },
        polls: async () => {
          
            return await Poll.find();
        },
        poll: async (parent, {pollId}) => {
            return await Poll.findOne({_id: pollId})
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findOne({_id: context.user._id}).populate('polls');
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
    },
};

module.exports = resolvers;