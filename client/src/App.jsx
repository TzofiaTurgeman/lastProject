import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./pages/login/Login.jsx";
import Posts from "./pages/Posts/Posts.jsx";
import Todos from "./pages/Todos/Todos.jsx";
import Home from "./pages/Home/Home.jsx";
import Info from "./pages/Info/Info.jsx";
import { useContext } from "react";
import { CurrentUserContext } from "./context/currentUser.jsx";

function App() {
  const { currentUser } = useContext(CurrentUserContext);
  console.log("currentUser: ", currentUser);

  return (
    <Router>
      <Routes>
        {currentUser ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="info" element={<Info />} />
            <Route path="posts" element={<Posts />} />
            <Route path="todos" element={<Todos />} />
          </>
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
