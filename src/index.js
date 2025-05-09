

import React from 'react'; // Import React
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering
import './index.css'; // Import global styles
import App from './App'; // Make sure App is imported
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router, Route, and Routes
import AboutUs from './components/AboutUs/AboutUs'; // Import About Us component
import FootprintCalculator from './components/FootprintCalculator/FootprintCalculator'; // Import Fashion Footprint Calculator component
import ResultsAndRecommendations from './components/ResultsAndRecommendations/ResultsAndRecommendations'; // Import Results and Recommendations component
const root = ReactDOM.createRoot(document.getElementById('root'));  // Create a root element for React to render into


// Render the application
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} /> {/* Main App route */}
      <Route path="/about-us" element={<AboutUs />} /> {/* Route for AboutUs */}
      <Route path="/footprint-calculator" element={<FootprintCalculator />} /> {/* Route for FootprintCalculator */}
      <Route path="/results-and-recommendations" element={<ResultsAndRecommendations />} /> {/* Route for ResultsAndRecommendations */}
    </Routes>
  </Router>
);
