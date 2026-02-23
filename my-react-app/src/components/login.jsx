import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="character-section">
          <div className="animated-character">
            <div className="character-body">
              <div className="character-head"></div>
              <div className="character-torso"></div>
              <div className={`character-arms ${isPasswordFocus ? 'covering-eyes' : ''}`}>
                <div className="arm-left"></div>
                <div className="arm-right"></div>
              </div>
              <div className="character-legs">
                <div className="leg-left"></div>
                <div className="leg-right"></div>
              </div>
              <div className="character-suitcase"></div>
            </div>
          </div>
        </div>
        
        <div className="login-card">
        <div className="login-icon">
          <span>💼</span>
        </div>
        
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login to access your account</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              placeholder="your.email@example.com" 
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="form-input"
              onFocus={() => setIsPasswordFocus(true)}
              onBlur={() => setIsPasswordFocus(false)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

          <p className="login-footer">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
      </div>
    </div>
  );
}