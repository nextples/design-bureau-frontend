import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import MainContent from './components/layout/MainContent';
import { AppProvider } from './context/AppContext';

const App = () => {
    return (
        <Router>
            <AppProvider>
                <div className="app-container">
                    <Sidebar />
                    <MainContent />
                </div>
            </AppProvider>
        </Router>
    );
};

export default App;