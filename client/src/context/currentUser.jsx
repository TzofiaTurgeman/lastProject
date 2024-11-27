import { createContext, useState } from "react";

export const CurrentUserContext = createContext();

export function CurrentUserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
