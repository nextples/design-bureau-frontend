import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const menuItems = [
        { name: 'Сотрудники', path: '/employees' },
        { name: 'Отделы', path: '/departments' },
        { name: 'Проекты', path: '/projects' },
        { name: 'Договоры', path: '/contracts' },
        { name: 'Оборудование', path: '/equipment' },
        { name: 'Субподрядчики', path: '/subcontractors' }
    ];

    return (
        <nav className="sidebar">
            <div className="sidebar-header">
                <h3>Меню</h3>
            </div>
            <ul className="nav-list">
                {menuItems.map((item) => (
                    <li key={item.path}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Sidebar;