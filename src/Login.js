import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Import the external CSS file

const Login = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    // Autogenerate an ID (you can implement your own logic here)

    try {
      // Create the user object to be sent in the request body
      const user = {"body":JSON.stringify({
        name,
        email,
      })};
      console.log(user)
      console.log("all okay till here")
      //console.log(process.env.API_SAVEUSER);

       const URL = process.env.REACT_APP_API_LINK + "/saveUser";
       console.log(process.env.REACT_APP_API_LINK)
      // Save user details to DynamoDB using API Gateway endpoint
      await axios.post(URL , user);
      console.log(process.env.REACT_APP_API_LINK)
      onLogin(email);
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };


  const generateId = () => {
    // Implement your logic here to generate an ID (e.g., using a UUID library)
    // For simplicity, you can use Date.now() for the demo
    return Date.now().toString();
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
