import React, { useState } from 'react';
import Login from './Login';
import Form from './Form';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = (loggedInEmail) => {
    setLoggedIn(true);
    setEmail(loggedInEmail);
  };

  return (
    <div>
      {loggedIn ? (
        <Form email={email} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
