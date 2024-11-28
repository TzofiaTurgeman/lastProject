export async function deleteComment(commentId) {
  const postOptions = {
    method: "DELETE",
    body: `id=${commentId}`,
  };

  try {
    const response = await fetch(
      `http://localhost:3000/comments/delete`,
      postOptions
    );
    if (!response.ok) {
      throw new Error("Couldn't delete the comment");
    } else {
      return "Comment deleted successfully";
    }
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

export async function deleteTodos(id) {
  const postOptions = {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": `application/json`,
    },
  };

  try {
    const response = await fetch(
      `http://localhost:3000/todos/`,
      postOptions
    );
    if (!response.ok) {
      throw new Error("Couldn't delete the todo");
    } else {
      return "Todo deleted successfully";
    }
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

export async function deletePost(id) {
  const postOptions = {
    method: "DELETE",
    body: `id=${id}`,
  };

  try {
    const response = await fetch(
      `http://localhost:3000/posts/delete`,
      postOptions
    );
    if (!response.ok) {
      throw new Error("couldn't delete post");
    } else {
      return "Post deleted successfully";
    }
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}
