import { useState, useEffect, useContext } from "react";

import { useOutletContext, useParams } from "react-router-dom";
import {
  getPosts,
  getTodos,
  getComments,
  getUser,
} from "../../functions/getRequest";

function PostComments() {
  const { postId } = useParams();

  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await getComments(postId);
        console.log(response);
        setComments(response);
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    }

    fetchComments();
  }, []);

  return (
    <div>
      {/* {comments.map((comment) => {
        <div className="comment-container">
          <h5>{comment.name}</h5>
          <p>{comment.body}</p>
        </div>;
      })} */}
      hi
    </div>
  );
}

export default PostComments;
