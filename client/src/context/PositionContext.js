import { createContext, useState } from "react";

export const PositionContext = createContext({});

export const PositionProvider = ({ children }) => {
  const [features, setFeatures] = useState([]);
  const [featuresExpandTable, setFeaturesExpandTable] = useState([]);
  const [isFeaturesError, setIsFeaturesError] = useState(null);

  return (
    <PositionContext.Provider
      value={{
        features,
        setFeatures,
        isFeaturesError,
        featuresExpandTable,
        setFeaturesExpandTable,
        setIsFeaturesError,
      }}
    >
      {children}
    </PositionContext.Provider>
  );
};
