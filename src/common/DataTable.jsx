import React from "react";

const DataTable = ({ data = [], columns, onRowClick }) => {
    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((acc, part) => acc?.[part], obj) || '-';
    };

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
            {Array.isArray(data) && data.map((item, index) => (
                <tr key={index} onClick={() => onRowClick?.(item)}>
                    {columns.map((col) => (
                        <td key={col.accessor}>
                            {getNestedValue(item, col.accessor)}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default DataTable;