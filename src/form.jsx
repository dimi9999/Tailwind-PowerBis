import React, { useState } from 'react';
import axios from 'axios';

const SharePointLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState([]);

  const handleLogin = async () => {
    try {
      // Construct the SharePoint REST API URL
      const siteUrl = 'https://your-sharepoint-site-url';
      const listName = 'UserList';
      const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items`;

      // Make the API request
      const response = await axios.get(apiUrl, {
        headers: {
          'Accept': 'application/json;odata=verbose',
        },
        auth: {
          username: username,
          password: password,
        },
      });

      // Extract user data from the API response
      const users = response.data.d.results.map(item => ({
        user: item.User,
        login: item.Login,
      }));

      // Update the state with the user data
      setUserData(users);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div>
      <h1>Login Form</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      <h2>User Data</h2>
      <ul>
        {userData.map((user, index) => (
          <li key={index}>
            User: {user.user}, Login: {user.login}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SharePointLoginForm;