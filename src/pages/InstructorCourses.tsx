
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCourses } from '../contexts/CourseContext';
import CourseCard from '../components/CourseCard';
import { toast } from 'sonner';
import { Search, Plus } from 'lucide-react';

const InstructorCourses: React.FC = () => {
  const { currentUser } = useAuth();
  const { getInstructorCourses, deleteCourse } = useCourses();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const instructorCourses = currentUser ? getInstructorCourses(currentUser.id) : [];

  const filteredCourses = instructorCourses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteCourse = (courseId: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteCourse(courseId);
      toast.success(`Course "${title}" has been deleted`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Your Courses</h1>
        <button
          onClick={() => navigate('/instructor/courses/new')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Plus className="h-5 w-5 mr-1" /> Create New Course
        </button>
      </div>

      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search your courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isManageable={true}
              onEdit={() => navigate(`/instructor/courses/edit/${course.id}`)}
              onDelete={() => handleDeleteCourse(course.id, course.title)}
            />
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              {searchTerm
                ? 'No courses found matching your search.'
                : "You haven't created any courses yet."}
            </p>
            <button
              onClick={() => navigate('/instructor/courses/new')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Create Your First Course
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorCourses;
