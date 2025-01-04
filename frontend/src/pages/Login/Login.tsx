import { useState } from 'react';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
      <div className="login-container">
        <img className="login-image" src="/images/poster.png" alt="Placeholder"/>
        <div className="login-form">
          <div className="login-header">
            <h2>Log In</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Participant ID</label>
              <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="P-000..."
                  required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
              />
            </div>
            <button type="submit" className="login-button">
              <div className="login-button-background"></div>
              <div className="login-button-foreground"></div>
              <div className="login-button-text">Log In</div>
            </button>
          </form>
        </div>
      </div>
  );
}

export default Login;