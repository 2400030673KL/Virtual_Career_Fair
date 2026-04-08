import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { api } from "./lib/api";

/* ===== USER COMPONENTS ===== */
import Navbar from "./components/navbar";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/login";
import Dashboard from "./components/Dashboard";
import Booths from "./components/booths";
import Booth from "./components/booth";
import CareerFairs from "./components/CareerFairs";
import RecruiterDashboard from "./components/RecruiterDashboard";

/* ===== ADMIN COMPONENTS ===== */
import AdminLogin from "./components/adminlogin";
import AdminDashboard from "./components/adminDashboard";
import ManageFairs from "./components/managefairs";
import ManageBooths from "./components/managebooths";
import Registrations from "./components/registrations";

export default function App() {
  const token = api.getAuthToken();
  const currentUser = api.getAuthUser();
  const role = currentUser?.role || localStorage.getItem("userType");
  const isAuthenticated = Boolean(token && currentUser);

  const defaultAuthedRoute = role === "admin"
    ? "/admin/dashboard"
    : role === "recruiter"
    ? "/recruiter/dashboard"
    : "/booths";

  const requireAuth = (element, requiredRole) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (requiredRole && role !== requiredRole) {
      return <Navigate to={defaultAuthedRoute} replace />;
    }

    return element;
  };

  const onlyGuest = (element) => {
    if (isAuthenticated) {
      return <Navigate to={defaultAuthedRoute} replace />;
    }
    return element;
  };

  return (
    <>
      {/* Top Navigation */}
      <Navbar />

      {/* Main Application Area */}
      <div className="app-container">
        <Routes>
          {/* ===== USER ROUTES ===== */}
          <Route path="/" element={<Home />} />
          <Route path="/career-fairs" element={<CareerFairs />} />
          <Route path="/signup" element={onlyGuest(<SignUp />)} />
          <Route path="/register" element={onlyGuest(<SignUp />)} />
          <Route path="/login" element={onlyGuest(<Login />)} />
          <Route path="/signin" element={onlyGuest(<Login />)} />
          <Route path="/dashboard" element={requireAuth(<Dashboard />)} />
          <Route path="/booths" element={<Booths />} />
          <Route path="/booth/:id" element={<Booth />} />

          {/* ===== RECRUITER ROUTES ===== */}
          <Route path="/recruiter/dashboard" element={requireAuth(<RecruiterDashboard />, "recruiter")} />

          {/* ===== ADMIN ROUTES ===== */}
          <Route path="/admin/login" element={onlyGuest(<AdminLogin />)} />
          <Route path="/admin/signin" element={onlyGuest(<AdminLogin />)} />
          <Route path="/admin/dashboard" element={requireAuth(<AdminDashboard />, "admin")} />
          <Route path="/admin/fairs" element={requireAuth(<ManageFairs />, "admin")} />
          <Route path="/admin/booths" element={requireAuth(<ManageBooths />, "admin")} />
          <Route path="/admin/registrations" element={requireAuth(<Registrations />, "admin")} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}