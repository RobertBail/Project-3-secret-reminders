const { User, Reminder } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {

    reminders: async () => {
      return Reminder.find().sort({ createdAt: -1 });
    },

    reminder: async (parent, { reminderId }) => {
      return Reminder.findOne({ _id: reminderId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('reminders');
      }
      throw AuthenticationError;
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
    addReminder: async (parent, { reminderText, reminderAbout }, context) => {
      if (context.user) {
        const reminder = await Reminder.create({
          reminderText,
          reminderAbout,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { reminders: reminder._id } }
        );

        return reminder;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },

    addComment: async (parent, { reminderId, commentText }, context) => {
      if (context.user) {
        return Reminder.findOneAndUpdate(
          { _id: reminderId },
          {
            $addToSet: {
              comments: { commentText },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },

    removeReminder: async (parent, { reminderId }, context) => {
      if (context.user) {
        const reminder = await Reminder.findOneAndDelete({
          _id: reminderId,
          reminderText,
          reminderAbout,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { reminders: reminder._id } }
        );

        return reminder;
      }
      throw AuthenticationError;
    },

    removeComment: async (parent, { reminderId, commentId }, context) => {
      if (context.user) {
        return Reminder.findOneAndUpdate(
          { _id: reminderId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentText,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;

    },
  },
};

module.exports = resolvers;
