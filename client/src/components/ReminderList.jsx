import { Link } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { QUERY_REMINDERS, QUERY_SINGLE_REMINDER  } from "../utils/queries";
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const ReminderList = () => {
  const { loading, data } = useQuery(QUERY_REMINDERS, QUERY_SINGLE_REMINDER );
  const reminders = data?.reminders || [];

  if (!reminders.length) {
  return <h3>Your Secret Reminders...</h3>;
 }

  return (
    <div>
      
      {reminders &&
        reminders.map((reminder) => (
          <div key={reminder._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-1">
            <span >
             A reminder created on {reminder.createdAt} about: {reminder.reminderAbout}
            </span>
            
            </h4>
            <div className="card-body bg-light p-2">
              <p>{reminder.reminderText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/reminders/${reminder._id}`}
              
            >
              Add a comment to this reminder...
            </Link>
            <div className="my-5">
        <CommentList reminderId={reminder.comments} />
      </div>
            <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm reminderId={reminder._id} />
      </div>
          </div>
        ))}
    </div>
  );
};

export default ReminderList;