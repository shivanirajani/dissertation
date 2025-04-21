import React from "react";
import { useMediaQuery } from "@mui/material"; // Import the useMediaQuery hook
import Navbar from "./components/Navbar/Navbar"; // Adjust the path if necessary
import Welcome from "./components/Welcome/Welcome";


const App = () => {
  const isMobile = useMediaQuery('(max-width: 600px)'); // Use media query to check for mobile size

  return (
    <div>
      <Navbar />
      
      {/* Conditionally add <br /> tags for mobile screens */}
      {isMobile && (
        <>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </>
      )}

      <Welcome />

    </div>
  );
};

export default App;
