import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useStore } from './store';
import DynamicBackground from './components/DynamicBackground';
import Chatbot from './components/Chatbot';
import { User, LayoutDashboard, PenTool, BookOpen, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

// Pages
import PersonalityTest from './pages/PersonalityTest';
import Dashboard from './pages/Dashboard';
import Simulation from './pages/Simulation';
import Lesson from './pages/Lesson';

const NavBar = () => {
  const { userMode, theme, toggleTheme } = useStore();
  const location = useLocation();

  if (!userMode) return null;

  const linkClass = (path: string) => `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
    location.pathname === path 
      ? 'bg-black/10 dark:bg-white/10 text-slate-900 dark:text-white font-medium' 
      : 'text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
  }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-white/80 dark:bg-black/20 backdrop-blur-md border-b border-slate-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-slate-900 dark:text-white font-serif font-bold text-xl tracking-wider">CULLEN ENGINE</div>
        <div className="flex gap-2">
          <Link to="/dashboard" className={linkClass('/dashboard')}>
            <LayoutDashboard size={18} /> <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <Link to="/simulation" className={linkClass('/simulation')}>
            <PenTool size={18} /> <span className="hidden sm:inline">Simulation</span>
          </Link>
          <Link to="/lesson" className={linkClass('/lesson')}>
            <BookOpen size={18} /> <span className="hidden sm:inline">Skills</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div className="text-xs text-slate-500 dark:text-white/60 capitalize hidden sm:block">
            Mode: {userMode}
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-400 to-gray-600 flex items-center justify-center text-white text-xs font-bold border border-white/20 shadow-md">
            <User size={16}/>
          </div>
        </div>
      </div>
    </nav>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { userMode } = useStore();
  if (!userMode) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  const { userMode, theme } = useStore();

  // Sync theme with HTML class for Tailwind dark mode
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Determine global styles based on personality and theme
  const getGlobalStyles = () => {
    // Default dark bg if userMode not set yet
    if (!userMode) return 'bg-slate-900 text-white';

    const isDark = theme === 'dark';

    switch (userMode) {
      case 'introvert':
        return isDark 
          ? 'bg-slate-900 text-slate-100' 
          : 'bg-slate-50 text-slate-900';
      case 'extrovert':
        return isDark 
          ? 'bg-[#0f172a] text-white' 
          : 'bg-amber-50 text-slate-900';
      case 'ambivert':
        return isDark 
          ? 'bg-gray-900 text-gray-100' 
          : 'bg-blue-50 text-slate-900';
      default:
        return 'bg-gray-900 text-white';
    }
  };

  return (
    <div className={`min-h-screen font-sans ${getGlobalStyles()} relative transition-colors duration-300`}>
      <DynamicBackground />
      <Router>
        <NavBar />
        <main className="pt-20 px-4 pb-12 max-w-7xl mx-auto min-h-screen">
          <Routes>
            <Route path="/" element={userMode ? <Navigate to="/dashboard" /> : <PersonalityTest />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/simulation" element={<ProtectedRoute><Simulation /></ProtectedRoute>} />
            <Route path="/lesson" element={<ProtectedRoute><Lesson /></ProtectedRoute>} />
          </Routes>
        </main>
        <Chatbot />
      </Router>
    </div>
  );
};

export default App;