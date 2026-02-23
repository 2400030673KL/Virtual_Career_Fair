import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("student");
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
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
        
        <div className="signup-card">
        <div className="signup-icon">
          <span>💼</span>
        </div>
        
        <h2 className="signup-title">Create Your Account</h2>
        <p className="signup-subtitle">Join our virtual career fair platform</p>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              className="form-input"
              required
            />
          </div>

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
            <p className="form-hint">Must be at least 6 characters</p>
          </div>

          <div className="form-group">
            <label className="form-label">I am a...</label>
            
            <div className="radio-group">
              <label className={`radio-option ${userType === 'student' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="userType" 
                  value="student"
                  checked={userType === 'student'}
                  onChange={(e) => setUserType(e.target.value)}
                />
                <div className="radio-content">
                  <span className="radio-title">Student / Job Seeker</span>
                  <span className="radio-desc">Looking for career opportunities</span>
                </div>
              </label>

              <label className={`radio-option ${userType === 'recruiter' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="userType" 
                  value="recruiter"
                  checked={userType === 'recruiter'}
                  onChange={(e) => setUserType(e.target.value)}
                />
                <div className="radio-content">
                  <span className="radio-title">Recruiter</span>
                  <span className="radio-desc">Representing a company</span>
                </div>
              </label>

              <label className={`radio-option ${userType === 'admin' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="userType" 
                  value="admin"
                  checked={userType === 'admin'}
                  onChange={(e) => setUserType(e.target.value)}
                />
                <div className="radio-content">
                  <span className="radio-title">Administrator</span>
                  <span className="radio-desc">Managing career fairs</span>
                </div>
              </label>
            </div>
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>

          <p className="signup-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
      </div>
    </div>
  );
}
