import { createContext, useContext, useReducer, useEffect } from 'react';

const TaskContext = createContext();

const initialState = {
  tasks: [],
  categories: [
    { id: 1, name: 'Work', color: '#3B82F6' },
    { id: 2, name: 'Personal', color: '#10B981' },
    { id: 3, name: 'Shopping', color: '#F59E0B' },
    { id: 4, name: 'Health', color: '#EF4444' },
    { id: 5, name: 'Learning', color: '#8B5CF6' }
  ],
  isLoading: false,
  error: null,
  filters: {
    category: 'all',
    search: '',
    status: 'all'
  }
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case 'TOGGLE_TASK_STATUS':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        )
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload]
      };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Fetch initial tasks from JSONPlaceholder API
  useEffect(() => {
    const fetchTasks = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=20');
        const apiTasks = await response.json();
        
        // Transform API tasks to match our structure
        const transformedTasks = apiTasks.map((task, index) => ({
          id: task.id,
          title: task.title,
          completed: task.completed,
          categoryId: (index % 5) + 1, // Distribute across our 5 categories
          priority: ['low', 'medium', 'high'][index % 3],
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          description: `Task description for ${task.title}`
        }));
        
        dispatch({ type: 'SET_TASKS', payload: transformedTasks });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch tasks' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchTasks();
  }, []);

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const updateTask = (taskId, updates) => {
    const updatedTask = { ...updates, id: taskId };
    dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  const toggleTaskStatus = (taskId) => {
    dispatch({ type: 'TOGGLE_TASK_STATUS', payload: taskId });
  };

  const setFilters = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const addCategory = (categoryData) => {
    const newCategory = {
      id: Date.now(),
      ...categoryData
    };
    dispatch({ type: 'ADD_CATEGORY', payload: newCategory });
  };

  // Get filtered and searched tasks
  const getFilteredTasks = () => {
    let filtered = state.tasks;

    // Filter by category
    if (state.filters.category !== 'all') {
      filtered = filtered.filter(task => task.categoryId === parseInt(state.filters.category));
    }

    // Filter by status
    if (state.filters.status !== 'all') {
      const isCompleted = state.filters.status === 'completed';
      filtered = filtered.filter(task => task.completed === isCompleted);
    }

    // Filter by search
    if (state.filters.search) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(state.filters.search.toLowerCase()) ||
        task.description.toLowerCase().includes(state.filters.search.toLowerCase())
      );
    }

    return filtered;
  };

  const value = {
    ...state,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    setFilters,
    addCategory,
    getFilteredTasks
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};
