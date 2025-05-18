import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import EmployeeList from './components/employees/EmployeeList';
import DepartmentList from './components/departments/DepartmentList';
import EmployeeDetails from './components/employees/EmployeeDetails';
import DepartmentDetails from "./components/departments/DepartmentDetails.jsx";

const MainContent = () => (
    <div className="main-content">
        <Routes>
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/employees/:id" element={<EmployeeDetails />} />
            <Route path="/departments" element={<DepartmentList />} />
            <Route path="/departments/:id" element={<DepartmentDetails />} />
        </Routes>
    </div>
);

const App = () => (
    <Router>
        <div className="app-container">
            <Sidebar />
            <MainContent />
        </div>
    </Router>
);

export default App;