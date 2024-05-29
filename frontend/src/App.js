import React, {useState, useEffect} from 'react';

function App() {

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data when component mounts
    fetchUserData();
  }, []); // Empty dependency array to run only once when component mounts

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
      // Handle error
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

      const data = await response.text();
      alert(data);
    } catch (error) {
      console.error('There was an error submitting the form!', error);
      alert('Error submitting the form');
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
      <br></br>
      <br></br>
      
      <hr>
      </hr>

      
        <h1>Get Method</h1>
        <h2>Users:</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name} - {user.age}</li>
        ))}
      </ul>
    

       
      
    </div>
  );
}

export default App;
