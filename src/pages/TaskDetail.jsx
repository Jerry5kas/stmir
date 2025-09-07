import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTask } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, categories, updateTask, deleteTask, toggleTaskStatus } = useTask();
  const { isDark } = useTheme();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const task = tasks.find(t => t.id === parseInt(id));
  const category = task ? categories.find(c => c.id === task.categoryId) : null;

  useEffect(() => {
    if (task) {
      setEditData({
        title: task.title,
        description: task.description,
        categoryId: task.categoryId,
        priority: task.priority
      });
    }
  }, [task]);

  if (!task) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${
        isDark ? 'from-gray-900 via-gray-800 to-gray-900' : 'from-gray-50 via-white to-gray-50'
      }`}>
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${
            isDark ? 'bg-red-500/20' : 'bg-red-100'
          } mb-6`}>
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Task Not Found
          </h2>
          <p className={`text-lg mb-6 opacity-75 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            The task you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="group relative overflow-hidden px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </span>
          </button>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateTask(task.id, editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description,
      categoryId: task.categoryId,
      priority: task.priority
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTask(task.id);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to delete task:', error);
      setIsDeleting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'high':
        return {
          color: 'from-red-500 to-red-600',
          bgColor: 'bg-red-500/10',
          textColor: 'text-red-600',
          borderColor: 'border-red-200',
          icon: '🔥',
          label: 'High Priority'
        };
      case 'medium':
        return {
          color: 'from-yellow-500 to-orange-500',
          bgColor: 'bg-yellow-500/10',
          textColor: 'text-yellow-600',
          borderColor: 'border-yellow-200',
          icon: '⚡',
          label: 'Medium Priority'
        };
      case 'low':
        return {
          color: 'from-green-500 to-emerald-500',
          bgColor: 'bg-green-500/10',
          textColor: 'text-green-600',
          borderColor: 'border-green-200',
          icon: '🌱',
          label: 'Low Priority'
        };
      default:
        return {
          color: 'from-gray-500 to-gray-600',
          bgColor: 'bg-gray-500/10',
          textColor: 'text-gray-600',
          borderColor: 'border-gray-200',
          icon: '📝',
          label: 'No Priority'
        };
    }
  };

  const priorityConfig = getPriorityConfig(task.priority);

  const getStatusConfig = (completed) => {
    return {
      color: completed ? 'from-green-400 to-emerald-500' : 'from-yellow-400 to-orange-500',
      bgColor: completed ? 'bg-green-500/10' : 'bg-yellow-500/10',
      textColor: completed ? 'text-green-600' : 'text-yellow-600',
      borderColor: completed ? 'border-green-200' : 'border-yellow-200',
      icon: completed ? '✅' : '⏳',
      label: completed ? 'Completed' : 'In Progress'
    };
  };

  const statusConfig = getStatusConfig(task.completed);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${
      isDark ? 'from-gray-900 via-gray-800 to-gray-900' : 'from-gray-50 via-white to-gray-50'
    }`}>
      <Header user={null} onLogout={() => {}} showBackButton onBack={() => navigate('/dashboard')} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Enhanced Task Header Card */}
        <div className={`relative overflow-hidden rounded-2xl border transition-all duration-300 mb-8 ${
          isDark 
            ? 'bg-gray-800/50 border-gray-700/50 shadow-2xl' 
            : 'bg-white/80 border-gray-200/50 shadow-xl'
        }`}>
          
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl"></div>
          
          {/* Header Content */}
          <div className="relative p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="title"
                      value={editData.title}
                      onChange={handleInputChange}
                      className={`w-full text-3xl font-bold p-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:shadow-lg ${
                        isDark 
                          ? 'bg-gray-700/80 border-gray-600 text-white focus:border-blue-500 focus:shadow-blue-500/20' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:shadow-blue-500/20'
                      }`}
                      placeholder="Enter task title..."
                    />
                  </div>
                ) : (
                  <h1 className={`text-3xl font-bold mb-4 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {task.title}
                  </h1>
                )}
                
                {/* Enhanced Task Meta Information */}
                <div className="flex items-center gap-4 flex-wrap">
                  {/* Priority Badge */}
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${priorityConfig.bgColor} ${priorityConfig.textColor} border ${priorityConfig.borderColor}`}>
                    <span className="text-lg">{priorityConfig.icon}</span>
                    {priorityConfig.label}
                  </div>
                  
                  {/* Category Badge */}
                  {category && (
                    <div 
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white border border-white/20 shadow-lg"
                      style={{ 
                        background: `linear-gradient(135deg, ${category.color}dd, ${category.color})`,
                        boxShadow: `0 4px 12px ${category.color}40`
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-white/80"></div>
                      {category.name}
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${statusConfig.bgColor} ${statusConfig.textColor} border ${statusConfig.borderColor}`}>
                    <span className="text-lg">{statusConfig.icon}</span>
                    {statusConfig.label}
                  </div>
                  
                  {/* Creation Date */}
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${
                    isDark ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Created {new Date(task.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-3 flex-shrink-0">
                {!isEditing ? (
                  <>
                    {/* Toggle Status Button */}
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className={`group relative overflow-hidden px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 ${
                        task.completed
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600'
                          : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                      }`}
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative flex items-center gap-2">
                        {task.completed ? '⏳ Mark Pending' : '✅ Mark Complete'}
                      </span>
                    </button>
                    
                    {/* Edit Button */}
                    <button
                      onClick={handleEdit}
                      className="group relative overflow-hidden px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Task
                      </span>
                    </button>
                    
                    {/* Delete Button */}
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="group relative overflow-hidden px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    {/* Save Button */}
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className={`group relative overflow-hidden px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700`}
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative flex items-center gap-2">
                        {isSaving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Save Changes
                          </>
                        )}
                      </span>
                    </button>
                    
                    {/* Cancel Button */}
                    <button
                      onClick={handleCancel}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 ${
                        isDark 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content - Description */}
          <div className="lg:col-span-2">
            <div className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
              isDark 
                ? 'bg-gray-800/50 border-gray-700/50 shadow-xl' 
                : 'bg-white/80 border-gray-200/50 shadow-lg'
            }`}>
              
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 to-purple-500/3 rounded-2xl"></div>
              
              <div className="relative p-8">
                <h3 className={`flex items-center gap-3 text-xl font-bold mb-6 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  <div className={`p-2 rounded-xl ${
                    isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </div>
                  Task Description
                </h3>
                
                {isEditing ? (
                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full p-4 border-2 rounded-xl resize-none transition-all duration-300 focus:outline-none focus:shadow-lg ${
                      isDark 
                        ? 'bg-gray-700/80 border-gray-600 text-white focus:border-blue-500 focus:shadow-blue-500/20' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:shadow-blue-500/20'
                    }`}
                    placeholder="Add a detailed description of your task..."
                  />
                ) : (
                  <div className={`prose prose-lg max-w-none ${
                    isDark ? 'prose-invert' : ''
                  }`}>
                    <p className={`text-lg leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {task.description || 'No description provided for this task.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Task Details */}
          <div className="space-y-6">
            
            {/* Category Details Card */}
            <div className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
              isDark 
                ? 'bg-gray-800/50 border-gray-700/50 shadow-xl' 
                : 'bg-white/80 border-gray-200/50 shadow-lg'
            }`}>
              
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/3 to-emerald-500/3 rounded-2xl"></div>
              
              <div className="relative p-6">
                <h3 className={`flex items-center gap-3 text-lg font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  <div className={`p-2 rounded-xl ${
                    isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  Category
                </h3>
                
                {isEditing ? (
                  <select
                    name="categoryId"
                    value={editData.categoryId}
                    onChange={handleInputChange}
                    className={`w-full p-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:shadow-lg ${
                      isDark 
                        ? 'bg-gray-700/80 border-gray-600 text-white focus:border-green-500 focus:shadow-green-500/20' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-green-500 focus:shadow-green-500/20'
                    }`}
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className={`p-4 rounded-xl ${
                    isDark ? 'bg-gray-700/50' : 'bg-gray-50'
                  }`}>
                    {category ? (
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {category.name}
                        </span>
                      </div>
                    ) : (
                      <span className={`text-gray-500 ${isDark ? 'text-gray-400' : ''}`}>
                        No category assigned
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Priority Details Card */}
            <div className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
              isDark 
                ? 'bg-gray-800/50 border-gray-700/50 shadow-xl' 
                : 'bg-white/80 border-gray-200/50 shadow-lg'
            }`}>
              
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/3 to-red-500/3 rounded-2xl"></div>
              
              <div className="relative p-6">
                <h3 className={`flex items-center gap-3 text-lg font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  <div className={`p-2 rounded-xl ${
                    isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600'
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  Priority Level
                </h3>
                
                {isEditing ? (
                  <select
                    name="priority"
                    value={editData.priority}
                    onChange={handleInputChange}
                    className={`w-full p-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:shadow-lg ${
                      isDark 
                        ? 'bg-gray-700/80 border-gray-600 text-white focus:border-orange-500 focus:shadow-orange-500/20' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500 focus:shadow-orange-500/20'
                    }`}
                  >
                    <option value="low">🌱 Low Priority</option>
                    <option value="medium">⚡ Medium Priority</option>
                    <option value="high">🔥 High Priority</option>
                  </select>
                ) : (
                  <div className={`p-4 rounded-xl ${priorityConfig.bgColor} border ${priorityConfig.borderColor}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{priorityConfig.icon}</span>
                      <div>
                        <div className={`font-semibold ${priorityConfig.textColor}`}>
                          {priorityConfig.label}
                        </div>
                        <div className={`text-xs ${priorityConfig.textColor} opacity-75`}>
                          {task.priority === 'high' ? 'Requires immediate attention' : 
                           task.priority === 'medium' ? 'Normal priority level' : 
                           'Can be addressed later'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Status Details Card */}
            <div className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
              isDark 
                ? 'bg-gray-800/50 border-gray-700/50 shadow-xl' 
                : 'bg-white/80 border-gray-200/50 shadow-lg'
            }`}>
              
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 to-purple-500/3 rounded-2xl"></div>
              
              <div className="relative p-6">
                <h3 className={`flex items-center gap-3 text-lg font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  <div className={`p-2 rounded-xl ${
                    isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Current Status
                </h3>
                
                <div className={`p-4 rounded-xl ${statusConfig.bgColor} border ${statusConfig.borderColor}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{statusConfig.icon}</span>
                    <div>
                      <div className={`font-semibold ${statusConfig.textColor}`}>
                        {statusConfig.label}
                      </div>
                      <div className={`text-xs ${statusConfig.textColor} opacity-75`}>
                        {task.completed ? 'Task has been completed successfully' : 'Task is currently in progress'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className={`relative max-w-md w-full rounded-2xl shadow-2xl ${
              isDark 
                ? 'bg-gray-800/90 border border-gray-700/50' 
                : 'bg-white/95 border border-gray-200/50'
            }`}>
              
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 rounded-2xl"></div>
              
              <div className="relative p-8 text-center">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
                  isDark ? 'bg-red-500/20' : 'bg-red-100'
                } mb-6`}>
                  <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Delete Task?
                </h3>
                <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  This action cannot be undone. The task "{task.title}" will be permanently removed.
                </p>
                
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 ${
                      isDark 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className={`group relative overflow-hidden px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700`}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center gap-2">
                      {isDeleting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete Permanently
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TaskDetail;
