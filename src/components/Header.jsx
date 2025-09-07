import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

const Header = ({ user, onLogout, showBackButton = false, onBack }) => {
  const { isDark, toggleTheme } = useTheme();
  const [isThemeHovered, setIsThemeHovered] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className={`relative border-b transition-all duration-300 ${
      isDark 
        ? 'bg-gray-800/80 border-gray-700/50 backdrop-blur-md' 
        : 'bg-white/80 border-gray-200/50 backdrop-blur-md'
    }`}>
      
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Section - Logo & Back Button */}
          <div className="flex items-center">
            {showBackButton && (
              <button
                onClick={onBack}
                className={`group mr-6 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/20' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-100'
                }`}
              >
                <div className="relative">
                  <svg className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                    isDark ? 'bg-blue-500/10' : 'bg-blue-100'
                  } opacity-0 group-hover:opacity-100`}></div>
                </div>
              </button>
            )}
            
            {/* Enhanced Logo Section */}
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${
                isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h1 className={`text-2xl font-bold bg-gradient-to-r ${
                  isDark 
                    ? 'from-white to-gray-300 bg-clip-text text-transparent' 
                    : 'from-gray-900 to-gray-600 bg-clip-text text-transparent'
                }`}>
                  Task Manager
                </h1>
                <p className={`text-xs font-medium ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Organize your life, one task at a time
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Theme Toggle & User Menu */}
          <div className="flex items-center gap-4">
            
            {/* Enhanced Theme Toggle */}
            <button
              onClick={toggleTheme}
              onMouseEnter={() => setIsThemeHovered(true)}
              onMouseLeave={() => setIsThemeHovered(false)}
              className={`group relative p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/20' 
                  : 'text-gray-600 hover:text-orange-500 hover:bg-orange-100'
              }`}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <div className="relative">
                {isDark ? (
                  <svg className="w-6 h-6 transition-all duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 transition-all duration-300 group-hover:-rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
                
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                  isDark ? 'bg-yellow-500/10' : 'bg-orange-100'
                } opacity-0 group-hover:opacity-100`}></div>
                
                {/* Animated Particles */}
                {isThemeHovered && (
                  <>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                  </>
                )}
              </div>
            </button>

            {/* Enhanced User Menu */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isDark 
                      ? 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/20' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-xl border-2 border-transparent transition-all duration-300 group-hover:border-blue-400/50"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 ${
                      isDark ? 'border-gray-800 bg-green-400' : 'border-white bg-green-500'
                    }`}></div>
                  </div>
                  
                  <div className="text-left">
                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {user.name}
                    </div>
                    <div className={`text-xs ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {user.email || 'User'}
                    </div>
                  </div>
                  
                  <svg className={`w-4 h-4 transition-transform duration-300 ${
                    isUserMenuOpen ? 'rotate-180' : ''
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className={`absolute right-0 mt-2 w-64 rounded-2xl border shadow-2xl transition-all duration-300 ${
                    isDark 
                      ? 'bg-gray-800/95 border-gray-700/50' 
                      : 'bg-white/95 border-gray-200/50'
                  }`}>
                    
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
                    
                    <div className="relative p-4">
                      {/* User Info Section */}
                      <div className="flex items-center gap-3 p-3 rounded-xl mb-3 ${
                        isDark ? 'bg-gray-700/50' : 'bg-gray-50'
                      }">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-12 h-12 rounded-xl"
                        />
                        <div>
                          <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {user.name}
                          </div>
                          <div className={`text-sm ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {user.email || 'user@example.com'}
                          </div>
                        </div>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="space-y-1">
                        <button className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 hover:scale-105 ${
                          isDark 
                            ? 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/20' 
                            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-100'
                        }`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Profile Settings
                        </button>
                        
                        <button className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 hover:scale-105 ${
                          isDark 
                            ? 'text-gray-300 hover:text-green-400 hover:bg-green-500/20' 
                            : 'text-gray-600 hover:text-green-600 hover:bg-green-100'
                        }`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Preferences
                        </button>
                        
                        <div className="border-t border-gray-200/50 dark:border-gray-700/50 my-2"></div>
                        
                        <button
                          onClick={onLogout}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 hover:scale-105 ${
                            isDark 
                              ? 'text-red-400 hover:text-red-300 hover:bg-red-500/20' 
                              : 'text-red-600 hover:text-red-700 hover:bg-red-100'
                          }`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom Border Glow */}
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent`}></div>
    </header>
  );
};

export default Header;
