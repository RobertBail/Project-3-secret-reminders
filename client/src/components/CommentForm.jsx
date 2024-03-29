import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {
  Container,
  Card,
  Button,
  Form,
  Row,
  Col
} from 'react-bootstrap';

import { ADD_COMMENT } from '../utils/mutations';
import Auth from '../utils/auth';

const CommentForm = ({ reminderId }) => {
  const { username: userParam } = useParams();
  const [formState, setFormState] = useState({
    reminderId, 
   commentText: '',
  //createdAt,
  commentAuthor: Auth.loggedIn() && Auth.getProfile().data.username === userParam
 });
 // const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: { ...formState
        //  reminderId, 
         // commentText,
         // commentAuthor: 
         },
      });
      setCharacterCount(0);
      //setFormState ({reminderId, commentText: ''});
      setFormState ({ commentText: ''});
      //setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      //setCommentText(value);
      setFormState({ ...formState, [name]: value });
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h4>Any comments on this reminder?</h4>
      {Auth.loggedIn() ? (
        <>

      <p
        className={`m-1 ${
          characterCount === 280 || error ? 'text-danger' : ''
        }`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12 col-lg-9">
          <textarea
            name="commentText"
            placeholder="Add your comment..."
            value={formState.commentText}
            className="form-input w-100"
            style={{ lineHeight: '1.5' }}
            onChange={handleChange}
          ></textarea>
        </div>

        
          <button className="btn btn-primary btn-block py-3" type="submit">
            Add Comment
          </button>
        
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

export default CommentForm;