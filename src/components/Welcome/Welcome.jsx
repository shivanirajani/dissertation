
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import hero from '../../images/hero.jpeg';
import './Welcome.css';

const Hero = () => {
  const navigate = useNavigate();  // Initialize useNavigate hook

  // Function to handle click event for navigation
  const handleClick = () => {
    navigate('/footprint-calculator');  // Navigate to the footprint calculator page
  };

  return (
    <section className="/#about-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="pink-circle" />
            <motion.h1
              initial={{ y: '4rem', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 4, type: 'spring' }}
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
            {/* Call handleClick function on button click */}
            <button 
              onClick={handleClick} 
              className="register-button" 
              style={{ fontFamily: 'Urbanist' }}
            >
              Fashion Footprint Calculator
            </button>

          <div className="flexCenter stats">
            <div className="flexColStart stat">
              <span>
                <CountUp start={0} end={2000} duration={4} />
                <span>+</span>
              </span>
              <p className="secondaryText">New Posts</p>
            </div>
            <div className="flexColStart stat">
              <span>
                <CountUp start={0} end={700} duration={4} />
                <span>+</span>
              </span>
              <p className="secondaryText">New Members</p>
            </div>
            <div className="flexColStart stat">
              <span>
                <CountUp start={0} end={110} duration={4} />
                <span>+</span>
              </span>
              <p className="secondaryText">Global Reach</p>
            </div>
          </div>
        </div>
        <div className="flexCenter hero-right">
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

export default Hero;
