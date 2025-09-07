import { memo } from 'react';
import TaskItem from './TaskItem';
import { useTheme } from '../context/ThemeContext';

const TaskList = memo(({ tasks, onTaskClick, showEmptyState }) => {
  const { isDark } = useTheme();

  if (showEmptyState) {
    return (
      <div className={`text-center py-16 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        <div className="mb-6">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'} mb-6`}>
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-3 text-gray-600 dark:text-gray-300">No tasks found</h3>
          <p className="text-lg mb-6 opacity-75">Try adjusting your filters or add a new task to get started.</p>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm ${isDark ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
            <span>💡</span>
            <span>Pro tip: Use the search and filters above to find specific tasks</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className="animate-fade-in"
          style={{ 
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'both'
          }}
        >
          <TaskItem
            task={task}
            onClick={() => onTaskClick(task.id)}
          />
        </div>
      ))}
    </div>
  );
});

TaskList.displayName = 'TaskList';

export default TaskList;
