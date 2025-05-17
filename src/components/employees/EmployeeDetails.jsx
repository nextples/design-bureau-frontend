import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const EmployeeDetails = () => {
    const { selectedEntity } = useContext(AppContext);

    return (
        <div className="details-panel">
            <h2>{selectedEntity.name}</h2>
            <div className="details-content">
                <p>Должность: {selectedEntity.position}</p>
                <p>Категория: {selectedEntity.category}</p>
                {/* Другие специфичные атрибуты */}
            </div>
            <div className="action-buttons">
                <button className="edit-btn">Редактировать</button>
                <button className="delete-btn">Удалить</button>
            </div>
        </div>
    );
};

export default EmployeeDetails;