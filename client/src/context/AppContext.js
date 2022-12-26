import { createContext, useState } from "react";
import LocalStorage from "../Utils/localStorage";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(LocalStorage.getItem("user"));

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
