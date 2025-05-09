import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import navigation hook
import { motion } from 'framer-motion';  // Import motion for animations
import hero from '../../images/hero.jpeg';  // Hero image
import './Welcome.css';  // Import styles

const Welcome = () => {
  const navigate = useNavigate();  // Initialise navigate hook

  // Navigate to footprint calculator page
  const handleClick = () => {
    navigate('/footprint-calculator');
  };

  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="pink-circle" />
            {/* Animated title */}
            <motion.h1
              initial={{ y: '4rem', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, type: 'spring' }}
            >
              Stitching Sustainability <br />
              With We Got Habits <br />
            </motion.h1>
          </div>
          <div className="flexColStart hero-des">
            <span className="hero-Text">
              Calculate your impact, rethink your fashion habits
            </span>
          </div>
          {/* Button for navigation */}
          <button 
            onClick={handleClick} 
            className="register-button" 
            style={{ fontFamily: 'Urbanist' }}
          >
            Fashion Footprint Calculator
          </button>
        </div>
        <div className="flexCenter hero-right">
          {/* Animated image */}
          <motion.div
            initial={{ x: '10rem', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 4, type: 'spring' }}
            className="image-container"
          >
            <img src={hero} alt="Hero" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
