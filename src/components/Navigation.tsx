
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-primary">
                Course<span className="text-gray-800">Registry</span>
              </Link>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
                {currentUser?.role === 'student' && (
                  <Link
                    to="/courses"
                    className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
                  >
                    Browse Courses
                  </Link>
                )}
                {currentUser?.role === 'instructor' && (
                  <Link
                    to="/instructor/courses"
                    className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
                  >
                    Manage Courses
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-medium text-gray-700">
                    {currentUser?.name} <span className="text-gray-500">({currentUser?.role})</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-destructive px-2 py-1"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {currentUser?.role === 'student' && (
                  <Link
                    to="/courses"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Browse Courses
                  </Link>
                )}
                {currentUser?.role === 'instructor' && (
                  <Link
                    to="/instructor/courses"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Manage Courses
                  </Link>
                )}
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="px-3">
                    <div className="text-base font-medium text-gray-800">{currentUser?.name}</div>
                    <div className="text-sm font-medium text-gray-500">{currentUser?.email}</div>
                    <div className="text-sm italic text-gray-500">Role: {currentUser?.role}</div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block px-3 py-2 w-full text-left text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-destructive"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
