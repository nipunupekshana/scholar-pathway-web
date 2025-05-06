
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import StudentDashboard from './StudentDashboard';
import InstructorDashboard from './InstructorDashboard';

const Dashboard: React.FC = () => {
  const { currentUser, isAuthenticated } = useAuth();

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role === 'student') {
    return <StudentDashboard />;
  } else if (currentUser.role === 'instructor') {
    return <InstructorDashboard />;
  }

  // Fallback - should never reach here
  return <Navigate to="/" replace />;
};

export default Dashboard;
