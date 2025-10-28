import { useState } from 'react';
import Landing from './pages/Landing';
import SubmitComplaint from './pages/SubmitComplaint';
import Dashboard from './pages/Dashboard';
import MapView from './pages/MapView';

export type Page = 'landing' | 'submit' | 'dashboard' | 'map';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing onNavigate={setCurrentPage} />;
      case 'submit':
        return <SubmitComplaint onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'map':
        return <MapView onNavigate={setCurrentPage} />;
      default:
        return <Landing onNavigate={setCurrentPage} />;
    }
  };

  return <div className="min-h-screen bg-gray-50">{renderPage()}</div>;
}

export default App;
