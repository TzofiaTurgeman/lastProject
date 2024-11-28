import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../context/currentUser";


function Navbar() {
  const { currentUser,setCurrentUser } = useContext(CurrentUserContext);

  const navigate = useNavigate();

  const todos = () => {
    navigate(`/todos`);
  };
  const info = () => {
    navigate(`/info`);
  };
  const posts = () => {
    navigate(`/posts`);
  };
  const home = () => {
    navigate(`/`);
  };
  const logout = () => {
    // localStorage.setItem("currentUser", JSON.stringify(null));
    localStorage.setItem("logedIn", JSON.stringify(null));
    navigate("/", { replace: true });
    history.pushState(null, null, "/");
    setCurrentUser(null);
    window.onpopstate = function () {
      history.go(1);
    };
  };

  return (
    <div style={{display:"flex", flexDirection:"row", gap:"3px"}}>
      <button onClick={() => home()}>home</button>
      <button onClick={() => todos()}> todos </button>
      <button onClick={() => info()}> info </button>
      <button onClick={() => posts()}> posts </button>
      <button onClick={() => logout()}> logout </button>
    </div>
  );
}
export default Navbar;
