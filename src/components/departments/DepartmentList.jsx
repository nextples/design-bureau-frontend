import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../common/DataTable';
import CreateButton from '../../common/CreateButton';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const columns = [
        { header: 'Название', accessor: 'name' },
        { header: 'Руководитель', accessor: 'head.firstName' },
        { header: 'Сотрудников', accessor: 'totalEmployees' }
    ];

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetchDepartments();
                console.log('API Response:', response.data);
                setDepartments(response.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) return <div className="loading">Загрузка отделов...</div>;
    if (error) return <div className="error">Ошибка: {error}</div>;

    return (
        <div className="department-list">
            <CreateButton onClick={() => console.log('Create Department')} />
            <DataTable
                data={departments}
                columns={columns}
                onRowClick={(dept) => navigate(`/departments/${dept.id}`)}
            />
        </div>
    );
};

export default DepartmentList;