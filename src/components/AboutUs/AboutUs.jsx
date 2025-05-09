import React, { useState, useEffect } from "react";
import "./AboutUs.css";
import Select, { components } from 'react-select';
import { motion } from 'framer-motion';
import { GiTargeting } from "react-icons/gi";
import { PiTShirtThin, PiLightbulbThin, PiCalculatorLight } from "react-icons/pi";
import Navbar from "../Navbar/Navbar";

const Heading = () => {
  return (
    <div className="about-head" style={{ textAlign: 'left' }}>
      <span className="tag" style={{ color: 'white' }}></span>
      <div className="about-title">
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

const AboutUs = () => {
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
            The fashion industry is a major contributor to environmental damage, unethical labour conditions and social injustice, driven by a fast fashion model that encourages overconsumption and waste. 
            Many believe sustainable fashion means buying expensive eco friendly brands, but in reality, simple habits like rewearing, repairing and choosing second hand can make a big difference.
              <br /><br />
           <span style={{ fontWeight: "bold", color: "#c4561a" }}>We Got Habits</span>, helps users understand and reduce their fashion footprint by asking a series of questions about clothing consumption, care routines and other everyday habits. 
           Based on the answers, the platform calculates the footprint and provides personalised recommendations, practical tips and data visualisation to support more responsible fashion choices.




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
              At <span style={{ fontWeight: "bold", color: "#c4561a" }}>We Got Habits</span>, our primary objective is to help individuals reduce their fashion footprint by raising awareness of the environmental, social, and ethical impacts of their clothing habits. 
              It promotes sustainable choices like clothing care, second-hand shopping, repair, and longevity.
              <br /><br />
              <span style={{ color: "white" }}>
              It educates users, offers practical solutions to reduce their footprint, and provides personalised recommendations for reducing waste and supporting ethical practices.
              </span>
            </span>
            <div className="block-features">
              <div className="block-feature4"></div>
              <div className="block-feature5"></div>
              <div className="block-feature6"></div>
            </div>
          </motion.div>
        );
      case "Sustainable Fashion":
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
            Sustainable fashion refers to clothing choices that minimise the environmental, social, and ethical impacts of the fashion industry. It focuses on reducing waste, supporting fair labour practices, and using resources responsibly. 
            Sustainable fashion includes practices like choosing long-lasting garments, repairing clothes, opting for second-hand items, and using eco-friendly materials.
              <br /><br />
              At <span style={{ fontWeight: "bold", color: "#c4561a" }}>We Got Habits</span>, we want to make it clear that although sustainable fashion can involve buying from sustainable brands, it’s not the only option. There are many cost-effective habits you can adopt, such as lowering laundry temperatures, using alternative materials, repairing garments, and choosing second-hand clothing. 
              These simple changes can make a big difference without the need for expensive sustainable brands.
              <br />
            </span>
            <div className="block-features">
              <div className="block-feature7"></div>
              <div className="block-feature8"></div>
              <div className="block-feature9"></div>
            </div>
          </motion.div>
        );
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
              The platform uses a simple, yet effective approach to help users reduce their fashion footprint. It will ask you a series of questions across five key categories:
                <br /><br />
                <ul style={{ marginLeft: "20px" }}>
  <li style={{ marginBottom: "10px" }}>
    <span style={{ fontWeight: "bold" }}>Clothing Consumption and Materials:</span> Understanding your purchasing habits and the materials of your clothes.
  </li>
  <li style={{ marginBottom: "10px" }}>
    <span style={{ fontWeight: "bold" }}>Clothing Care:</span> Questions around how you care for your garments, such as washing and drying practices.
  </li>
  <li style={{ marginBottom: "10px" }}>
    <span style={{ fontWeight: "bold" }}>Clothing Repair and Longevity:</span> Assessing how often you repair your clothes and how long you keep them in use.
  </li>
  <li style={{ marginBottom: "10px" }}>
    <span style={{ fontWeight: "bold" }}>Second-Hand:</span> Exploring how often you shop second-hand or reuse items.
  </li>
  <li style={{ marginBottom: "10px" }}>
    <span style={{ fontWeight: "bold" }}>Ethical and Social Responsibility:</span> Focusing on your support for brands with ethical practices, including fair wages and safe working conditions, as well as how you research a brand’s impact before purchasing.
  </li>
</ul>

      <p style={{lineHeight: 1.6 }}>
  Based on your answers, the platform will calculate your fashion footprint and provide personalised recommendations to help you reduce your environmental impact and make more sustainable choices.
</p>
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
      <div className="about-wrapper">
        <Heading />
        <div className="about-container">
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

            <div className="about-content-container">
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
              <div className="about-content">{getContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
