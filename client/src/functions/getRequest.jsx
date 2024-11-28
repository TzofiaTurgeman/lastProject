// import apiRequest from "./apiRequest";
// const Api_Url = "http://localhost:3000/";

export async function getPosts(userId) {
  try {
    const request = await fetch(
      // `http://localhost:3000/posts/all?userId=${userId}`
      `http://localhost:3000/posts/all/${userId}`
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

// export async function getPost(postId) {
//   try {
//     const request = await fetch(`http://localhost:3000/posts?id=${postId}`);
//     if (!request.ok) throw Error("Did not get expected data");
//     const requestJson = await request.json();
//     return requestJson;
//   } catch (err) {
//     console.log(err);
//     return err.message;
//   }
// }

export async function getComments(postId) {
  try {
    const request = await fetch(
      `http://localhost:3000/comments/get/${postId}`
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
  console.log('userIdingetreq: ', userId);
  try {

    const request = await fetch(`http://localhost:3000/todos/get/${userId}`);
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
    const request = await fetch(`http://localhost:3000/users/all/${userId}`);
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
    const request = await fetch(`http://localhost:3000/users/all`);
    if (!request.ok) throw Error("Did not get expected data");
    const requestJson = await request.json();
    return requestJson;
  } catch (err) {
    console.log(err);
    return err.message;
  }
}
