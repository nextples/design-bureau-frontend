import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import DataTable from '../../common/DataTable';
import CreateButton from '../../common/CreateButton';
import { fetchEmployees } from '../../utils/api';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const { setSelectedEntity, setCurrentView } = useContext(AppContext);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchEmployees();
            setEmployees(data);
        };
        loadData();
    }, []);

    const columns = [
        { header: 'ФИО', accessor: 'name' },
        { header: 'Должность', accessor: 'position' },
        { header: 'Отдел', accessor: 'department.name' }
    ];

    return (
        <div className="entity-list">
            <CreateButton onClick={() => setCurrentView('create')} />
            <DataTable
                data={employees}
                columns={columns}
                onRowClick={(item) => {
                    setSelectedEntity(item);
                    setCurrentView('details');
                }}
            />
        </div>
    );
};

export default EmployeeList;