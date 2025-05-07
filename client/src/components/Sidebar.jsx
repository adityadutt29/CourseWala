import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="h-screen w-64 bg-slate-900 text-slate-200 fixed left-0 top-0 shadow-lg"> {/* Darker sidebar, lighter text, shadow */}
      <div className="p-5"> {/* Adjusted padding */}
        <h2 className="text-3xl font-bold mb-10 text-white text-center" style={{ fontFamily: "'Pacifico', cursive" }}>
          CourseWala
        </h2>
        {/* White title, increased margin */}
        <nav className="space-y-3"> {/* Adjusted spacing */}
          <Link
            to="/dashboard/courses"
            className="block py-3 px-4 rounded-lg transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white" /* Adjusted padding and hover */
          >
            Show Courses
          </Link>
          <Link
            to="/dashboard/create"
            className="block py-3 px-4 rounded-lg transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white" /* Adjusted padding and hover */
          >
            Create Course
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left py-3 px-4 rounded-lg transition duration-200 ease-in-out hover:bg-slate-700 text-red-400 hover:text-red-300" /* Adjusted padding and hover */
          >
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;