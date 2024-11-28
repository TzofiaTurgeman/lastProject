import { useState, useEffect, useContext } from "react";

import { useOutletContext, useParams } from "react-router-dom";
import { getComments } from "../../functions/getRequest";

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

  return <div></div>;
}

export default PostComments;
