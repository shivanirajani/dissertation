import React, { useState, useEffect } from "react";
import "./AboutUs.css";
import Select, { components } from 'react-select';
import { motion } from 'framer-motion';
import { GiTargeting } from "react-icons/gi";
import { PiTShirtThin, PiLightbulbThin, PiCalculatorLight } from "react-icons/pi";
import Navbar from "../Navbar/Navbar";

const Heading = () => {
  return (
    <div className="outsourcing-head" style={{ textAlign: 'left' }}>
      <span className="tag" style={{ color: 'white' }}></span>
      <div className="outsourcing-title">
        <div className="circle" />
        <motion.h1
          initial={{ y: "4rem", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 4,
            type: "spring"
          }}
        >
          About Us <br />
        </motion.h1>
      </div>
    </div>
  );
};

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#121112',
    borderColor: '#7c6f3e',
    borderWidth: '3px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#7c6f3e',
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#121112',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#7c6f3e' : '#121112',
    color: 'white',
    ':hover': {
      backgroundColor: state.isSelected ? '#7c6f3e' : '#333',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    color: 'white',
  }),
};

const Outsourcing = () => {
  const [selectedSection, setSelectedSection] = useState("Motivation");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleContainerClick = (section) => {
    setSelectedSection(section);
  };

  const handleScreenResize = () => {
    setIsSmallScreen(window.innerWidth <= 1024);
  };

  useEffect(() => {
    handleScreenResize();
    window.addEventListener('resize', handleScreenResize);
    return () => {
      window.removeEventListener('resize', handleScreenResize);
    };
  }, []);

  const CustomSingleValue = ({ children, ...props }) => (
    <components.SingleValue {...props}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {props.data.icon && <div style={{ marginRight: '8px' }}>{props.data.icon}</div>}
        {children}
      </div>
    </components.SingleValue>
  );

  const getContent = () => {
    switch (selectedSection) {
      case "Motivation":
        return (
          <motion.div
            key="Motivation"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="mission-header">
              <span className={`sec-titles ${isSmallScreen ? 'left-align' : ''}`} style={{ color: "#c9c3bd" }}>
                Motivation
              </span>
            </div>
            <br />
            <span className="texts" style={{ fontWeight: "400" }}>
              The fashion industry contributes significantly to global challenges...
              <br /><br />
              At <span style={{ fontWeight: "bold", color: "#c4561a" }}>We Got Habits</span>, we challenge this assumption...
              <br /><br />
            </span>
            <div className="block-features">
              <div className="block-feature1"></div>
              <div className="block-feature2"></div>
              <div className="block-feature3"></div>
            </div>
          </motion.div>
        );
      case "Aim & Objectives":
        return (
          <motion.div
            key="Aim & Objectives"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="mission-header">
              <span className={`sec-titles ${isSmallScreen ? 'left-align' : ''}`} style={{ color: "#c9c3bd" }}>
                Aim & Objectives
              </span>
            </div>
            <br />
            <span className="texts" style={{ fontWeight: "400" }}>
              At <span style={{ fontWeight: "bold", color: "#c4561a" }}>We Got Habits</span>, our primary objective is...
              <br /><br />
              <ul style={{ marginLeft: "20px", color: "white" }}>
                <li>Educate our readers...</li>
                <li>Highlight innovative solutions...</li>
                <li>Advocate for ethical practices...</li>
                <li>Inspire our audience...</li>
              </ul>
              <br />
              Through our content, we strive to build a community...
            </span>
            <div className="block-features">
              <div className="block-feature4"></div>
              <div className="block-feature5"></div>
              <div className="block-feature6"></div>
            </div>
          </motion.div>
        );
      case "Sustainable Fashion":
      case "Methodology":
        return (
          <motion.div
            key={selectedSection}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="mission-header">
              <span className={`sec-titles ${isSmallScreen ? 'left-align' : ''}`} style={{ color: "#c9c3bd" }}>
                {selectedSection}
              </span>
            </div>
            <br />
            <span className="texts" style={{ fontWeight: "400" }}>
              Our commitment at <span style={{ fontWeight: "bold", color: "#c4561a" }}>We Got Habits</span> is unwavering...
              <br /><br />
              <ul style={{ marginLeft: "20px", color: "white" }}>
                <li>Educate our readers...</li>
                <li>Highlight innovative solutions...</li>
                <li>Advocate for ethical practices...</li>
                <li>Inspire our audience...</li>
              </ul>
              <br />
            </span>
            <div className="block-features">
              <div className="block-feature7"></div>
              <div className="block-feature8"></div>
              <div className="block-feature9"></div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="outsourcing-wrapper">
        <Heading />
        <div className="outsourcing-container">
          <div className="sourcing-container">
            {isSmallScreen && (
              <Select
                className="dropdown-menu"
                options={[
                  { value: "Motivation", label: "Motivation", icon: <PiLightbulbThin size={16} color="#7c6f3e" /> },
                  { value: "Aim & Objectives", label: "Aim & Objectives", icon: <GiTargeting size={16} color="#7c6f3e" /> },
                  { value: "Sustainable Fashion", label: "Sustainable Fashion", icon: <PiTShirtThin size={16} color="#7c6f3e" /> },
                  { value: "Methodology", label: "Methodology", icon: <PiCalculatorLight size={16} color="#7c6f3e" /> },
                ]}
                value={{
                  value: selectedSection,
                  label: selectedSection,
                  icon:
                    selectedSection === "Motivation" ? <PiLightbulbThin size={16} color="#7c6f3e" /> :
                      selectedSection === "Aim & Objectives" ? <GiTargeting size={16} color="#7c6f3e" /> :
                        selectedSection === "Sustainable Fashion" ? <PiTShirtThin size={16} color="#7c6f3e" /> :
                          <PiCalculatorLight size={16} color="#7c6f3e" />,
                }}
                onChange={(selectedOption) => handleContainerClick(selectedOption.value)}
                components={{ SingleValue: CustomSingleValue }}
                styles={customStyles}
              />
            )}

            <div className="outsourcing-content-container">
              {!isSmallScreen && (
                <div className="selection-container">
                  <div
                    className={`section-container ${selectedSection === "Motivation" ? "active" : ""}`}
                    onClick={() => handleContainerClick("Motivation")}
                  >
                    <div className="icon-container"><PiLightbulbThin size={30} style={{ color: 'white' }} /></div>
                    <div className="text-container"><span style={{ marginLeft: '8px', color: "white" }}>Motivation</span></div>
                  </div>
                  <div
                    className={`section-container ${selectedSection === "Aim & Objectives" ? "active" : ""}`}
                    onClick={() => handleContainerClick("Aim & Objectives")}
                  >
                    <div className="icon-container"><GiTargeting size={30} style={{ color: 'white' }} /></div>
                    <div className="text-container"><span style={{ marginLeft: '8px', color: "white" }}>Aim & Objectives</span></div>
                  </div>
                  <div
                    className={`section-container ${selectedSection === "Sustainable Fashion" ? "active" : ""}`}
                    onClick={() => handleContainerClick("Sustainable Fashion")}
                  >
                    <div className="icon-container"><PiTShirtThin size={30} style={{ color: 'white' }} /></div>
                    <div className="text-container"><span style={{ marginLeft: '8px', color: "white" }}>Sustainable Fashion</span></div>
                  </div>
                  <div
                    className={`section-container ${selectedSection === "Methodology" ? "active" : ""}`}
                    onClick={() => handleContainerClick("Methodology")}
                  >
                    <div className="icon-container"><PiCalculatorLight size={30} style={{ color: 'white' }} /></div>
                    <div className="text-container"><span style={{ marginLeft: '8px', color: "white" }}>Methodology</span></div>
                  </div>
                </div>
              )}
              <div className="outsourcing-content">{getContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Outsourcing;
