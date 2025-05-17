import React from 'react';

const DataTable = ({ data, columns, onRowClick }) => {
    return (
        <table className="data-table">
            <thead>
            <tr>
                {columns.map((col) => (
                    <th key={col.accessor}>{col.header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index} onClick={() => onRowClick(item)}>
                    {columns.map((col) => (
                        <td key={col.accessor}>
                            {col.accessor.split('.').reduce((obj, key) => obj?.[key], item)}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default DataTable;