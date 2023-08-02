const { User, Password } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).select(
          "__v -password"
        );

        return user;
      }
      throw new AuthenticationError("You must login");
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Invalid login credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Invalid login credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    addPassword: async (parent, { password }, context) => {
      if (context.user) {
        const addedPw = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedPassword: password } },
          { new: true }
        );
        return addedPw;
      }
      throw new AuthenticationError("You must be logged in to add a password");
    },
    removePassword: async (parent, { passwordId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedPassword: passwordId } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError(
        "You must be logged in to delete passwords"
      );
    },
  },
};
module.exports = resolvers;
