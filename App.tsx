import React, { useState, useContext, useEffect, useRef } from 'react';
import { ThemeContext } from './context/ThemeContext';
import { useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegistrationFlow from './pages/RegistrationFlow';

type View = 'landing' | 'login' | 'register';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { theme } = useContext(ThemeContext);
  const [view, setView] = useState<View>('landing');
  const prevIsAuthenticated = useRef(isAuthenticated);

  useEffect(() => {
    // When user logs out (isAuthenticated changes from true to false)
    if (prevIsAuthenticated.current && !isAuthenticated) {
      setView('login');
    }
    prevIsAuthenticated.current = isAuthenticated;
  }, [isAuthenticated]);


  const handleNavigate = (target: View) => {
    setView(target);
  };
  
  const renderContent = () => {
    if (isAuthenticated) {
      return <Dashboard />;
    }

    switch (view) {
      case 'login':
        return <LoginPage onBack={() => setView('landing')} />;
      case 'register':
        return <RegistrationFlow onBackToLanding={() => setView('landing')} onGoToLogin={() => setView('login')} />;
      case 'landing':
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className={`${theme} font-sans`}>
      {renderContent()}
    </div>
  );
};

export default App;