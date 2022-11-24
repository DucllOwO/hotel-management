import { createContext, useState } from "react";

export const PositionContext = createContext({});

export const PositionProvider = ({ children }) => {
  const [features, setFeatures] = useState([]);

  const [posName, setPosName] = useState("");

  const setOnChangePosName = (name) => {
    setPosName(name);
    console.log(posName);
  };

  return (
    <PositionContext.Provider
      value={{
        features,
        setFeatures,
        setOnChangePosName,
        posName,
      }}
    >
      {children}
    </PositionContext.Provider>
  );
};
