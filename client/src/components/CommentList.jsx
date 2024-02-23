import { useQuery, useMutation } from "@apollo/client";
//import { QUERY_SINGLE_REMINDER } from "../utils/queries";
import {REMOVE_COMMENT} from "../utils/mutations";

const CommentList = ({ comments = [] }) => {
  //const { loading, data } = useQuery(QUERY_SINGLE_REMINDER);
 // const comments = data?.comments|| [];
 
  if (!comments.length) 
  {
   
    //return <h4 className="p-5 display-inline-block">Additional comments:</h4>;

  return (
    <>
     
      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-light text-dark">
                <h5 className="card-body">
              
                  <span >
                  Comment created at: {comment.createdAt} 
                  </span>
                   
                </h5>
                <p className="card-body">{comment.commentText}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
}
export default CommentList;