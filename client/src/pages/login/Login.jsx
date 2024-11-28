import { useState, useContext } from "react";
import { CurrentUserContext } from "../../context/currentUser";
import { loggingInUser } from "../../functions/postRequest";

import "../../login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useContext(CurrentUserContext);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await loggingInUser(username, parseInt(password));
      localStorage.setItem("logedIn", JSON.stringify(res));
      setCurrentUser(res);
    } catch (err) {
      console.error("error fetching user data:", err);
      alert("error fetching user data");
    }
  }

  return (
    <div className="wrapper">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <br />
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
