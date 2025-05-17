import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeesList from '../employees/EmployeeList';
import EmployeeDetails from '../employees/EmployeeDetails';
// Импортируйте аналогичные компоненты для других сущностей

const MainContent = () => {
    return (
        <div className="main-content">
            <Routes>
                <Route path="/employees" element={<EmployeesList />} />
                <Route path="/employees/:id" element={<EmployeeDetails />} />
                {/* Аналогичные маршруты для других сущностей */}
            </Routes>
        </div>
    );
};

export default MainContent;