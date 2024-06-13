import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';

function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <div className="App">
        <Switch>
        {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <EmployeeList />
          <button className="btn btn-primary mb-3" onClick={handleLogout}>Logout</button>
        </div>
      )}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
