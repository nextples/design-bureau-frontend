import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeDetails from '../employees/EmployeeDetails';
import DepartmentDetails from "../departments/DepartmentDetails.jsx";
import DepartmentList from "../departments/DepartmentList.jsx";
import EmployeeList from "../employees/EmployeeList";

const MainContent = () => {
    return (
        <div className="main-content">
            <Routes>
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/employees/:id" element={<EmployeeDetails />} />
                <Route path="/departments" element={<DepartmentList />} />
                <Route path="/departments/:id" element={<DepartmentDetails />} />
            </Routes>
        </div>
    );
};

export default MainContent;