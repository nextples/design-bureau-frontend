import React, { useEffect, useState } from 'react';
import { fetchEmployees } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../common/DataTable';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const columns = [
        { header: 'Имя', accessor: 'firstName' },
        { header: 'Фамилия', accessor: 'lastName' },
        { header: 'Должность', accessor: 'position.name' },
        { header: 'Тип', accessor: 'employeeType' }
    ];

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetchEmployees({
                    page: 0,
                    size: 20
                });
                console.log('API Response:', response.data);

                setEmployees(response.data.content || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) return <div>Загрузка...</div>;

    if (error) return <div>Ошибка: {error}</div>;

    if (!loading && !error && employees.length === 0) {
        return <div>Нет данных о сотрудниках</div>;
    }

    return (
        <div className="entity-list">
            <DataTable
                data={employees}
                columns={columns}
                onRowClick={(empl)  => navigate(`/employees/${empl.id}`)}
            />
        </div>
    );
};

export default EmployeeList;