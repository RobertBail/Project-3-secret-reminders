const { User, Reminder } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return userData;
      }
      throw AuthenticationError;
    },
  
    reminders: async () => {
      return Reminder.find().sort({ createdAt: -1 });
    },

    reminder: async (parent, { reminderId }) => {
      return Reminder.findOne({ _id: reminderId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addReminder: async (parent, { reminderText, reminderAbout }) => {
      return Reminder.create({ reminderText, reminderAbout });
    },
    addComment: async (parent, { reminderId, commentText }) => {
      return Reminder.findOneAndUpdate(
        { _id: reminderId },
        {
          $addToSet: { comments: { commentText } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeReminder: async (parent, { reminderId }) => {
      return Reminder.findOneAndDelete({ _id: reminderId });
    },
    removeComment: async (parent, { reminderId, commentId }) => {
      return Reminder.findOneAndUpdate(
        { _id: reminderId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
