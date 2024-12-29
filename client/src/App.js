import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import News from './pages/News';
import Projects from './pages/Projects';
import WebStore from './pages/WebStore';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import About from './pages/About';
import CreateProject from './pages/CreateProject';
import ProjectDetails from './components/projects/ProjectDetails';
import ToolDetails from './components/webstore/ToolDetails';
import NewsDetails from './components/news/NewsDetails';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <div className="min-h-screen bg-gradient-dark text-white">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/news" element={<News />} />
              <Route 
                path="/projects" 
                element={
                  <ProtectedRoute>
                    <Projects />
                  </ProtectedRoute>
                } 
              />
              <Route path="/webstore" element={<WebStore />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminRoute>
                      <Admin />
                    </AdminRoute>
                  </ProtectedRoute>
                }
              />
              <Route path="/about" element={<About />} />
              <Route 
                path="/projects/new" 
                element={
                  <ProtectedRoute>
                    <CreateProject />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/projects/:id" 
                element={
                  <ProtectedRoute>
                    <ProjectDetails />
                  </ProtectedRoute>
                } 
              />
              <Route path="/webstore/:id" element={<ToolDetails />} />
              <Route path="/news/:id" element={<NewsDetails />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
          <Toaster position="top-right" />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

// Add this component to protect admin routes
function AdminRoute({ children }) {
  const { currentUser } = useAuth();
  
  if (!currentUser?.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
}

export default App;
