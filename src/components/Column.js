import React from 'react';
import Card from './Card';

function Column({ title, tickets, users, taskCount, groupBy }) {
    console.log("Tickets in Column:", tickets); // Debugging
  return (
    <div className="column">
      {/* <h2>{title}</h2> */}
      <p>
      {title} 
      {/* {taskCount > 0 && (<span style={{ color: '#999' }}>{` ${taskCount}`}</span>)} */}
      </p> 
      {tickets.map(ticket => (
        <Card key={ticket.id} ticket={ticket} users={users} groupBy={groupBy} />
      ))}
    </div>
  );
}

export default Column;
