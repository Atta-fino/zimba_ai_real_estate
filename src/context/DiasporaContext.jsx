import React, { createContext, useContext, useState } from 'react';

// 1. Create the context
const DiasporaContext = createContext(null);

// 2. Create the Provider component
export const DiasporaProvider = ({ children }) => {
  // For this development phase, we'll hardcode the user as a diaspora user.
  // In a real app, this would be derived from the user's authentication state (e.g., user.role === 'diaspora').
  const [isDiasporaUser, setIsDiasporaUser] = useState(true);

  // A simple function to toggle the state for development/testing purposes
  const toggleDiasporaMode = () => {
    console.log("Toggling Diaspora Mode for development.");
    setIsDiasporaUser(prev => !prev);
  };

  const value = {
    isDiasporaUser,
    toggleDiasporaMode, // Expose the toggle function
  };

  return (
    <DiasporaContext.Provider value={value}>
      {children}
    </DiasporaContext.Provider>
  );
};

// 3. Create the custom hook for easy consumption
export const useDiaspora = () => {
  const context = useContext(DiasporaContext);
  if (context === null) {
    throw new Error('useDiaspora must be used within a DiasporaProvider');
  }
  return context;
};
