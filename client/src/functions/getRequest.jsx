// import apiRequest from "./apiRequest";
// const Api_Url = "http://localhost:3000/";

export async function getPosts(userId) {
  try {
    const request = await fetch(
      `http://localhost:3000/posts/get?userId=${userId}`
    );
    if (!request.ok) throw Error("Did not get expected data");
    const requestJson = await request.json();
    return requestJson;
  } catch (err) {
    console.log(err);
    return err.message;
  }
}

export async function getAllPosts() {
  try {
    const request = await fetch(`http://localhost:3000/posts/all`);
    if (!request.ok) throw Error("Did not get expected data");
    const requestJson = await request.json();
    return requestJson;
  } catch (err) {
    console.log(err);
    return err.message;
  }
}

export async function getPost(postId) {
  try {
    const request = await fetch(`http://localhost:3000/posts?id=${postId}`);
    if (!request.ok) throw Error("Did not get expected data");
    const requestJson = await request.json();
    return requestJson;
  } catch (err) {
    console.log(err);
    return err.message;
  }
}

export async function getComments(postId) {
  try {
    const request = await fetch(
      `http://localhost:3000/comments?postId=${postId}`
    );
    if (!request.ok) throw Error("Did not get expected data");
    const requestJson = await request.json();
    return requestJson;
  } catch (err) {
    console.log(err);
    return err.message;
  }
}

export async function getTodos(userId) {
  try {
    const request = await fetch(`http://localhost:3000/todos?userId=${userId}`);
    if (!request.ok) throw Error("Did not get expected data");
    const requestJson = await request.json();
    return requestJson;
  } catch (err) {
    console.log(err);
    return err.message;
  }
}

export async function getUser(userId) {
  try {
    const request = await fetch(`http://localhost:3000/users?id=${userId}`);
    if (!request.ok) throw Error("Did not get expected data");
    const requestJson = await request.json();
    return requestJson;
  } catch (err) {
    console.log(err);
    return err.message;
  }
}

export async function getUsers() {
  try {
    const request = await fetch(`http://localhost:3000/users`);
    if (!request.ok) throw Error("Did not get expected data");
    const requestJson = await request.json();
    return requestJson;
  } catch (err) {
    console.log(err);
    return err.message;
  }
}
