# 🚀 Task Manager - React Application

A comprehensive task management application built with React that demonstrates advanced React concepts and best practices.

## ✨ Features

### 🔐 Authentication System
- **Fake Login**: Demo credentials for testing
- **Protected Routes**: Secure access to dashboard and task details
- **User Context**: Global user state management

### 📋 Task Management
- **CRUD Operations**: Create, Read, Update, Delete tasks
- **Task Status**: Mark tasks as completed/pending
- **Priority Levels**: Low, Medium, High priority system
- **Categories**: Organize tasks by Work, Personal, Shopping, Health, Learning

### 🔍 Advanced Filtering & Search
- **Category Filter**: Filter tasks by specific categories
- **Status Filter**: Show completed or pending tasks
- **Search**: Find tasks by title or description
- **Combined Filters**: Use multiple filters simultaneously

### 🎨 Theme System
- **Dark/Light Mode**: Toggle between themes
- **Persistent Storage**: Remembers user's theme preference
- **System Preference**: Automatically detects system theme

### 📱 Responsive Design
- **Mobile First**: Optimized for all screen sizes
- **Modern UI**: Clean, intuitive interface
- **Smooth Animations**: Enhanced user experience

## 🛠️ Technical Implementation

### React Concepts Covered
- ✅ **JSX** - Component structure and rendering
- ✅ **Components** - Reusable UI components
- ✅ **Props** - Data passing between components
- ✅ **State Management** - useState, useReducer hooks
- ✅ **Effects** - useEffect for side effects
- ✅ **Refs** - useRef for DOM manipulation
- ✅ **Context API** - Global state management
- ✅ **Custom Hooks** - Reusable logic
- ✅ **React Router** - Client-side routing
- ✅ **Performance** - React.memo optimization

### Architecture
- **Context Providers**: Auth, Task, and Theme contexts
- **Protected Routes**: Authentication-based access control
- **API Integration**: JSONPlaceholder for initial data
- **Local Storage**: Theme preference persistence
- **Error Handling**: Graceful error states and loading

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Build
Create a production build:
```bash
npm run build
```

## 🔑 Demo Credentials

Use these credentials to test the application:
- **Email**: `demo@example.com`
- **Password**: `password`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation and user info
│   ├── TaskList.jsx    # Task list with React.memo
│   ├── TaskItem.jsx    # Individual task display
│   ├── TaskForm.jsx    # Add/edit task form
│   └── FilterBar.jsx   # Search and filter controls
├── context/            # Global state management
│   ├── AuthContext.jsx # User authentication
│   ├── TaskContext.jsx # Task and category management
│   └── ThemeContext.jsx # Theme preferences
├── pages/              # Route components
│   ├── Login.jsx       # Authentication page
│   ├── Dashboard.jsx   # Main task overview
│   └── TaskDetail.jsx  # Individual task details
├── App.jsx             # Main app with routing
└── main.jsx            # Application entry point
```

## 🎯 Key Learning Points

### 1. **State Management Patterns**
- `useState` for local component state
- `useReducer` for complex state logic
- Context API for global state sharing

### 2. **Performance Optimization**
- `React.memo` for component memoization
- Efficient re-rendering strategies
- Optimized list rendering

### 3. **Routing & Navigation**
- Protected routes implementation
- Dynamic routing with parameters
- Navigation guards

### 4. **Form Handling**
- Controlled components
- Form validation
- User input management

### 5. **API Integration**
- Fetch API usage
- Error handling
- Loading states

## 🔧 Customization

### Adding New Categories
Modify the `categories` array in `TaskContext.jsx`:
```javascript
categories: [
  { id: 6, name: 'New Category', color: '#FF6B6B' }
]
```

### Styling
The application uses Tailwind CSS. Customize colors and styles in `tailwind.config.js`.

### Theme Colors
Modify theme colors in the CSS variables or Tailwind configuration.

## 🐛 Troubleshooting

### Common Issues
1. **Port already in use**: Change the port in `vite.config.js`
2. **Build errors**: Clear `node_modules` and reinstall
3. **Routing issues**: Ensure all imports are correct

### Development Tips
- Use React DevTools for debugging
- Check browser console for errors
- Verify all dependencies are installed

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy Coding! 🎉**
