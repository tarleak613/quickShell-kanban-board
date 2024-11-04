import React from 'react';

import priorityImage0 from '../assests/No-priority.svg'; 
import priorityImage1 from '../assests/Low Priority.svg'; 
import priorityImage2 from '../assests/Medium Priority.svg'; 
import priorityImage3 from '../assests/High Priority.svg'; 
import priorityImage4 from '../assests/Urgent Priority grey.svg'; 

import TodoIcon from '../assests/To-do.svg';
import InProgressIcon from '../assests/in-progress.svg';
import BacklogIcon from '../assests/Backlog.svg';
import CancelledIcon from '../assests/Cancelled.svg';

const priorityImages = {
    0: priorityImage0,
    1: priorityImage1,
    2: priorityImage2,
    3: priorityImage3,
    4: priorityImage4,
}

function Card({ ticket, users, groupBy }) {
//   const assignedUser = users.find(user => user.id === ticket.userId);
  const priorityImage = priorityImages[ticket.priority];

  const getStatusIcon = (status) => {
    switch (status) {
        case 'todo':
            return <img src={TodoIcon} alt="Todo icon" className="status-icon-wrapper" />;
        case 'in progress':
            return <img src={InProgressIcon} alt="In Progress icon" className="status-icon-wrapper" />;
        case 'backlog':
            return <img src={BacklogIcon} alt="Backlog icon" className="status-icon-wrapper" />;
        case 'cancelled':
            return <img src={CancelledIcon} alt="Cancelled icon" className="status-icon-wrapper" />;
        default:
            return null;
    }
};

  console.log("this is group by data",groupBy);
  console.log("this is ticket status data",ticket.status);
  return (
    <div className="card">
         <p className='card-p'>{ticket.id}</p>
         {/* <p className='ticket-title'>{ticket.title}</p> */}
         <div style={{ display: 'flex', alignItems: 'center' }}>
                {(groupBy === 'userId' || groupBy === 'priority') && getStatusIcon(ticket.status.toLowerCase())}
                <p className="ticket-title" style={{ marginLeft: (groupBy === 'userId' || groupBy === 'priority') ? '8px' : '0' }}>
                    {ticket.title}
                </p>
        </div>

      
        <div className="tag-container" style={{ display: 'flex', alignItems: 'center' }}>
            
            {!(groupBy === 'priority') && priorityImage && (
                <img src={priorityImage} alt={`${ticket.priority} priority`} className="priority-icon" />
            )}
            <p className='card-p' style={{ marginLeft: '8px' }}>{ticket.tag[0]}</p>
        </div>
    </div>
  );
}

export default Card;
