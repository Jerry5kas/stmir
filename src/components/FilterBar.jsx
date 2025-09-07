import { useTask } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

const FilterBar = () => {
  const { categories, filters, setFilters } = useTask();
  const { isDark } = useTheme();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCategoryFocused, setIsCategoryFocused] = useState(false);
  const [isStatusFocused, setIsStatusFocused] = useState(false);

  const handleFilterChange = (filterType, value) => {
    setFilters({ [filterType]: value });
  };

  const clearAllFilters = () => {
    setFilters({ category: 'all', status: 'all', search: '' });
  };

  const hasActiveFilters = filters.category !== 'all' || filters.status !== 'all' || filters.search;

  const getFilterCount = () => {
    let count = 0;
    if (filters.category !== 'all') count++;
    if (filters.status !== 'all') count++;
    if (filters.search) count++;
    return count;
  };

  return (
    <div className="relative">
      {/* Compact Filter Bar Container */}
      <div className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${
        isDark 
          ? 'bg-gray-800/50 border-gray-700/50 shadow-lg' 
          : 'bg-white/80 border-gray-200/50 shadow-md'
      }`}>
        
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-purple-500/3 to-pink-500/3 rounded-xl"></div>
        
        {/* Main Content - More Compact */}
        <div className="relative p-4">
          {/* Compact Header Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${
                isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
              </div>
              <div>
                <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Filters
                </h3>
                {hasActiveFilters && (
                  <p className={`text-xs ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    {getFilterCount()} active filter{getFilterCount() !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
            
            {/* Active Filters Badge - Compact */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 ${
                  isDark 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30' 
                    : 'bg-red-100 text-red-600 border border-red-200 hover:bg-red-200'
                }`}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear All
              </button>
            )}
          </div>

          {/* Compact Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Compact Search Input */}
            <div className="relative group">
              <div className={`relative transition-all duration-300 ${
                isSearchFocused ? 'transform scale-[1.02]' : 'group-hover:transform group-hover:scale-[1.01]'
              }`}>
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`w-full pl-10 pr-3 py-2.5 border-2 rounded-lg transition-all duration-300 focus:outline-none text-sm ${
                    isSearchFocused
                      ? 'border-blue-500 shadow-md shadow-blue-500/20'
                      : 'border-gray-300 hover:border-blue-400'
                  } ${
                    isDark 
                      ? 'bg-gray-700/80 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                  isSearchFocused ? 'text-blue-500' : 'text-gray-400'
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {filters.search && (
                  <button
                    onClick={() => handleFilterChange('search', '')}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-all duration-200 hover:scale-110 ${
                      isDark 
                        ? 'text-gray-400 hover:text-red-400 hover:bg-red-500/20' 
                        : 'text-gray-500 hover:text-red-600 hover:bg-red-100'
                    }`}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Compact Category Filter */}
            <div className="relative group">
              <div className={`relative transition-all duration-300 ${
                isCategoryFocused ? 'transform scale-[1.02]' : 'group-hover:transform group-hover:scale-[1.01]'
              }`}>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  onFocus={() => setIsCategoryFocused(true)}
                  onBlur={() => setIsCategoryFocused(false)}
                  className={`w-full pl-10 pr-8 py-2.5 border-2 rounded-lg transition-all duration-300 focus:outline-none appearance-none cursor-pointer text-sm ${
                    isCategoryFocused
                      ? 'border-green-500 shadow-md shadow-green-500/20'
                      : 'border-gray-300 hover:border-green-400'
                  } ${
                    isDark 
                      ? 'bg-gray-700/80 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                  isCategoryFocused ? 'text-green-500' : 'text-gray-400'
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Compact Status Filter */}
            <div className="relative group">
              <div className={`relative transition-all duration-300 ${
                isStatusFocused ? 'transform scale-[1.02]' : 'group-hover:transform group-hover:scale-[1.01]'
              }`}>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  onFocus={() => setIsStatusFocused(true)}
                  onBlur={() => setIsStatusFocused(false)}
                  className={`w-full pl-10 pr-8 py-2.5 border-2 rounded-lg transition-all duration-300 focus:outline-none appearance-none cursor-pointer text-sm ${
                    isStatusFocused
                      ? 'border-orange-500 shadow-md shadow-orange-500/20'
                      : 'border-gray-300 hover:border-orange-400'
                  } ${
                    isDark 
                      ? 'bg-gray-700/80 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="all">All Status</option>
                  <option value="pending">⏳ Pending</option>
                  <option value="completed">✅ Completed</option>
                </select>
                <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                  isStatusFocused ? 'text-orange-500' : 'text-gray-400'
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Quick Filters Row */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
            <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Quick:
            </span>
            <button
              onClick={() => setFilters({ category: 'all', status: 'pending', search: '' })}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 ${
                filters.status === 'pending' && filters.category === 'all' && !filters.search
                  ? 'bg-blue-500 text-white shadow-md'
                  : isDark
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ⏳ Pending
            </button>
            <button
              onClick={() => setFilters({ category: 'all', status: 'completed', search: '' })}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 ${
                filters.status === 'completed' && filters.category === 'all' && !filters.search
                  ? 'bg-green-500 text-white shadow-md'
                  : isDark
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ✅ Completed
            </button>
            <button
              onClick={() => setFilters({ category: 'all', status: 'all', search: '' })}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 ${
                !hasActiveFilters
                  ? 'bg-gray-500 text-white shadow-md'
                  : isDark
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📋 All Tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
