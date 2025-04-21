

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Make sure App is imported
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router, Route, and Routes
import FootprintCalculator from './components/FootprintCalculator/FootprintCalculator'; // Import your FootprintCalculator component
import ResultsAndRecommendations from './components/ResultsAndRecommendations/ResultsAndRecommendations';
import AboutUs from './components/AboutUs/AboutUs';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} /> {/* Main App route */}
      <Route path="/about-us" element={<AboutUs />} /> {/* Route for FootprintCalculator */}
      <Route path="/footprint-calculator" element={<FootprintCalculator />} /> {/* Route for FootprintCalculator */}
      <Route path="/results-and-recommendations" element={<ResultsAndRecommendations />} />
    </Routes>
  </Router>
);
