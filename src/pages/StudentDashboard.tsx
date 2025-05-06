
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCourses, Course } from '../contexts/CourseContext';
import CourseCard from '../components/CourseCard';
import { toast } from 'sonner';

const StudentDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { getStudentCourses, unenrollFromCourse } = useCourses();
  const navigate = useNavigate();

  const enrolledCourses = currentUser ? getStudentCourses(currentUser.id) : [];
  const totalCredits = enrolledCourses.reduce((sum, course) => sum + course.credits, 0);

  const handleUnenroll = (course: Course) => {
    if (!currentUser) return;
    unenrollFromCourse(course.id, currentUser.id);
    toast.success(`You've been unenrolled from ${course.title}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {currentUser?.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Enrolled Courses</h2>
          <p className="text-3xl font-bold text-primary">{enrolledCourses.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Total Credits</h2>
          <p className="text-3xl font-bold text-primary">{totalCredits}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Browse Courses</h2>
          <button
            onClick={() => navigate('/courses')}
            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Find New Courses
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Enrolled Courses</h2>
        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isEnrolled={true}
                onUnenroll={() => handleUnenroll(course)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <p className="text-gray-500 mb-4">You are not enrolled in any courses yet.</p>
            <button
              onClick={() => navigate('/courses')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Browse Available Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
