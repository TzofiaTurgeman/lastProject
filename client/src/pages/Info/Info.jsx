import { useContext } from "react";
import { CurrentUserContext } from "../../context/currentUser";
// import "../../info.css";
import Navbar from "../Navber/Navber";

function Info() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="profileContainer">
      <div className="profileBox">
        <div className="profileHeader">info</div>
        <br/>
        <Navbar/>
        <br/>
        <div className="profileField ">id: {currentUser.id}</div>
        <div className="profileField ">username: {currentUser.username}</div>
        <div className="profileField">name: {currentUser.name1}</div>
      </div>
    </div>
  );
}

export default Info;
