
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCourses } from '../contexts/CourseContext';
import CourseCard from '../components/CourseCard';
import { toast } from 'sonner';
import { Search } from 'lucide-react';

const CoursesList: React.FC = () => {
  const { currentUser } = useAuth();
  const { courses, enrollInCourse, unenrollFromCourse } = useCourses();
  const [searchTerm, setSearchTerm] = useState('');

  const enrolledCourseIds = currentUser
    ? courses
        .filter((course) => course.enrolled.includes(currentUser.id))
        .map((course) => course.id)
    : [];

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnroll = (courseId: string) => {
    if (!currentUser) return;
    enrollInCourse(courseId, currentUser.id);
    toast.success('Successfully enrolled in course');
  };

  const handleUnenroll = (courseId: string) => {
    if (!currentUser) return;
    unenrollFromCourse(courseId, currentUser.id);
    toast.success('Successfully unenrolled from course');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Available Courses</h1>
        <p className="text-gray-600 mt-2">Browse and enroll in courses</p>
      </div>

      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search courses..."
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
              isEnrolled={enrolledCourseIds.includes(course.id)}
              onEnroll={() => handleEnroll(course.id)}
              onUnenroll={() => handleUnenroll(course.id)}
            />
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <p className="text-gray-500 text-lg">No courses found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesList;
