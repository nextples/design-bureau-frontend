import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [currentView, setCurrentView] = useState('list');

    return (
        <AppContext.Provider value={{
            selectedEntity,
            setSelectedEntity,
            currentView,
            setCurrentView
        }}>
            {children}
        </AppContext.Provider>
    );
};