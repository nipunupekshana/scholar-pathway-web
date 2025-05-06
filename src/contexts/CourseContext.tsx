
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth, User } from './AuthContext';

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string;
  credits: number;
  capacity: number;
  enrolled: string[]; // array of student IDs
  imageUrl?: string;
}

interface CourseContextType {
  courses: Course[];
  addCourse: (course: Omit<Course, 'id' | 'enrolled'>) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  enrollInCourse: (courseId: string, studentId: string) => void;
  unenrollFromCourse: (courseId: string, studentId: string) => void;
  getStudentCourses: (studentId: string) => Course[];
  getInstructorCourses: (instructorId: string) => Course[];
  courseById: (id: string) => Course | undefined;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

const COURSES_STORAGE_KEY = 'course_registration_courses';

// Sample course images
const DEFAULT_COURSE_IMAGES = [
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1232&q=80',
  'https://images.unsplash.com/photo-1584697964358-3e14ca57658b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1616400619175-5beda3a17896?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
];

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const storedCourses = localStorage.getItem(COURSES_STORAGE_KEY);
    if (!storedCourses) {
      // Initialize with sample courses if none exist
      const initialCourses: Course[] = [
        {
          id: '1',
          title: 'Introduction to Computer Science',
          description: 'Basic concepts of computer science and programming',
          instructor: 'John Instructor',
          instructorId: '1',
          credits: 3,
          capacity: 30,
          enrolled: [],
          imageUrl: DEFAULT_COURSE_IMAGES[0],
        },
        {
          id: '2',
          title: 'Advanced Mathematics',
          description: 'Complex mathematical concepts and problem-solving',
          instructor: 'John Instructor',
          instructorId: '1',
          credits: 4,
          capacity: 25,
          enrolled: [],
          imageUrl: DEFAULT_COURSE_IMAGES[1],
        },
        {
          id: '3',
          title: 'Introduction to Psychology',
          description: 'Foundation of psychological theories and practices',
          instructor: 'John Instructor',
          instructorId: '1',
          credits: 3,
          capacity: 35,
          enrolled: [],
          imageUrl: DEFAULT_COURSE_IMAGES[2],
        },
      ];
      setCourses(initialCourses);
      localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(initialCourses));
    } else {
      setCourses(JSON.parse(storedCourses));
    }
  }, []);

  // Save courses to localStorage whenever they change
  useEffect(() => {
    if (courses.length > 0) {
      localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses));
    }
  }, [courses]);

  const addCourse = (courseData: Omit<Course, 'id' | 'enrolled'>) => {
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString(),
      enrolled: [],
      imageUrl: DEFAULT_COURSE_IMAGES[Math.floor(Math.random() * DEFAULT_COURSE_IMAGES.length)],
    };
    setCourses((prev) => [...prev, newCourse]);
  };

  const updateCourse = (id: string, courseData: Partial<Course>) => {
    setCourses((prev) =>
      prev.map((course) => (course.id === id ? { ...course, ...courseData } : course))
    );
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  const enrollInCourse = (courseId: string, studentId: string) => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id === courseId && !course.enrolled.includes(studentId)) {
          return {
            ...course,
            enrolled: [...course.enrolled, studentId],
          };
        }
        return course;
      })
    );
  };

  const unenrollFromCourse = (courseId: string, studentId: string) => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            enrolled: course.enrolled.filter((id) => id !== studentId),
          };
        }
        return course;
      })
    );
  };

  const getStudentCourses = (studentId: string) => {
    return courses.filter((course) => course.enrolled.includes(studentId));
  };

  const getInstructorCourses = (instructorId: string) => {
    return courses.filter((course) => course.instructorId === instructorId);
  };

  const courseById = (id: string) => {
    return courses.find((course) => course.id === id);
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        addCourse,
        updateCourse,
        deleteCourse,
        enrollInCourse,
        unenrollFromCourse,
        getStudentCourses,
        getInstructorCourses,
        courseById,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};
