import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployeeDetails } from '../../utils/api';

const EmployeeDetails = () => {
    const { id } = useParams();

    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const loadData = async () => {
                setLoading(true);
                try {
                    const response = await getEmployeeDetails(id);
                    setEmployee(response.data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            loadData();
        }
    }, [id]);

    if (loading) return <div className="loading">Загрузка данных сотрудника...</div>;
    if (error) return <div className="error">Ошибка: {error}</div>;
    if (!employee) return <div className="info">Сотрудник не найден.</div>;

    return (
        <div className="details-panel employee-details">
            <h2>{employee.firstName} {employee.lastName}</h2>
            <div className="details-content section">
                <h3>Основная информация</h3>
                <p>Должность: {employee.position?.name || 'Не указана'}</p>
                <p>Тип сотрудника: {employee.employeeType || 'Не указан'}</p>
                <p>Отдел: {employee.department?.name || 'Не указан'}</p>
                {employee.employeeType === 'DESIGNER' && (
                    <p>Число авторских свидетельств: {employee.patentsCount || 0}</p>
                )}
                {employee.employeeType === 'ENGINEER' && (
                    <p>Руководит проектом/договором: Скоро будет</p>
                )}
            </div>
            <div className="action-buttons actions">
                <button className="edit-btn">Редактировать</button>
                <button className="delete-btn">Удалить</button>
            </div>
        </div>
    );
};

export default EmployeeDetails;