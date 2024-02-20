import { gql } from '@apollo/client';

export const QUERY_REMINDERS = gql`
  query getReminders {
    reminders {
      _id
      reminderText
      reminderAbout
      createdAt
    }
  }
`;

export const QUERY_SINGLE_REMINDER = gql`
  query getSingleReminder($Id: ID!) {
    reminder(reminderId: $reminderId) {
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
