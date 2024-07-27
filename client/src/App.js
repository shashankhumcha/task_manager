import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TaskPage from './pages/TaskPage';
import AddTask from './pages/AddTaskPage';
import ViewDetails from './pages/ViewDetails';
import EditTask from './pages/EditTask';
import RegisterPage from './pages/RegisterPage'; // Assuming you have a RegisterPage component
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = "282601366617-i2jti282ah524gq1pld63lp2dsk39kcc.apps.googleusercontent.com";

const App = () => {
  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tasks" element={isAuthenticated() ? <TaskPage /> : <Navigate to="/login" />} />
          <Route path="/add-task" element={isAuthenticated() ? <AddTask /> : <Navigate to="/login" />} />
          <Route path="/view-task/:id" element={isAuthenticated() ? <ViewDetails /> : <Navigate to="/tasks" />} />
          <Route path="/edit-task/:id" element={isAuthenticated() ? <EditTask /> : <Navigate to="/tasks" />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
