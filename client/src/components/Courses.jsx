import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/courses', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }

        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="p-4">Loading courses...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  const handleViewCourse = (courseId) => {
    navigate(`/dashboard/courses/${courseId}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8 text-white">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-gray-200 dark:bg-slate-600 card flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">{course.name}</h3>
              <p className="text-gray-200 mb-4 line-clamp-3 text-sm">{course.summary}</p>
              <div className="flex justify-between items-center text-xs text-gray-200 mb-4">
                <span className="capitalize bg-purple-900 text-purple-200 px-3 py-1 rounded-full font-medium">
                  {course.difficulty}
                </span>
                <span>{course.totalDuration}</span>
              </div>
              <div className="flex justify-between items-center text-xs mb-4">
                <span className="text-gray-200">
                  {course.chapters.length} Chapters
                </span>
                {course.createdBy && (
                  <span className="text-gray-300 italic">
                    by {course.createdBy.username}
                  </span>
                )}
              </div>
            </div>
            <button
              className="btn-primary w-full mt-auto"
              onClick={() => handleViewCourse(course._id)}
            >
              View Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;