import React, { useState, useEffect } from 'react';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const userData = await response.json();
      setUsers(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await fetch(`http://localhost:5000/users/${userId}`, {
        method: 'DELETE'
      });
      setUsers(users.filter(user => user._id !== userId)); // Update state after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newUser = await response.json();
      setUsers([...users, newUser]); // Add the new user to the existing list
      setName('');
      setAge('');
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  const handleModifyUser = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/users/${editUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editName, age: editAge }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      fetchUserData(); // Fetch updated user list after modification
      setEditUserId(null); // Clear edit state
      setEditName('');
      setEditAge('');
    } catch (error) {
      console.error('There was an error modifying the user!', error);
    }
  };

  const startEditing = (user) => {
    setEditUserId(user._id);
    setEditName(user.name);
    setEditAge(user.age);
  };

  return (
    <div>
      <h1>Post method</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter your name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="Enter your age" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
          required 
        />
        <button type="submit">Submit</button>
      </form>
      <hr />
      <h1>Get & Delete Method</h1>
      <h2>Users:</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.age} 
            <button onClick={() => deleteUser(user._id)}>Delete</button>
            <button onClick={() => startEditing(user)}>Modify</button>
          </li>
        ))}
      </ul>
      {editUserId && (
        <form onSubmit={handleModifyUser}>
          <h2>Modify User</h2>
          <input 
            type="text" 
            placeholder="Enter new name" 
            value={editName} 
            onChange={(e) => setEditName(e.target.value)} 
            required 
          />
          <input 
            type="number" 
            placeholder="Enter new age" 
            value={editAge} 
            onChange={(e) => setEditAge(e.target.value)} 
            required 
          />
          <button type="submit">Save Changes</button>
          <button onClick={() => setEditUserId(null)}>Cancel</button>
        </form>
      )}
      <hr></hr>
    </div>
  );
}

export default App;
