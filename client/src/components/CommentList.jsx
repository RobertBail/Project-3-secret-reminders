//import { useQuery } from "@apollo/client";
//import { QUERY_SINGLE_REMINDER } from "../utils/queries";

const CommentList = ({ comments = [] }) => {
  //const { loading, data } = useQuery(QUERY_SINGLE_REMINDER);
 // const comments = data?.comments|| [];
  console.log(comments);
  if (!comments.length) 
  {
   
    return <h4 className="p-5 display-inline-block">Additional comments:</h4>;
 }
  return (
    <>
     
      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-light text-dark">
                <h5 className="card-body">
              
                  <span >
                  Comment created at: {comment.createdAt} saying: {comment.commentText} 
                  </span>
                   
                </h5>
                
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;