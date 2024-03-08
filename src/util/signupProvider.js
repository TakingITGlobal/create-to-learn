import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState({});

    const updateData = (key, value) => {
      setData(prevData => {
          if (prevData[key] !== value) {
            return {...prevData, [key]: value};
          } 
          return prevData; 
      });
    };

    const contextValue = {
        data,
        updateData,
    };

    return (
      <DataContext.Provider value={contextValue}>
        {children}
      </DataContext.Provider>
    );
};