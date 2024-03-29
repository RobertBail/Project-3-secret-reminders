import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
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
  const { reminderId } = useParams();
  const { loading, data } = useQuery(QUERY_REMINDERS, QUERY_SINGLE_REMINDER,{
      // pass URL parameter
      variables: { reminderId: reminderId },
    });
  const {removeReminder} = useMutation(REMOVE_REMINDER)
  const reminders = data?.reminders || [];

  const handleDeleteReminder = async ( _id) => {
    
   const token = Auth.loggedIn() ? Auth.getToken() : null;
//Auth.loggedIn() && Auth.getProfile().data.username === userParam
    if (!token) {
     return false;
    }

    try {
    const response = await removeReminder({
        variables: { _id },
      });

   if (!response.ok) {
      throw new Error('something went wrong!');
    }
    removeReminder(_id);
  
  } catch (err) {
   console.error(err);
  }
};

  if (loading) {
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
              <Button className='btn-block btn-danger' onClick={() => handleDeleteReminder(reminder._id)}>
                      Delete reminder
              </Button>
            </div>
         
      <div className="m-3 p-4" style={{ border: '4px solid #6aafa8' }}>
        <CommentForm reminderId={reminder._id} />
        </div>
       
        <div className="col-12 col-md-10 mb-5">
        <CommentList comments={reminder.comments} 
        title={`Additional comments...`}
        showTitle={true}/>
      </div>
       
          </div>
        ))}
    </div>
    </>
  );
};

export default ReminderList;