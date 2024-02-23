import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import ReminderList from "../components/ReminderList";
import ReminderForm from "../components/ReminderForm";
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { QUERY_USER, QUERY_ME, QUERY_REMINDERS } from '../utils/queries';

import Auth from '../utils/auth';


//import { QUERY_REMINDERS } from "../utils/queries";

const ProfileReminders = () => {

  const { username: userParam } = useParams();
  //const { loading, data } = useQuery(QUERY_REMINDERS);

  //const reminders = data?.reminders || [];
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }, QUERY_REMINDERS
  });
  
  const user = data?.me || data?.user || {};


  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }


  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to access...
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5">
          <ReminderList
            reminders={user.reminders}
            title={`Your secret reminders...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <ReminderForm />
          </div>
        )}
      </div>
    </div>
  );
};


export default ProfileReminders ;
