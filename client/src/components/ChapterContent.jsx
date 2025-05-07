import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ChapterContent = () => {
  const { courseId, chapterIndex } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [course, setCourse] = useState(null);  // Add this state

  useEffect(() => {
    const fetchChapterContent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Failed to fetch chapter content');

        const courseData = await response.json();
        setCourse(courseData);  // Store the full course data
        setChapter(courseData.chapters[chapterIndex]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChapterContent();
  }, [courseId, chapterIndex]);

  const getYoutubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleNext = () => {
    if (currentContentIndex < chapter.content.length - 1) {
      // Next resource in current chapter
      setCurrentContentIndex(prev => prev + 1);
    } else if (parseInt(chapterIndex) < course.chapters.length - 1) {
      // Go to next chapter
      navigate(`/dashboard/courses/${courseId}/chapters/${parseInt(chapterIndex) + 1}`);
      setCurrentContentIndex(0);
    } else {
      // All chapters completed, return to course page
      navigate(`/dashboard/courses/${courseId}`);
    }
  };

  if (loading) return <div className="p-4">Loading chapter content...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!chapter) return <div className="p-4">Chapter not found</div>;

  const currentContent = chapter.content[currentContentIndex];
  const videoId = getYoutubeVideoId(currentContent.videoUrl);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-white">{chapter.title}</h1>
      <div className="bg-gray-200 dark:bg-slate-600 card mb-8">
        <p className="text-gray-200 mb-2">{chapter.summary}</p>
        <span className="text-sm text-gray-400">{chapter.duration}</span>
      </div>

      <div className="bg-gray-200 dark:bg-slate-600 card mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Video Resource</h2>
        <div className="aspect-w-16 aspect-h-9 mb-6 shadow-lg rounded-lg overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={currentContent.videoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-[450px] rounded-lg"
          ></iframe>
        </div>
        <h3 className="font-semibold text-xl mb-3 text-white">{currentContent.videoTitle}</h3>
        
        <div className="mt-6 border-t border-gray-700 pt-6">
          <h2 className="text-2xl font-semibold mb-3 text-purple-400">Summary</h2>
          <p className="text-gray-200 leading-relaxed">{currentContent.summary}</p>
        </div>

        {currentContent.keyPoints.length > 0 && (
          <div className="mt-6 border-t border-gray-700 pt-6">
            <h2 className="text-2xl font-semibold mb-3 text-purple-400">Key Points</h2>
            <ul className="list-disc pl-6 space-y-1.5">
              {currentContent.keyPoints.map((point, i) => (
                <li key={i} className="text-gray-200 mb-1">{point}</li>
              ))}
            </ul>
          </div>
        )}

        {currentContent.codeBlocks.length > 0 && (
          <div className="mt-6 border-t border-gray-700 pt-6">
            <h2 className="text-2xl font-semibold mb-3 text-purple-400">Code Examples</h2>
            {currentContent.codeBlocks.map((block, i) => (
              <div key={i} className="mb-6">
                <h3 className="font-semibold text-gray-200 mb-2 capitalize">{block.language}</h3>
                <pre className="bg-gray-900 text-gray-200 p-4 rounded-lg overflow-x-auto shadow-md text-sm">
                  <code>{block.code}</code>
                </pre>
                <p className="mt-3 text-gray-300 text-sm">{block.explanation}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-between items-center border-t border-gray-700 pt-6">
          <span className="text-gray-300 text-sm">
            Resource {currentContentIndex + 1} of {chapter.content.length}
          </span>
          {(currentContentIndex < chapter.content.length - 1 || parseInt(chapterIndex) < course.chapters.length - 1) && (
            <button
              onClick={handleNext}
              className="btn-primary"
            >
              Next {currentContentIndex === chapter.content.length - 1 ? 'Chapter' : 'Resource'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterContent;