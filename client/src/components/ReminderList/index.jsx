import { Link } from 'react-router-dom';

const ReminderList = ({ reminders, title }) => {
  if (!reminders.length) {
    return <h3>No Secret Reminders Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {reminders &&
        reminders.map((reminder) => (
          <div key={reminder._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
            <span style={{ fontSize: '1rem' }}>
             A reminder created on {reminder.createdAt} about:
            </span>
            {reminder.reminderAbout} <br />
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
          </div>
        ))}
    </div>
  );
};

export default ReminderList;