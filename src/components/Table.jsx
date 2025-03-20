// components/Table.js
import React from 'react';
import './Table.css';
import Button from './Button';

const Table = ({
    columns,
    data,
    onEdit,
    onDelete,
    actions = true,
    emptyMessage = "No data available"
}) => {
    return (
        <div className="table-container">
            {data.length > 0 ? (
                <table className="data-table">
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th key={column.key}>{column.label}</th>
                            ))}
                            {actions && <th className="actions-column">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={row.id || index}>
                                {columns.map((column) => (
                                    <td key={`${row.id}-${column.key}`}>
                                        {column.render ? column.render(row) : row[column.key]}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="actions-cell">
                                        {onEdit && (
                                            <Button
                                                variant="secondary"
                                                size="small"
                                                onClick={() => onEdit(row)}
                                            >
                                                Edit
                                            </Button>
                                        )}
                                        {onDelete && (
                                            <Button
                                                variant="danger"
                                                size="small"
                                                onClick={() => onDelete(row)}
                                            >
                                                Delete
                                            </Button>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="empty-table">{emptyMessage}</div>
            )}
        </div>
    );
};

export default Table;