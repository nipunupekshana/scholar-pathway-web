
import React from 'react';
import { Course } from '../contexts/CourseContext';
import { useAuth } from '../contexts/AuthContext';

interface CourseCardProps {
  course: Course;
  onEnroll?: () => void;
  onUnenroll?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isEnrolled?: boolean;
  isManageable?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEnroll,
  onUnenroll,
  onEdit,
  onDelete,
  isEnrolled = false,
  isManageable = false,
}) => {
  const { currentUser } = useAuth();
  const isStudent = currentUser?.role === 'student';
  const spotsLeft = course.capacity - course.enrolled.length;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      {course.imageUrl && (
        <div className="h-48 overflow-hidden">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{course.description}</p>
        <div className="text-sm text-gray-500 mb-4">
          <p>Instructor: {course.instructor}</p>
          <p>Credits: {course.credits}</p>
          <p>
            Availability: {spotsLeft} / {course.capacity} spots left
          </p>
        </div>
        <div className="mt-auto">
          {isStudent && !isManageable && (
            <div>
              {isEnrolled ? (
                <button
                  onClick={onUnenroll}
                  className="w-full bg-destructive text-white py-2 px-4 rounded hover:bg-destructive/90 transition"
                >
                  Unenroll
                </button>
              ) : (
                <button
                  onClick={onEnroll}
                  className={`w-full py-2 px-4 rounded transition ${
                    spotsLeft > 0
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={spotsLeft <= 0}
                >
                  {spotsLeft > 0 ? 'Enroll Now' : 'Course Full'}
                </button>
              )}
            </div>
          )}
          {isManageable && (
            <div className="flex space-x-2">
              <button
                onClick={onEdit}
                className="flex-1 bg-secondary text-secondary-foreground py-2 px-4 rounded hover:bg-secondary/90 transition"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="flex-1 bg-destructive text-white py-2 px-4 rounded hover:bg-destructive/90 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
