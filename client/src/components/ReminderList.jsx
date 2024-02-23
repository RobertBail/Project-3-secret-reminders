import { Link } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { QUERY_REMINDERS, QUERY_SINGLE_REMINDER  } from "../utils/queries";
import { REMOVE_REMINDER, ADD_COMMENT, REMOVE_COMMENT } from '../utils/mutations';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import Auth from '../utils/auth';

const ReminderList = () => {
  const { loading, data } = useQuery(QUERY_REMINDERS, QUERY_SINGLE_REMINDER );
  const {deleteReminder} = useMutation(REMOVE_REMINDER)
  const reminders = data?.reminders || [];

  const handleDeleteReminder = async ( reminderId) => {
    
   const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
     return false;
    }

    try {
    const response = await deleteReminder({
        variables: { reminderId },
      });

   if (!response.ok) {
      throw new Error('something went wrong!');
    }
   deleteReminder(reminderId);
  
  } catch (err) {
   console.error(err);
  }
};

  if (!reminders.length) {
  return <h3>Your Secret Reminders...</h3>;
 }

  return (
    <>
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
              <Button className='btn-block btn-danger' onClick={() => handleDeleteReminder(reminder.reminder._id)}>
                      Delete reminder
              </Button>
            </div>
            
            <div className="my-5">
        <CommentList reminderId={reminder.comments} />
      </div>
            <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm reminderId={reminder._id} />
      </div>
          </div>
        ))}
    </div>
    </>
  );
};

export default ReminderList;