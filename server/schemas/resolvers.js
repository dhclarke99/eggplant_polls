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
    },
    Mutation: {
        
    },
};

module.exports = resolvers;