import { useContext, useState, useEffect } from "react";
import { NavLink, useSearchParams, Outlet } from "react-router-dom";

import { CurrentUserContext } from "../../context/currentUser";
import { getPosts, getComments } from "../../functions/getRequest";
import { deleteComment } from "../../functions/deleteRequest";
import { addComments, addPosts } from "../../functions/postRequest";
import { patchComment } from "../../functions/patchRequest";
import PostComments from "./PostComments";
// import "../../posts.css";

function Posts() {
  let [searchParams, setSearchParams] = useSearchParams();
  const { currentUser } = useContext(CurrentUserContext);
  const [commentsVisibility, setCommentsVisibility] = useState({});
  const [comments, setComments] = useState({});
  const [postsVisibility, setPostsVisibility] = useState({});
  const [commentsEditStatus, setCommentsEditStatus] = useState({});
  const [posts, setPosts] = useState([]);
  console.log("posts: ", posts);
  const [textInput, setTextInput] = useState("");
  const [commentsNames, setCommentsNames] = useState({});
  console.log("commentsNames: ", commentsNames);
  const [commentsBody, setCommentsBody] = useState({});
  console.log("commentsBody: ", commentsBody);
  const [postsEditStatus, setPhotosEditStatus] = useState({});

  const postsFilter = searchParams.get("title");

  useEffect(() => {
    async function getUsersPosts() {
      try {
        const response = await getPosts(currentUser.id);
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
    return (
      <>
        <p>It seems that you dont have any posts.</p>
        <button onClick={handleAddPost}>Add Post</button>
      </>
    );
  }

  // comments[post.id][0].name
  const postsElements = displayedPosts.map((post) => {
    // console.log(post);
    return (
      <div key={`post-${post.id}`} className="post-container">
        <div className="post-details">
          <h4>{post.title}</h4>
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
          <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
          {/* <button onClick={() => handleEditPost(post.id)}>Edit Post</button> */}
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
                  {
                    <button
                      onClick={() => handleDeleteComment(comment.id, post.id)}
                    >
                      Delete comment
                    </button>
                  }
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

  async function handleEditPost(postId) {}

  async function handleDeletePost(postId) {
    console.log(postId);
    try {
      console.log(posts);
      const response = deleteComment(postId);
      console.log(response);
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

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

  async function handleAddPost() {
    const postTitle = prompt("Title");
    const postBody = prompt("Body");
    try {
      const newPost = await addPosts({
        title: postTitle,
        body: postBody,
        userId: currentUser.id,
      });
      console.log("newPost: ", newPost);
      setPosts((prev) => [...prev, newPost]);
    } catch (err) {}
  }

  return (
    <div className="postsContainer">
      <div className="postsBox">
        <h3 className="postsHeader">Your Posts:</h3>
        <input
          placeholder="Search for posts..."
          type="text"
          value={textInput}
          onChange={handleInputChange}
          className="inputField"
        />
        <div className="All-posts-container">{postsElements}</div>
      </div>
    </div>
  );
}

export default Posts;
