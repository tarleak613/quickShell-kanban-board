export const groupTickets = (tickets, attribute) => {
    const grouped = tickets.reduce((acc, ticket) => {
        const key = ticket[attribute];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(ticket);
        return acc;
    }, {});

    //  for cancelled lists
    if (attribute === 'status') {
        if (!grouped['Cancelled']) {
            grouped['Cancelled'] = []; 
            }
    }
    return grouped;
};


  
export const sortTicketsByPriority = (tickets) => { //decreasing order 
    if (!Array.isArray(tickets)) return []; 
    return tickets.slice().sort((a, b) => b.priority - a.priority);
};

export const sortTicketsByTitle = (tickets) => { // for the title
    if (!Array.isArray(tickets)) return []; 
    return tickets.slice().sort((a, b) => a.title.localeCompare(b.title));
};
  

  export const getPriorityLabel = (priority) => { //for the priority base grouping
    const priorityMap = {
      4: 'Urgent',
      3: 'High',
      2: 'Medium',
      1: 'Low',
      0: 'No priority'
    };
    return priorityMap[priority] || 'Unknown';
  };
  