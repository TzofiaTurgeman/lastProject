import { useContext } from "react";
import { CurrentUserContext } from "../../context/currentUser";
// import "../../info.css";
import Navbar from "../Navber/Navber";

function Info() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="profileContainer">
      <div className="profileBox">
      <h3 className="postsHeader">Info:</h3>
      <br/>
        <Navbar/>
        <br/>
        <div style={{fontSize:"23px"}} className="profileField ">id: {currentUser.id}</div>
        <div style={{fontSize:"23px"}} className="profileField ">username: {currentUser.username}</div>
        <div style={{fontSize:"23px"}} className="profileField">name: {currentUser.name1}</div>
      </div>
    </div>
  );
}

export default Info;
