import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { ADD_REMINDER } from '../utils/mutations';
import { QUERY_REMINDERS, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const ReminderForm = () => {
  const [formState, setFormState] = useState({
  reminderText: '',
  reminderAbout: '',
 });
 //const [reminderText, setReminderText, reminderAbout] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  // Set up the mutation with error handling support.
  // The useMutation hook allows providing the refetchQueries option to refetch specific queries after a mutation
  // This is useful to ensure that new data is displayed automatically. Otherwise, we would need to manually update the list at a higher component level, modify state, or implement custom caching behavior
  const [addReminder, { error }] = useMutation
  (ADD_REMINDER, {
    refetchQueries: [
      QUERY_REMINDERS,
      'getReminders',
      QUERY_ME,
      'me'

    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Perform the mutation and pass the form data object as arguments when the form is submitted.
    // Make sure that the object fields match the defined parameters in the ADD_THOUGHT mutation.
    try {
      const { data } = addReminder({
        variables: { ...formState },
      });

      // Instead of refreshing the page, the query dispatched at the src/pages/Home.jsx level is refetched, allowing the updated data to be passed down to the ThoughtList component for display. Then, we can directly clear the form state.
      setCharacterCount(0);
      setFormState({
        reminderText: '',
        reminderAbout: ''
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'reminderText' && value.length <= 280) {
      setFormState({ ...formState, [name]: value });
      setCharacterCount(value.length);
    } else if (name !== 'reminderText') {
      setFormState({ ...formState, [name]: value });
    }
  };


  return (
    <div>
      <h3>Add new reminder:</h3>
      {Auth.loggedIn() ? (
         <>
      <p
        className={`m-1 ${
          characterCount === 280 || error ? 'text-danger' : ''
        }`}
      >
        Character Count: {characterCount}/280
       
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12">
          <textarea
            name="reminderText"
            placeholder="Enter a new reminder..."
            value={formState.reminderText}
            className="form-input w-100"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="col-12 col-lg-9">
          <input
            name="reminderAbout"
            placeholder="Add who or what the reminder is about..."
            value={formState.reminderAbout}
            className="form-input w-100"
            onChange={handleChange}
          />
        </div>

        
          <button className="btn btn-primary btn-block py-3" type="submit">
            Add Secret Reminder
          </button>
        
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Please signup/login to add...
          </div>
        )}
      </form>
         </>
         ) : (
           <p>
             You need to be logged in to access. Please{' '}
             <Link to="/">login</Link> or <Link to="/">signup.</Link>
           </p>
         )}
   
    </div>
  );
};

export default ReminderForm;
