import React, { useState } from 'react';
import Column from './Column';
import { groupTickets, sortTicketsByPriority, sortTicketsByTitle, getPriorityLabel } from '../utils/ticketUtils';


import DisplayToggle from '../assests/Display.svg';
import DisplayToggleDown from '../assests/down.svg';

import TodoIcon from '../assests/To-do.svg';
import InProgressIcon from '../assests/in-progress.svg';
import BacklogIcon from '../assests/Backlog.svg';
import CancelledIcon from '../assests/Cancelled.svg';

import NoPriorityIcon from '../assests/No-priority.svg';
import LowPriorityIcon from '../assests/Low Priority.svg';
import MediumPriorityIcon from '../assests/Medium Priority.svg';
import HighPriorityIcon from '../assests/High Priority.svg';
import UrgentPriorityIcon from '../assests/Urgent Priority colour.svg';

import AddIcon from '../assests/add.svg';
import ThreeDotIcon from '../assests/3-dot-menu.svg';

function Board({ tickets, users, onGroupChange, onSortChange }) {
    const [isDropdownOpen, setDropdownOpen] = useState(false); 
    const [groupBy, setGroupBy] = useState('status'); 
    const [sortBy, setSortBy] = useState('priority'); 
    const groupedTickets = groupTickets(tickets, groupBy); // Group tickets

    const sortTickets = (tickets, sortBy) => {  // Sorted tickets
        switch (sortBy) {
            case 'priority':
                return sortTicketsByPriority(tickets);
            case 'title':
                return sortTicketsByTitle(tickets);
            default:
                return tickets;
        }
    };

    const sortedGroupedTickets = Object.keys(groupedTickets).reduce((acc, key) => { //sorting with each group
        acc[key] = sortTickets(groupedTickets[key], sortBy); 
        return acc;
    }, {});

    const getUserNameById = (userId) => { // getting username by user ID
        const user = users.find(user => user.id === userId);
        return user ? user.name : userId;
    };

    const toggleDropdown = () => { // toggle dropdown visibility
        setDropdownOpen(prevState => !prevState);
    };

    const handleGroupChange = (value) => {
        setGroupBy(value);
        onGroupChange(value);
    };

    const handleSortChange = (value) => { // update sorting
        setSortBy(value);
        onSortChange(value);
    };

    const getIconByStatus = (status) => {
        switch (status) {
            case 'todo':
                return <img src={TodoIcon} alt="Todo icon" className="status-icon" />;
            case 'in progress':
                return <img src={InProgressIcon} alt="In Progress icon" className="status-icon" />;
            case 'backlog':
                return <img src={BacklogIcon} alt="Backlog icon" className="status-icon" />;
            case 'cancelled':
                return <img src={CancelledIcon} alt="Cancelled icon" className="status-icon" />;
            default:
                return null;
        }
    };

    const getIconByPriority = (priority) => {
        switch (priority) {
            case '0':
                return <img src={NoPriorityIcon} alt="No Priority" className="priority-icon" />;
            case '1':
                return <img src={LowPriorityIcon} alt="Low Priority" className="priority-icon" />;
            case '2':
                return <img src={MediumPriorityIcon} alt="Medium Priority" className="priority-icon" />;
            case '3':
                return <img src={HighPriorityIcon} alt="High Priority" className="priority-icon" />;
            case '4':
                return <img src={UrgentPriorityIcon} alt="Urgent Priority" className="priority-icon" />;
            default:
                return null;
        }
    };

    return (
        <div className="board">
            <div className="controls">
            <div className="display-toggle-container"> 
                <button onClick={toggleDropdown} className="display-button">
                    <span className="status-icon-wrapper">
                        <img src={DisplayToggle} alt="DisplayToggle icon" className="status-icon" />
                        Display
                        <img src={DisplayToggleDown} alt="DisplayToggle icon" className="status-icon" />
                    </span>
                </button>
                {isDropdownOpen && (
                    <div className="dropdown">
                        <div className="dropdown-item">
                            <label htmlFor="group-select">Grouping:</label>
                            <select 
                                id="group-select" 
                                onChange={(e) => handleGroupChange(e.target.value)} 
                                value={groupBy} 
                                style={{ marginLeft: '10px' }}
                            >
                                <option value="status">Status</option>
                                <option value="userId">User</option>
                                <option value="priority">Priority</option>
                            </select>
                        </div>
                        <div className="dropdown-item">
                            <label htmlFor="sort-select">Ordering:</label>
                            <select 
                                id="sort-select" 
                                onChange={(e) => handleSortChange(e.target.value)} 
                                value={sortBy} 
                                style={{ marginLeft: '10px' }}
                            >
                                <option value="priority">Priority</option>
                                <option value="title">Title</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>
            </div>
            
            <div className="columns">
                {Object.keys(sortedGroupedTickets).map(group => {
                     const title = groupBy === 'userId' ? getUserNameById(group) :  groupBy === 'priority' ? getPriorityLabel(group) : group.charAt(0).toUpperCase() + group.slice(1);
                    
                    return (
                        <Column 
                            key={group} 
                            title={
                                <div className="group-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    {groupBy === 'status' ? (
                                        <span className="status-icon-wrapper">
                                            {getIconByStatus(group.toLowerCase())}
                                        </span>
                                    ) : groupBy === 'priority' ? (
                                        <span className="status-icon-wrapper">
                                            {getIconByPriority(group)}
                                        </span>
                                    ) : null}
                                    
                                    <span style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                                        <span>{title}</span>
                                        <span className="task-count" style={{ marginLeft: '1rem' }}>{sortedGroupedTickets[group].length}</span> {/* Task Count */}
                                    </span>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span className="add" style={{ marginLeft: '8px' }}>
                                            <img src={AddIcon} alt="add icon" className="status-icon" />
                                        </span>
                                        <span className="three-dot" style={{ marginLeft: '8px' }}>
                                            <img src={ThreeDotIcon} alt="3-dot icon" className="status-icon" />
                                        </span>
                                    </div>
                                </div>
                            } 
                            tickets={sortedGroupedTickets[group] || []} 
                            users={users} 
                            taskCount={sortedGroupedTickets[group].length} 
                            groupBy={groupBy}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Board;
