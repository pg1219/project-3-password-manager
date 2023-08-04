const { User, Password } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });

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
    addPassword: async (
      parent,
      { loginTo, savedUsername, savedPassword },
      context
    ) => {
      console.log(context.user);
      console.log(savedPassword, savedUsername, loginTo);
      if (context.user) {
        const addedPw = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              savedPasswords: { savedPassword, savedUsername, loginTo },
            },
          },
          { new: true }
        );
        console.log("addedPass", addedPw);
        return addedPw;
      }
      throw new AuthenticationError("You must be logged in to add a password");
    },
    removePassword: async (parent, { loginTo }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedPasswords: { loginTo } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError(
        "You must be logged in to delete passwords"
      );
    },
    updatePassword: async (
      parent,
      { loginTo, savedUsername, savedPassword },
      context
    ) => {
      console.log(loginTo);
      console.log(savedPassword, savedUsername, loginTo);
      if (context.user) {
        const updatePw = await User.findOneAndUpdate(
          { _id: context.user._id, "savedPasswords.loginTo": loginTo },
          { $set: { "savedPasswords.$.loginTo": loginTo, "savedPasswords.$.savedPassword": savedPassword, "savedPasswords.$.savedUsername": savedUsername } },
          { new: true, runValidators: true }
        );
        console.log("updatePw", updatePw);
        return updatePw;
      }
      throw new AuthenticationError("You must be logged in to add a password");
    },
  },
};
module.exports = resolvers;
