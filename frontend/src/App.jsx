import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShareholderCheck from './ShareholderCheck';
import PreSuccess from './pages/Presuccess';
import Success from './pages/Success'
import RegisteredHolders from './pages/RegisteredHolders';
import Header from './Header';
import Footer from './Footer';
import './pages/RegisteredHolders.css'; // Import the CSS

function App() {
  const [currentView, setCurrentView] = useState('check');
  const [shareholderData, setShareholderData] = useState(null);

  return (
    <Router>
      <div className="app">
        <Header />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              currentView === 'check' ? (
                <ShareholderCheck 
                  setCurrentView={setCurrentView}
                  setShareholderData={setShareholderData}
                />
              ) : currentView === 'Presuccess' ? (
                <PreSuccess 
                  shareholderData={shareholderData}
                  onBackToHome={() => setCurrentView('check')}
                />
              ) : (
                <div className="error-view">
                  <h2>❌ Registration Failed</h2>
                  <p>Please try again or contact support.</p>
                  <button onClick={() => setCurrentView('check')}>Try Again</button>
                </div>
              )
            } />
            <Route path="/registered-users" element={<RegisteredHolders />} />
            
<Route path="/registration-success" element={<Success />} />
          </Routes>
        </main>

        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;