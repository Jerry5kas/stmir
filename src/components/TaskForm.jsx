import { useState, useRef, useEffect } from 'react';
import { useTask } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';

const TaskForm = ({ onClose, categories }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: categories[0]?.id || 1,
    priority: 'medium'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { addTask } = useTask();
  const { isDark } = useTheme();
  const titleInputRef = useRef(null);

  // Auto-focus on title input when component mounts
  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Task title must be at least 3 characters';
    }
    
    if (formData.description && formData.description.trim().length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      addTask(formData);
      onClose();
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'high':
        return {
          color: 'from-red-500 to-red-600',
          bgColor: 'bg-red-500/10',
          textColor: 'text-red-600',
          borderColor: 'border-red-200',
          icon: '🔥'
        };
      case 'medium':
        return {
          color: 'from-yellow-500 to-orange-500',
          bgColor: 'bg-yellow-500/10',
          textColor: 'text-yellow-600',
          borderColor: 'border-yellow-200',
          icon: '⚡'
        };
      case 'low':
        return {
          color: 'from-green-500 to-emerald-500',
          bgColor: 'bg-green-500/10',
          textColor: 'text-green-600',
          borderColor: 'border-green-200',
          icon: '🌱'
        };
      default:
        return {
          color: 'from-gray-500 to-gray-600',
          bgColor: 'bg-gray-500/10',
          textColor: 'text-gray-600',
          borderColor: 'border-gray-200',
          icon: '📝'
        };
    }
  };

  const priorityConfig = getPriorityConfig(formData.priority);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      {/* Enhanced Modal Container */}
      <div className={`relative max-w-lg w-full rounded-2xl shadow-2xl transition-all duration-300 ${
        isDark 
          ? 'bg-gray-800/90 border border-gray-700/50' 
          : 'bg-white/95 border border-gray-200/50'
      }`}>
        
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl"></div>
        
        {/* Header Section */}
        <div className="relative p-6 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${
                isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Create New Task
                </h2>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Add a new task to your workspace
                </p>
              </div>
            </div>
            
            {/* Close Button */}
            <button
              onClick={handleCancel}
              className={`p-2 rounded-xl transition-all duration-200 hover:scale-110 ${
                isDark 
                  ? 'text-gray-400 hover:text-red-400 hover:bg-red-500/20' 
                  : 'text-gray-500 hover:text-red-600 hover:bg-red-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="relative p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Title Input - Enhanced */}
            <div className="space-y-2">
              <label htmlFor="title" className={`flex items-center gap-2 text-sm font-semibold ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                Task Title
              </label>
              <div className="relative group">
                <input
                  ref={titleInputRef}
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                    errors.title 
                      ? 'border-red-500 shadow-lg shadow-red-500/20' 
                      : 'border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20'
                  } ${
                    isDark 
                      ? 'bg-gray-700/80 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Enter a descriptive task title..."
                />
                <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                  errors.title ? 'text-red-500' : 'text-gray-400'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              {errors.title && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.title}
                </p>
              )}
            </div>

            {/* Description Input - Enhanced */}
            <div className="space-y-2">
              <label htmlFor="description" className={`flex items-center gap-2 text-sm font-semibold ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Description
                <span className="text-xs font-normal text-gray-500">(Optional)</span>
              </label>
              <div className="relative group">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl resize-none transition-all duration-300 focus:outline-none ${
                    errors.description 
                      ? 'border-red-500 shadow-lg shadow-red-500/20' 
                      : 'border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20'
                  } ${
                    isDark 
                      ? 'bg-gray-700/80 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Add details about your task..."
                />
                <div className={`absolute left-4 top-4 transition-colors duration-300 ${
                  errors.description ? 'text-red-500' : 'text-gray-400'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between">
                {errors.description && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.description}
                  </p>
                )}
                <span className={`text-xs ml-auto ${
                  formData.description.length > 400 ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {formData.description.length}/500
                </span>
              </div>
            </div>

            {/* Category and Priority Row */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Category Selection - Enhanced */}
              <div className="space-y-2">
                <label htmlFor="categoryId" className={`flex items-center gap-2 text-sm font-semibold ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Category
                </label>
                <div className="relative group">
                  <select
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-8 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none appearance-none cursor-pointer ${
                      isDark 
                        ? 'bg-gray-700/80 border-gray-600 text-white hover:border-green-400 focus:border-green-500 focus:shadow-lg focus:shadow-green-500/20' 
                        : 'bg-white border-gray-300 text-gray-900 hover:border-green-400 focus:border-green-500 focus:shadow-lg focus:shadow-green-500/20'
                    }`}
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Priority Selection - Enhanced */}
              <div className="space-y-2">
                <label htmlFor="priority" className={`flex items-center gap-2 text-sm font-semibold ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  Priority
                </label>
                <div className="relative group">
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-8 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none appearance-none cursor-pointer ${
                      isDark 
                        ? 'bg-gray-700/80 border-gray-600 text-white hover:border-orange-400 focus:border-orange-500 focus:shadow-lg focus:shadow-orange-500/20' 
                        : 'bg-white border-gray-300 text-gray-900 hover:border-orange-400 focus:border-orange-500 focus:shadow-lg focus:shadow-orange-500/20'
                    }`}
                  >
                    <option value="low">🌱 Low</option>
                    <option value="medium">⚡ Medium</option>
                    <option value="high">🔥 High</option>
                  </select>
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {/* Priority Indicator */}
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${priorityConfig.bgColor} ${priorityConfig.textColor} border ${priorityConfig.borderColor}`}>
                  <span className="text-sm">{priorityConfig.icon}</span>
                  {formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1)} Priority
                </div>
              </div>
            </div>

            {/* Form Actions - Enhanced */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
              <button
                type="button"
                onClick={handleCancel}
                className={`px-6 py-2.5 border-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
                  isDark 
                    ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50' 
                    : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-100'
                }`}
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative overflow-hidden px-8 py-2.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isSubmitting 
                    ? 'bg-gray-500' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Create Task
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
