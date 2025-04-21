import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { BiMenuAltRight } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineHome, AiOutlineAim, AiOutlineGlobal } from "react-icons/ai";
// Ensure the path to logo.png is correct. 
// If your images folder is inside src, adjust the path accordingly.
import logo from "../../images/logo.png"; // Adjust this path based on your folder structure
import "./Navbar.css";

const Navbar = () => {
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);
  const [navStyle, setNavStyle] = useState("");

  // Add scroll event to change the navbar style on scroll
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavStyle("scrolled");
    } else {
      setNavStyle("");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`n-wrapper ${navStyle}`}>
      <div className="container">
        <div className="n-container">
          <div className="n-logo-container">
            <a href="/">
              <img src={logo} alt="Logo" width={110} height={60} className="logo-image" />
            </a>
            <div className="n-logo">
              <a href="/">
                <span className="blog-text">Fashion Footprint Calculator</span>
              </a>
            </div>
          </div>
          <div className="n-right">
            <div className="n-menu">
              <a href="/" smooth={true} duration={10}>
                <div style={{ display: "flex", alignItems: "center", marginTop: "-5px" }}>
                  <AiOutlineHome size={30} color="#D28C41" style={{ marginRight: "10px" }} />
                  <span style={{ fontSize: "1.4rem", fontWeight: "200", color: "#d2c6c8" }}>Welcome</span>
                </div>
              </a>
              <a href="/about-us" smooth={true} duration={10}>
                <div style={{ display: "flex", alignItems: "center", marginTop: "-5px" }}>
                  <AiOutlineAim size={30} color="#D28C41" style={{ marginRight: "5px" }} />
                  <span style={{ marginRight: "90px", fontSize: "1.4rem", fontWeight: "200", color: "#d2c6c8" }}>About Us</span>
                </div>
              </a>
              <a href="/" smooth={true} duration={10}>
                <div style={{ display: "flex", alignItems: "center", marginTop: "-5px" }}>
                  <AiOutlineGlobal size={30} color="#D28C41" style={{ marginRight: "90px" }} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="nm-container">
        <div className="n-logo-container">
          <a href="/">
            <img src={logo} alt="Logo" width={100} height={50} className="logo-image" />
          </a>
          <a href="/">
            <span className="blog-text">Fashion Footprint Calculator</span>
          </a>
        </div>

        {!mobileMenuOpened ? (
          <BiMenuAltRight size={30} color="#D28C41" onClick={() => setMobileMenuOpened(true)} />
        ) : (
          <RxCross2 size={30} color="#D28C41" onClick={() => setMobileMenuOpened(false)} />
        )}

        <div className="nm-menu" style={{ transform: mobileMenuOpened ? "translateX(0)" : "translateX(100%)" }}>
          <a href="/" smooth={true} duration={500} onClick={() => setMobileMenuOpened(false)}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <AiOutlineHome size={25} color="#D28C41" style={{ marginRight: "5px" }} />
              <span>Welcome</span>
            </div>
          </a>
          <a href="/about-us" smooth={true} duration={500} onClick={() => setMobileMenuOpened(false)}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <AiOutlineAim size={25} color="#D28C41" style={{ marginRight: "5px" }} />
              <span>About Us</span>
            </div>
          </a>
          <a href="/footprint-calculator">
            <button className="m-register-button" style={{ fontFamily: "Urbanist, sans-serif" }}>
              Fashion Footprint Calculator
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
