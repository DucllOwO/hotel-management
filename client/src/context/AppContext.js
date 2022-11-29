import { createContext, useState } from "react";
import LocalStorage from "../Utils/localStorage";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(LocalStorage.getItem("user"));

  const [features, setFeatures] = useState([]);

  const [posName, setPosName] = useState("");

  const setOnChangePosName = (name) => {
    setPosName(name);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        features,
        setFeatures,
        setOnChangePosName,
        posName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
