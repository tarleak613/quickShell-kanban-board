import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority');

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        setTickets(data.tickets);
        setUsers(data.users);
      });
  }, []);

  const handleGroupChange = (newGroup) => {
    setGroupBy(newGroup);
    localStorage.setItem('groupBy', newGroup);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    localStorage.setItem('sortBy', newSort);
  };

  return (
    <div className="App">
      <Board 
        tickets={tickets} 
        users={users}
        groupBy={groupBy} 
        sortBy={sortBy} 
        onGroupChange={handleGroupChange} 
        onSortChange={handleSortChange} 
      />
    </div>
  );
}

export default App;
