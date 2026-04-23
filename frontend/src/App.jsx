import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import LandingPage from './pages/LandingPage';

const PrivateRoute = ({ children, roleRequired }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to={user.role === 'Teacher' ? "/teacher" : "/student"} />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to={user.role === 'Teacher' ? "/teacher" : "/student"} />} />
        
        <Route path="/teacher/*" element={
          <PrivateRoute roleRequired="Teacher">
            <TeacherDashboard />
          </PrivateRoute>
        } />
        
        <Route path="/student/*" element={
          <PrivateRoute roleRequired="Student">
            <StudentDashboard />
          </PrivateRoute>
        } />
        
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
