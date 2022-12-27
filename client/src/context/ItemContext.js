import { createContext, useState } from "react";

export const ItemContext = createContext({});

export const ItemProvider = ({ children }) => {
  // const [features, setFeatures] = useState([]);
  // const [featuresExpandTable, setFeaturesExpandTable] = useState([]);
  // const [isFeaturesError, setIsFeaturesError] = useState(null);
  const [item, setItem] = useState([]);
  const [record, setRecord] = useState([]);

  return (
    <ItemContext.Provider
      value={{
        item,
        setItem,
        record,
        setRecord
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
