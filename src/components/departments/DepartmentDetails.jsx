import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDepartmentDetails } from '../../utils/api';
import DataTable from '../../common/DataTable';

const DepartmentDetails = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const employeeColumns = [
        { header: 'ФИО', accessor: 'firstName' },
        { header: 'Должность', accessor: 'position.name' },
        { header: 'Тип', accessor: 'employeeType' }
    ];

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await getDepartmentDetails(id);
                setDepartment(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    if (loading) return <div className="loading">Загрузка данных отдела...</div>;
    if (error) return <div className="error">Ошибка: {error}</div>;

    return (
        <div className="department-details">
            <div className="header">
                <h2>{department.name}</h2>
                <div className="actions">
                    <button className="edit-btn">Редактировать</button>
                    <button className="delete-btn">Удалить</button>
                </div>
            </div>

            <div className="section">
                <h3>Основная информация</h3>
                <p>Руководитель: {department.head?.firstName || 'Не назначен'}</p>
                <p>Общее число сотрудников: {department.totalEmployees}</p>
            </div>

            <div className="section">
                <h3>Сотрудники отдела</h3>
                <DataTable
                    data={department.employees || []}
                    columns={employeeColumns}
                    emptyMessage="Нет сотрудников в отделе"
                />
            </div>
        </div>
    );
};

export default DepartmentDetails;