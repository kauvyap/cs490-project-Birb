import { createContext, useContext, useState } from 'react';

const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [isCurrentDate, setIsCurrentDate] = useState(false);

  const setAsCurrentDate = (value) => {
    setIsCurrentDate(value);
  };
  
  console.log("datecontext", isCurrentDate)

  return (
    <DateContext.Provider value={{ isCurrentDate, setAsCurrentDate }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDateContext = () => {
  return useContext(DateContext);
};
