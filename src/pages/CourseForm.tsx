
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCourses, Course } from '../contexts/CourseContext';
import { toast } from 'sonner';

interface CourseFormData {
  title: string;
  description: string;
  credits: number;
  capacity: number;
}

const CourseForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const { currentUser } = useAuth();
  const { courseById, addCourse, updateCourse } = useCourses();
  const navigate = useNavigate();

  const initialFormState: CourseFormData = {
    title: '',
    description: '',
    credits: 3,
    capacity: 30,
  };

  const [formData, setFormData] = useState<CourseFormData>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode && id) {
      const course = courseById(id);
      if (course) {
        setFormData({
          title: course.title,
          description: course.description,
          credits: course.credits,
          capacity: course.capacity,
        });
      } else {
        toast.error('Course not found');
        navigate('/instructor/courses');
      }
    }
  }, [isEditMode, id, courseById, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'credits' || name === 'capacity' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast.error('You must be logged in');
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditMode && id) {
        updateCourse(id, formData);
        toast.success('Course updated successfully');
      } else {
        addCourse({
          ...formData,
          instructor: currentUser.name,
          instructorId: currentUser.id,
        });
        toast.success('Course created successfully');
      }
      navigate('/instructor/courses');
    } catch (error) {
      console.error('Error saving course:', error);
      toast.error('Failed to save course. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditMode ? 'Edit Course' : 'Create New Course'}
        </h1>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Course Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Course Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label htmlFor="credits" className="block text-sm font-medium text-gray-700">
                  Credits
                </label>
                <select
                  id="credits"
                  name="credits"
                  value={formData.credits}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                  Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  id="capacity"
                  min="1"
                  max="100"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="pt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/instructor/courses')}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? 'Saving...'
                : isEditMode
                ? 'Update Course'
                : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
