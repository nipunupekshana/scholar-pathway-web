
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CourseProvider } from "./contexts/CourseContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CoursesList from "./pages/CoursesList";
import InstructorCourses from "./pages/InstructorCourses";
import CourseForm from "./pages/CourseForm";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Instructor route component
const InstructorRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (currentUser?.role !== 'instructor') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// Student route component
const StudentRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (currentUser?.role !== 'student') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          
          {/* Student routes */}
          <Route path="/courses" element={<StudentRoute><CoursesList /></StudentRoute>} />
          
          {/* Instructor routes */}
          <Route path="/instructor/courses" element={<InstructorRoute><InstructorCourses /></InstructorRoute>} />
          <Route path="/instructor/courses/new" element={<InstructorRoute><CourseForm /></InstructorRoute>} />
          <Route path="/instructor/courses/edit/:id" element={<InstructorRoute><CourseForm /></InstructorRoute>} />
          
          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <CourseProvider>
        <TooltipProvider>
          <AppRoutes />
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </CourseProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
