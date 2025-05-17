import React from 'react';

const CreateButton = ({ onClick }) => {
    return (
        <button className="create-btn" onClick={onClick}>
            Создать новую запись
        </button>
    );
};

export default CreateButton;