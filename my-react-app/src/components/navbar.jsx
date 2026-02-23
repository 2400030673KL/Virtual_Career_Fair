import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkTheme(true);
      document.body.classList.add('dark-theme');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    if (!isDarkTheme) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-wrapper">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">💼</span>
            <span className="navbar-title">VirtualCareerFair</span>
          </Link>
          <Link to="/" className="navbar-link">
            <span className="calendar-icon">📅</span>
            Career Fairs
          </Link>
        </div>

        <nav className="navbar-menu">
          <div className="theme-toggle-container">
            <label className="theme-toggle">
              <input 
                type="checkbox" 
                checked={isDarkTheme} 
                onChange={toggleTheme}
              />
              <span className="toggle-slider"></span>
              <span className="toggle-icon sun">☀️</span>
              <span className="toggle-icon moon">🌙</span>
            </label>
          </div>
          <Link to="/login">Login</Link>
          <Link to="/signup" className="btn-signup">Sign Up</Link>
        </nav>
      </div>
    </header>
  );
}