import { useContext, useState, useEffect } from "react";
import { NavLink, useSearchParams, Outlet } from "react-router-dom";

import { CurrentUserContext } from "../../context/currentUser";
import {
  getPosts,
  getAllPosts,
  getComments,
  getUsers,
} from "../../functions/getRequest";
import { deleteComment } from "../../functions/deleteRequest";
import { patchComment } from "../../functions/patchRequest";
import { addComments } from "../../functions/postRequest";

function Home() {
  let [searchParams, setSearchParams] = useSearchParams();

  const { currentUser } = useContext(CurrentUserContext);
  const [commentsVisibility, setCommentsVisibility] = useState({});
  const [comments, setComments] = useState({});
  const [postsVisibility, setPostsVisibility] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [commentsEditStatus, setCommentsEditStatus] = useState({});

  const [commentsNames, setCommentsNames] = useState({});
  const [commentsBody, setCommentsBody] = useState({});

  const postsFilter = searchParams.get("title");

  useEffect(() => {
    async function getUsersPosts() {
      try {
        // const responseUsers = await getUsers();
        // setAllUsers(responseUsers);
        const response = await getAllPosts();
        console.log(response);
        setPosts(response);
        setCommentsVisibility(
          response.reduce((acc, post) => {
            acc[post.id] = false;
            return acc;
          }, {})
        );
        setPostsVisibility(
          response.reduce((acc, post) => {
            acc[post.id] = false;
            return acc;
          }, {})
        );
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    }

    getUsersPosts();
  }, []);

  const displayedPosts = postsFilter
    ? posts.filter((post) =>
        post.title.toLowerCase().includes(textInput.toLowerCase())
      )
    : posts;

  if (posts.length === 0) {
    return <div>Loading...</div>;
  }

  // comments[post.id][0].name
  const postsElements = displayedPosts.map((post) => {
    return (
      <div key={`post-${post.id}`} className="post-container">
        <div className="post-details">
          <h4>{post.title}</h4>
          <h6>From: {post?.userName || "Unknown"}</h6>
          {postsVisibility[post.id] && <p>Body: {post.body}</p>}
          <p>Id: {post.id}</p>
          <button
            onClick={() =>
              setPostsVisibility((prev) => ({
                ...prev,
                [post.id]: !prev[post.id],
              }))
            }
          >
            {postsVisibility[post.id] ? "Hide post" : "Show post"}
          </button>

          {postsVisibility[post.id] && (
            <button
              onClick={async () => {
                const thisComments = await getComments(post.id);
                // console.log(thisComments);
                setComments((prev) => ({ ...prev, [post.id]: thisComments }));
                setCommentsVisibility((prev) => ({
                  ...prev,
                  [post.id]: !prev[post.id],
                }));
                setCommentsEditStatus((prev) => ({
                  ...prev,
                  ...thisComments.reduce((acc, comment) => {
                    acc[comment.id] = false;
                    return acc;
                  }, {}),
                }));
                setCommentsNames((prev) => ({
                  ...prev,
                  ...thisComments.reduce((acc, comment) => {
                    acc[comment.id] = comment.name;
                    return acc;
                  }, {}),
                }));
                setCommentsBody((prev) => ({
                  ...prev,
                  ...thisComments.reduce((acc, comment) => {
                    acc[comment.id] = comment.body;
                    return acc;
                  }, {}),
                }));
              }}
            >
              {commentsVisibility[post.id] ? "Hide comments" : "Show comments"}
            </button>
          )}
        </div>

        {commentsVisibility[post.id] && comments[post.id] && (
          <>
            {
              <button onClick={() => handleAddComment(post.id)}>
                Add comment
              </button>
            }
            {comments[post.id].map((comment) => {
              // console.log(comment);
              return (
                <div
                  key={`comment-${comment.id}`}
                  className="comment-container"
                >
                  {commentsEditStatus[comment.id] ? (
                    <h5>
                      Name:{" "}
                      <input
                        type="text"
                        value={commentsNames[comment.id]}
                        onChange={(e) => {
                          setCommentsNames((prev) => ({
                            ...prev,
                            [comment.id]: e.target.value,
                          }));
                        }}
                      />
                    </h5>
                  ) : (
                    <h5>Name: {commentsNames[comment.id]}</h5>
                  )}
                  {commentsEditStatus[comment.id] ? (
                    <h5>
                      Body:{" "}
                      <input
                        type="text"
                        value={commentsBody[comment.id]}
                        onChange={(e) => {
                          setCommentsBody((prev) => ({
                            ...prev,
                            [comment.id]: e.target.value,
                          }));
                        }}
                      />
                    </h5>
                  ) : (
                    <h5>Body: {commentsBody[comment.id]}</h5>
                  )}
                  <p>Email: {comment.email}</p>
                  {currentUser.id == post.userId && (
                    <button
                      onClick={() => handleDeleteComment(comment.id, post.id)}
                    >
                      Delete comment
                    </button>
                  )}
                  {currentUser.email === comment.email &&
                    !commentsEditStatus[comment.id] && (
                      <button
                        onClick={() => {
                          setCommentsEditStatus((prev) => ({
                            ...prev,
                            [comment.id]: true,
                          }));
                        }}
                      >
                        Edit comment
                      </button>
                    )}
                  {currentUser.email === comment.email &&
                    commentsEditStatus[comment.id] && (
                      <button
                        onClick={() => {
                          setCommentsEditStatus((prev) => ({
                            ...prev,
                            [comment.id]: false,
                          }));
                          patchComment(comment.id, {
                            name: commentsNames[comment.id],
                            body: commentsBody[comment.id],
                          });
                        }}
                      >
                        Save
                      </button>
                    )}
                </div>
              );
            })}
          </>
        )}
      </div>
    );
  });

  async function handleAddComment(postId) {
    console.log(postId);
    const thisPostId = postId;
    const thisEmail = currentUser.email;
    const commentName = prompt("Name");
    const commentBody = prompt("Body");
    try {
      const response = await addComments({
        postId: thisPostId,
        email: thisEmail,
        name: commentName ? commentName : "",
        body: commentBody ? commentBody : "",
      });

      console.log(response);
      console.log(commentsNames);

      setComments((prev) => ({
        ...prev,
        [postId]: [...prev[postId], response],
      }));

      setCommentsNames((prev) => ({
        ...prev,
        [response.id]: commentName, // Add the new comment ID and name
      }));
      setCommentsBody((prev) => ({
        ...prev,
        [response.id]: commentBody, // Add the new comment ID and body
      }));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async function handleDeleteComment(commentId, postId) {
    console.log(commentId);
    try {
      const response = deleteComment(commentId);
      console.log(comments);
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== commentId),
      }));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  function handleInputChange(e) {
    const newTextInput = e.target.value;
    setTextInput(newTextInput);
    setSearchParams({ title: newTextInput });
  }

  return (
    <div>
      <h3 className="ViewPosts">View Posts:</h3>
      <input
        className="search-home"
        placeholder="Search for posts..."
        type="text"
        value={textInput}
        onChange={handleInputChange}
      />
      <div className="All-posts-container">
        <div>{postsElements}</div>
      </div>
    </div>
  );
}

export default Home;
