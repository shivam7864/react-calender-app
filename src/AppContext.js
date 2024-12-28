import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  const updateRole = (newRole) => {
    setRole(newRole);
  };

  return (
    <AppContext.Provider value={{ role, updateRole }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
