import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import FilterBar from '../components/FilterBar';
import Header from '../components/Header';

const Dashboard = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const { user, logout } = useAuth();
  const { tasks, categories, isLoading, error, getFilteredTasks } = useTask();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const filteredTasks = getFilteredTasks();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
        <div className="text-center">
          {/* Single, Clean Loading Spinner */}
          <div className="relative mb-6">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto"></div>
            {/* Subtle inner glow effect */}
            <div className="absolute inset-2 w-16 h-16 border-2 border-blue-300/30 rounded-full animate-pulse"></div>
          </div>
          
          {/* Loading Text */}
          <div className="space-y-2">
            <p className={`text-xl font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Loading your tasks...
            </p>
            <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Preparing your workspace
            </p>
          </div>
          
          {/* Loading Dots Animation */}
          <div className="flex items-center justify-center gap-1 mt-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Oops! Something went wrong
          </h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header user={user} onLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-lg shadow-sm ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Tasks
                </p>
                <p className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {tasks.length}
                </p>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-lg shadow-sm ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Completed
                </p>
                <p className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {tasks.filter(task => task.completed).length}
                </p>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-lg shadow-sm ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Pending
                </p>
                <p className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {tasks.filter(task => !task.completed).length}
                </p>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-lg shadow-sm ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Categories
                </p>
                <p className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {categories.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Add Task Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <FilterBar />
          <button
            onClick={() => setShowAddTask(true)}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isDark ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'
            }`}
          >
            + Add Task
          </button>
        </div>

        {/* Task List */}
        <TaskList 
          tasks={filteredTasks} 
          onTaskClick={handleTaskClick}
          showEmptyState={filteredTasks.length === 0}
        />

        {/* Add Task Modal */}
        {showAddTask && (
          <TaskForm
            onClose={() => setShowAddTask(false)}
            categories={categories}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
