import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [account, setAccount] = useState();

  const value = {
    account,
    setAccount
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
