// Context.js
import React, { createContext, useState } from "react";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [value, setValue] = useState(null);

  return <MyContext.Provider value={{ value }}>{children}</MyContext.Provider>;
};

export const useMyContext = () => React.useContext(MyContext);
