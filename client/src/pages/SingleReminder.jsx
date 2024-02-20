// Import the `useParams()` hook from React Router
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_REMINDER } from '../utils/queries';

const SingleReminder  = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { reminderId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_REMINDER, {
    // Pass the `thoughtId` URL parameter into query to retrieve this thought's data
    variables: { reminderId: reminderId },
  });

  const reminder = data?.reminder || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        
        <span style={{ fontSize: '1rem' }}>
          A reminder created on {reminder.createdAt} about:
        </span>
        {reminder.reminderAbout} <br />
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {reminder.reminderText}
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={reminder.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm reminderId={reminder._id} />
      </div>
    </div>
  );
};

export default SingleReminder;