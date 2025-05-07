import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-600 py-12 px-4 sm:px-6 lg:px-8"> {/* Adjusted gradient */}
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl"> {/* Increased padding */}
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900 mb-3"> {/* Increased size */}
            Welcome Back!
          </h2>
          <p className="text-center text-md text-gray-600"> {/* Increased size */}
            Sign in to continue your learning journey
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="text-red-600 text-center bg-red-100 p-3 rounded-lg border border-red-300 text-sm">{error}</div>} {/* Enhanced error message style */}
          <div className="rounded-md -space-y-px">
            <div className="mb-5"> {/* Increased margin */}
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1.5"> {/* Adjusted margin */}
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                className="input-field" /* Using .input-field */
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5"> {/* Adjusted margin */}
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="input-field" /* Using .input-field */
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-2"> {/* Added padding top */}
            <button
              type="submit"
              className="btn-primary w-full" /* Using .btn-primary */
            >
              Sign in
            </button>
          </div>
          
          <div className="text-sm text-center pt-2"> {/* Added padding top */}
            <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-700 transition duration-150 ease-in-out"> {/* Darker hover */}
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;