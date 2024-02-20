const typeDefs = `
type User {
  _id: ID
  username: String
  email: String
  password: String
  reminders: [Reminder]!
}

  type Reminder {
    _id: ID
    reminderText: String
    reminderAbout: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
  }
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    reminders: [Reminder]!
    reminder(reminderId: ID!): Reminder
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addReminder(reminderText: String!, reminderAbout: String!): Reminder
    addComment(reminderId: ID!, commentText: String!): Reminder
    removeReminder(reminderId: ID!): Reminder
    removeComment(reminderId: ID!, commentId: ID!): Reminder
  }
`;

module.exports = typeDefs;
