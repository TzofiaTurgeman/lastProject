import { createContext, useState } from "react";

export const CurrentUserContext = createContext();

export function CurrentUserContextProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("logedIn")));
  console.log('user: ', user);


  const setCurrentUser=(user)=>{
    console.log('user: ', user);
    localStorage.setItem("logedIn",JSON.stringify(user))
    setUser(user);
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser: user, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
