import React, { useState, useEffect } from 'react';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [users, setUsers] = useState([]);

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

      await response.json(); // response is not used, so await it to consume the promise
      setName('');
      setAge('');
      fetchUserData(); // fetch updated user list after adding a new user
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
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
      <h1>Get Method</h1>
      <h2>Users:</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.age} 
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
