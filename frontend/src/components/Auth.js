import React, { useState } from 'react';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert('User signed up');
      } else {
        alert('Error signing up');
      }
    } catch (error) {
      alert('Error signing up');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
      } else {
        alert(data);
      }
    } catch (error) {
      alert('Error logging in');
    }
  };

  return (
    <div className="App">
      <h1>React MongoDB Authentication</h1>
      {token ? (
        <div>
          <p>Authenticated</p>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignUp}>Sign Up</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
