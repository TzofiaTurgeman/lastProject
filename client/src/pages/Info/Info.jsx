import { useContext } from "react";
import { CurrentUserContext } from "../../context/currentUser";
// import "../../info.css";

function Info() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="profileContainer">
      <div className="profileBox">
        <div className="profileHeader">info</div>
        <div className="profileField ">{currentUser.username}</div>
        <div className="profileField">{currentUser.name}</div>
      </div>
    </div>
  );
}

export default Info;
