const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    savedPasswords: [Password]
}
type Password {
    _id: ID!
    loginTo: String!
    savedUsername: String!
    savedPassword: String!
}
type Auth {
    token: ID!
    user: User
}
type Query {
    user(userId: ID!): User
    me: User
    passwords: [Password]
}
type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPassword(loginTo: String!, savedUsername: String!, savedPassword: String!): User
    removePassword(passwordId: String!): User
}`

module.exports = typeDefs;
