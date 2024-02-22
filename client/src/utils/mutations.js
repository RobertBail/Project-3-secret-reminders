import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
       
      }
    }
  }
`;

export const ADD_REMINDER = gql`
  mutation addReminder($reminderText: String!, $reminderAbout: String!) {
    addReminder(reminderText: $reminderText, reminderAbout: $reminderAbout) {
      _id
      reminderText
      reminderAbout
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($reminderId: ID!, $commentText: String!) {
    addComment(reminderId: $reminderId, commentText: $commentText) {
      _id
      reminderText
      reminderAbout
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
