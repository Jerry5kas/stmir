import { memo, useState } from 'react';
import { useTask } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';

const TaskItem = memo(({ task, onClick }) => {
  const { categories, toggleTaskStatus } = useTask();
  const { isDark } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const category = categories.find(c => c.id === task.categoryId);

  const handleToggleStatus = (e) => {
    e.stopPropagation();
    toggleTaskStatus(task.id);
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

  const priorityConfig = getPriorityConfig(task.priority);

  const getStatusColor = (completed) => {
    return completed ? 'from-green-400 to-emerald-500' : 'from-yellow-400 to-orange-500';
  };

  const getStatusText = (completed) => {
    return completed ? 'Completed' : 'In Progress';
  };

  const getStatusIcon = (completed) => {
    return completed ? '✅' : '⏳';
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer ${
        isDark 
          ? 'bg-gray-800/50 border-gray-700/50 hover:border-blue-500/50 hover:bg-gray-800/80' 
          : 'bg-white/80 border-gray-200/50 hover:border-blue-400/50 hover:bg-white'
      } ${isHovered ? 'shadow-2xl transform -translate-y-1' : 'shadow-lg'}`}
    >
      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl`}></div>
      </div>

      {/* Main Content */}
      <div className="relative p-6">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            {/* Enhanced Checkbox */}
            <button
              onClick={handleToggleStatus}
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                task.completed
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-transparent shadow-lg'
                  : 'border-gray-300 hover:border-blue-400 hover:shadow-md'
              }`}
            >
              {task.completed && (
                <svg className="w-4 h-4 text-white mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            
            {/* Task Title */}
            <div className="flex-1 min-w-0">
              <h3 className={`text-lg font-bold mb-2 leading-tight transition-all duration-200 ${
                task.completed 
                  ? (isDark ? 'text-gray-500 line-through' : 'text-gray-400 line-through')
                  : (isDark ? 'text-white group-hover:text-blue-300' : 'text-gray-900 group-hover:text-blue-600')
              }`}>
                {task.title}
              </h3>
              
              {/* Task Description */}
              <p className={`text-sm leading-relaxed line-clamp-2 transition-colors duration-200 ${
                isDark ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-700'
              }`}>
                {task.description}
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex-shrink-0 ml-4">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
              isDark ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-700'
            }`}>
              <span className={`text-sm ${getStatusIcon(task.completed)}`}></span>
              {getStatusText(task.completed)}
            </div>
          </div>
        </div>

        {/* Tags and Metadata Row */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Priority Badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${priorityConfig.bgColor} ${priorityConfig.textColor} border ${priorityConfig.borderColor}`}>
              <span className="text-sm">{priorityConfig.icon}</span>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </div>
            
            {/* Category Badge */}
            {category && (
              <div 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white border border-white/20 shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${category.color}dd, ${category.color})`,
                  boxShadow: `0 4px 12px ${category.color}40`
                }}
              >
                <div className="w-2 h-2 rounded-full bg-white/80"></div>
                {category.name}
              </div>
            )}
          </div>

          {/* Date and Actions */}
          <div className="flex items-center gap-3">
            {/* Date */}
            <div className={`flex items-center gap-1.5 text-xs font-medium ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(task.createdAt).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>

            {/* Action Icons */}
            <div className={`flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 ${
              isHovered ? 'translate-x-0' : 'translate-x-2'
            }`}>
              <button className={`p-1.5 rounded-lg transition-all duration-200 ${
                isDark 
                  ? 'text-gray-400 hover:text-blue-400 hover:bg-blue-500/20' 
                  : 'text-gray-500 hover:text-blue-600 hover:bg-blue-100'
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button className={`p-1.5 rounded-lg transition-all duration-200 ${
                isDark 
                  ? 'text-gray-400 hover:text-red-400 hover:bg-red-500/20' 
                  : 'text-gray-500 hover:text-red-600 hover:bg-red-100'
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar for Incomplete Tasks */}
        {!task.completed && (
          <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Task Progress
              </span>
              <span className={`font-semibold ${priorityConfig.textColor}`}>
                {task.priority === 'high' ? 'Urgent' : task.priority === 'medium' ? 'Normal' : 'Low Priority'}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-2 bg-gradient-to-r ${priorityConfig.color} rounded-full transition-all duration-500 ${
                  isHovered ? 'animate-pulse' : ''
                }`}
                style={{ width: '0%' }}
              ></div>
            </div>
          </div>
        )}

        {/* Completion Celebration for Completed Tasks */}
        {task.completed && (
          <div className="mt-4 pt-4 border-t border-green-200/50 dark:border-green-700/50">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <span className="text-sm">🎉</span>
              <span className="text-sm font-medium">Task completed successfully!</span>
              <span className="text-xs opacity-75">
                {new Date().toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Accent Line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${getStatusColor(task.completed)} transition-all duration-300 ${
        isHovered ? 'h-2' : 'h-1'
      }`}></div>
    </div>
  );
});

TaskItem.displayName = 'TaskItem';

export default TaskItem;
