import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState(null);
  const [formData, setFormData] = useState({
    topic: '',
    details: '',
    difficulty: 'beginner',
    duration: '',
    numChapters: 8
  });

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/courses/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to generate course');
      
      const course = await response.json();
      setGeneratedCourse(course);
    } catch (error) {
      console.error('Error generating course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/courses/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(generatedCourse)
      });

      if (!response.ok) throw new Error('Failed to save course');
      
      const savedCourse = await response.json();
      navigate(`/dashboard/courses/${savedCourse._id}`);
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleChapterUpdate = (index, field, value) => {
    const updatedCourse = { ...generatedCourse };
    updatedCourse.chapters[index][field] = value;
    setGeneratedCourse(updatedCourse);
  };

  if (generatedCourse) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-gray-800 card p-8 mb-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Review and Edit Course</h2>
            <button
              onClick={handleSave}
              className="btn-primary bg-green-600 hover:bg-green-700"
            >
              Save Course
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-200 mb-2">Course Name</label>
            <input
              type="text"
              value={generatedCourse.name}
              onChange={(e) => setGeneratedCourse({...generatedCourse, name: e.target.value})}
              className="input-field bg-gray-700 text-white"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-200 mb-2">Course Summary</label>
            <textarea
              value={generatedCourse.summary}
              onChange={(e) => setGeneratedCourse({...generatedCourse, summary: e.target.value})}
              className="input-field bg-gray-700 text-white h-36"
            />
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-white border-b border-gray-700 pb-3 mb-6">Chapters</h3>
            {generatedCourse.chapters.map((chapter, index) => (
              <div key={index} className="bg-gray-700 rounded-xl p-6 shadow-sm border border-gray-600">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Chapter {index + 1} Title
                  </label>
                  <input
                    type="text"
                    value={chapter.title}
                    onChange={(e) => handleChapterUpdate(index, 'title', e.target.value)}
                    className="input-field bg-gray-600 text-white"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-200 mb-2">Summary</label>
                  <textarea
                    value={chapter.summary}
                    onChange={(e) => handleChapterUpdate(index, 'summary', e.target.value)}
                    className="input-field bg-gray-600 text-white h-28"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Duration</label>
                  <input
                    type="text"
                    value={chapter.duration}
                    onChange={(e) => handleChapterUpdate(index, 'duration', e.target.value)}
                    className="input-field bg-gray-600 text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-2xl p-8 mb-10 text-white"> {/* Adjusted gradient, rounded, shadow, margin */}
        <h1 className="text-4xl font-bold mb-3">Create New Course</h1> {/* Increased size */}
        <p className="text-purple-100 text-lg">Design your perfect learning journey</p> {/* Lighter text, increased size */}
      </div>

      <form onSubmit={handleGenerate} className="card p-8"> {/* Using .card */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Course Topic
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => setFormData({...formData, topic: e.target.value})}
              className="input-field"
              placeholder="e.g., Advanced React Patterns"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Course Details
            </label>
            <textarea
              value={formData.details}
              onChange={(e) => setFormData({...formData, details: e.target.value})}
              className="input-field h-36"
              placeholder="Describe your course objectives, target audience, and special focus areas..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Difficulty Level
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                className="input-field bg-white"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Course Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="input-field"
                placeholder="e.g., 10 hours"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Number of Chapters (Default: 8)
            </label>
            <input
              type="number"
              value={formData.numChapters}
              onChange={(e) => setFormData({...formData, numChapters: parseInt(e.target.value)})}
              className="input-field"
              min="1"
              max="20"
            />
          </div>
        </div>

        <div className="mt-10"> {/* Increased margin */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center space-x-2" /* Using .btn-primary */
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating Course...
              </div>
            ) : (
              'Create Course'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;