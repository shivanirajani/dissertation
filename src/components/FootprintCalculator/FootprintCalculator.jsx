import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Stepper, Step, StepLabel, Box, Typography, Button, Dialog,
  DialogActions, DialogContent, DialogTitle, Container, Paper, useMediaQuery,
  Avatar, IconButton, Slider,FormControlLabel, Tooltip, RadioGroup, Radio
} from '@mui/material';
import { Add, Remove, } from "@mui/icons-material";
import { motion } from 'framer-motion';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService'; 
import { GiSewingMachine } from "react-icons/gi";
import RecyclingIcon from '@mui/icons-material/Recycling';
import { RiHandHeartLine } from "react-icons/ri";
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 
import Navbar from '../Navbar/Navbar';  
import { PiTShirt } from "react-icons/pi";
import { styled } from '@mui/material/styles';


const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '0.875rem',
    maxWidth: 220,
    borderRadius: 8,
    padding: '10px 14px',
    boxShadow: theme.shadows[2],
  },
}));


const Heading = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');

 
  return (
    <>
      <Box sx={{ textAlign: 'center', color: 'white', my: 4 }}>
        <motion.h1
          initial={{ y: "4rem", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, type: "spring" }}
          style={{
            color: '#c9c3bd',
            fontSize: isMobile ? '2.5rem' : '4rem',
            margin: 0, // Avoid extra margins that might conflict
          }}
        >
          Fashion Footprint Calculator
        </motion.h1>
      </Box>
    </>
  );
};


const FashionFootprintCalculator = () => {
  const navigate = useNavigate(); // make sure it's inside the function where you're using it
  const isMobile = useMediaQuery('(max-width: 600px)');
  const steps = [
    { label: 'Clothing Consumption & Material Choices', icon: <PiTShirt /> },
    { label: 'Clothing Care', icon: <LocalLaundryServiceIcon /> },
    { label: 'Clothing Repair & Longevity', icon: <GiSewingMachine /> },
    { label: 'Second Hand & Donations', icon: < RecyclingIcon/> },
    { label: 'Ethical & Social Responsibility', icon: <RiHandHeartLine /> },

  ];
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  // T-SHIRTS
const [tshirtsRecycledCotton, setTshirtsRecycledCotton] = useState(0);
const [tshirtsCotton, setTshirtsCotton] = useState(0);
const [tshirtsViscose, setTshirtsViscose] = useState(0);
const [tshirtsRecycledViscose, setTshirtsRecycledViscose] = useState(0);
const [tshirtsPolyester, setTshirtsPolyester] = useState(0);
const [tshirtsRecycledPolyester, setTshirtsRecycledPolyester] = useState(0);
const [tshirtsOrganicCotton, setTshirtsOrganicCotton] = useState(0);

// DRESSES
const [dressesCotton, setDressesCotton] = useState(0);
const [dressesRecycledCotton, setDressesRecycledCotton] = useState(0);
const [dressesViscose, setDressesViscose] = useState(0);
const [dressesRecycledViscose, setDressesRecycledViscose] = useState(0);
const [dressesPolyester, setDressesPolyester] = useState(0);
const [dressesRecycledPolyester, setDressesRecycledPolyester] = useState(0);

// TROUSERS / JEANS
const [trousersDenim, setTrousersDenim] = useState(0);
const [trousersCottonJeans, setTrousersCottonJeans] = useState(0);
const [trousersPolyester, setTrousersPolyester] = useState(0);

// JACKETS
const [jacketsSynthetic, setJacketsSynthetic] = useState(0);
const [jacketsSkinLeather, setJacketsSkinLeather] = useState(0);
const [jacketsDown, setJacketsDown] = useState(0);



  const [monthlyLoads, setMonthlyLoads]= useState(0);
  const [washTemps, setWashTemps]= useState(0);
  const [detergentType, setDetergentType]= useState(0);
  const [tumbleDryLoads, setTumbleDryLoads]= useState(0);
  const [clothingLongevity, setClothingLongevity] = useState(null);
  const [donationFrequency, setDonationFrequency] = useState(0);


 
  const [tShirts, setTShirts] = useState(0);
  const [trousers, setTrousers] = useState(0);
  const [jackets, setJackets]= useState(0);
  const [denimJeans, setDenimJeans] = useState(0);
  const [dresses, setDresses] = useState(0);

  const [secondHandTShirts, setSecondHandTShirts] = useState(0);
  const [secondHandKnitwear, setSecondHandKnitwear] = useState(0);
  const [secondHandDresses, setSecondHandDresses] = useState(0);
  const [secondHandJeans, setSecondHandJeans] = useState(0);
  const [secondHandTrousers, setSecondHandTrousers] = useState(0);
  const [secondHandShoes, setSecondHandShoes] = useState(0);
  const [secondHandCoats, setSecondHandCoats] = useState(0);

  const [ethicalCertifications, setEthicalCertifications] = useState(null);
  const [brandResearch, setBrandResearch] = useState(null);
  const [ethicalPlatforms, setEthicalPlatforms] = useState(null);

  const handleSubmitButton = async () => {

  
    try {
      const payload = {
        tshirtsRecycledCotton,
        tshirtsCotton,
        tshirtsViscose,
        tshirtsRecycledViscose,
        tshirtsPolyester,
        tshirtsRecycledPolyester,
        tshirtsOrganicCotton,
        dressesCotton,
        dressesRecycledCotton,
        dressesViscose,
        dressesRecycledViscose,
        dressesPolyester,
        dressesRecycledPolyester,
        trousersDenim,        
        trousersCottonJeans,        
        trousersPolyester,    
        jacketsSynthetic,
        jacketsSkinLeather,
        jacketsDown,
        monthlyLoads,   
        detergentType,
        tumbleDryLoads,
        washTemps,
        clothingLongevity,
        donationFrequency,
        tShirts,
        trousers,
        jackets,
        denimJeans,
        dresses,
        secondHandTShirts,
        secondHandKnitwear,
        secondHandDresses,
        secondHandJeans,
        secondHandTrousers,
        secondHandShoes,
        secondHandCoats,
        ethicalCertifications,
        brandResearch,
        ethicalPlatforms,
      };
  
      // Send data to the backend
      const response = await fetch('/api/calculate-footprint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send data');
      }
  
      const result = await response.json();
      console.log('Server response:', result); // Log the response from the server
  
      // Now navigate to /results-and-recommendations with the result data
      navigate('/results-and-recommendations', { state: { result } });
  
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  
  


 

  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleCancelSubmit = () => setOpen(false);


  const checkboxStyle = {
    color: '#D28C41',
    '&.Mui-checked': {
      color: '#D28C41',
    },
  };

  const Counter = ({ label, value, setValue, unit }) => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        border: '1px solid #D28C41',
        borderRadius: '12px',
        px: 2,
        py: 1,
        mb: 2,
      }}
    >
      <Typography sx={{ fontFamily: "'Urbanist', sans-serif", color: '#D28C41', flexGrow: 1 }}>
        {label} {unit}
      </Typography>
  
      <IconButton onClick={() => setValue(Math.max(0, value - 1))}>
        <Remove sx={{ color: '#D28C41' }} />
      </IconButton>
  
      <Typography sx={{ width: '30px', textAlign: 'center', fontFamily: "'Urbanist', sans-serif" }}>
        {value}
      </Typography>
  
      <IconButton onClick={() => setValue(value + 1)}>
        <Add sx={{ color: '#D28C41' }} />
      </IconButton>
    </Box>
  );

  const isMissing = (val) => val === null || val === undefined || val === '';
  const handleNext = () => {
    if (activeStep === 0) {
      const step0Fields = [
        tshirtsRecycledCotton,
        tshirtsCotton,
        tshirtsViscose,
        tshirtsRecycledViscose,
        tshirtsPolyester,
        tshirtsRecycledPolyester,
        tshirtsOrganicCotton,
        dressesCotton,
        dressesRecycledCotton,
        dressesViscose,
        dressesRecycledViscose,
        dressesPolyester,
        dressesRecycledPolyester,
        trousersDenim,
        trousersCottonJeans,
        trousersPolyester,
        jacketsSynthetic,
        jacketsSkinLeather,
        jacketsDown,
     
      ];
  
      const noneSelected = step0Fields.every(
        (val) => !val || val === 0
      );
  
      if (noneSelected) {
        alert("You need to select at least one item before proceeding.");
        return;
      }
    }
  
    if (activeStep === 1) {
      const missing = [];
    
      if (monthlyLoads === null || monthlyLoads === undefined || monthlyLoads === 0) {
        missing.push("the number of laundry loads");
      }
    
      if (!washTemps) {
        missing.push("a washing temperature");
      }
    
      if (!detergentType) {
        missing.push("a detergent type");
      }
    
      if (missing.length > 0) {
        const last = missing.pop();
        const message = missing.length
          ? `Please select ${missing.join(", ")}, and ${last} to continue.`
          : `Please select ${last} to continue.`;
    
        alert(message);
        return;
      }
    }
     
  
    if (activeStep === 2) {
      const isClothingLongevityMissing = !clothingLongevity;
    
      if (isClothingLongevityMissing) {
        alert("Please select how long you typically keep your clothing before replacing it.");
        return;
      }
    }
  
    // Move to the next step
    setActiveStep((prev) => prev + 1);
  };
  
  

  const handleSubmit = () => {
    const missing = [];
  
    // Check each question and add a short identifier if not answered
    if (ethicalCertifications === null || ethicalCertifications === undefined) {
      missing.push("Q1");
    }
  
    if (brandResearch === null || brandResearch === undefined) {
      missing.push("Q2");
    }
  
    if (ethicalPlatforms === null || ethicalPlatforms === undefined) {
      missing.push("Q3");
    }
  
    // If there are missing questions, show an alert
    if (missing.length > 0) {
      const last = missing.pop();
      const message = missing.length
        ? `Please select an answer for ${missing.join(", ")}, and ${last} to continue.`
        : `Please select an answer ${last} to continue.`;
      alert(message);
      return;
    }
  
    // If all questions are answered, open the confirmation dialog
    setOpen(true); // This opens the dialog
  };
  

  useEffect(() => {
    if (tumbleDryLoads > monthlyLoads) {
      setTumbleDryLoads(monthlyLoads);
    }
  }, [monthlyLoads, tumbleDryLoads]);
  
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
          <Typography
          variant="h6"
          sx={{
            mt: 4,
            mb: 2,
            fontFamily: "'Urbanist', sans-serif",
            fontSize: isMobile ? '1rem' : '1.25rem'
          }}
        >
          Q1.&nbsp;&nbsp;How many of the following items did you purchase in the last 12 months? <span style={{ color: '#D28C41' }}>*</span>
        </Typography>
           <Box
  display="flex"
  flexDirection="column"
  gap={6}
  sx={{ px: { xs: 3, sm: 5, md: 7 } }}
>
<Box>

{/* T-SHIRTS */}
<Typography variant="h6" sx={{ fontFamily: "'Urbanist', sans-serif", fontSize: isMobile ? '1rem' : '1.25rem', mb: 2 }}>
  T-Shirt
</Typography>
{[
  { label: "Recycled Cotton", value: tshirtsRecycledCotton, setValue: setTshirtsRecycledCotton },
  { label: "Cotton", value: tshirtsCotton, setValue: setTshirtsCotton },
  { label: "Viscose", value: tshirtsViscose, setValue: setTshirtsViscose },
  { label: "Recycled Viscose", value: tshirtsRecycledViscose, setValue: setTshirtsRecycledViscose },
  { label: "Polyester", value: tshirtsPolyester, setValue: setTshirtsPolyester },
  { label: "Recycled Polyester", value: tshirtsRecycledPolyester, setValue: setTshirtsRecycledPolyester },
  { label: "Organic Cotton", value: tshirtsOrganicCotton, setValue: setTshirtsOrganicCotton },
].map((material, index) => {
  const label =
    material.label === "Viscose" ? (
      <StyledTooltip title="Viscose is a soft, breathable fabric made from wood pulp, often used as a silk alternative.">
        <span style={{ textDecoration: 'underline dotted', cursor: 'help', color: '#D28C41' }}>
          {material.label}
        </span>
      </StyledTooltip>
    ) : (
      material.label
    );

  return (
    <Counter
      key={index}
      label={label}
      value={material.value}
      setValue={material.setValue}
      unit="T-Shirt"
    />
  );
})}

{/* DRESSES */}
<Typography variant="h6" sx={{ mt: 4, fontFamily: "'Urbanist', sans-serif", fontSize: isMobile ? '1rem' : '1.25rem', mb: 2 }}>
  Dress
</Typography>
{[
  { label: "Cotton", value: dressesCotton, setValue: setDressesCotton },
  { label: "Recycled Cotton", value: dressesRecycledCotton, setValue: setDressesRecycledCotton },
  { label: "Viscose", value: dressesViscose, setValue: setDressesViscose },
  { label: "Recycled Viscose", value: dressesRecycledViscose, setValue: setDressesRecycledViscose },
  { label: "Polyester", value: dressesPolyester, setValue: setDressesPolyester },
  { label: "Recycled Polyester", value: dressesRecycledPolyester, setValue: setDressesRecycledPolyester },
].map((material, index) => (
  <Counter key={index} label={material.label} value={material.value} setValue={material.setValue} unit="Dress" />
))}

{/* TROUSERS / JEANS */}
<Typography variant="h6" sx={{ mt: 4, fontFamily: "'Urbanist', sans-serif", fontSize: isMobile ? '1rem' : '1.25rem', mb: 2 }}>
  Trouser / Jeans
</Typography>
{[
  { label: "Denim Jeans", value: trousersDenim, setValue: setTrousersDenim },
  { label: "Cotton Jeans", value: trousersCottonJeans, setValue: setTrousersCottonJeans },
  { label: "Polyester Trousers", value: trousersPolyester, setValue: setTrousersPolyester },
].map((material, index) => (
  <Counter key={index} label={material.label} value={material.value} setValue={material.setValue}/>
))}

{/* JACKETS */}
<Typography variant="h6" sx={{ mt: 4, fontFamily: "'Urbanist', sans-serif", fontSize: isMobile ? '1rem' : '1.25rem', mb: 2 }}>
  Jacket
</Typography>
{[
  { label: "Synthetic Leather", value: jacketsSynthetic, setValue: setJacketsSynthetic },
  { label: "Skin Leather", value: jacketsSkinLeather, setValue: setJacketsSkinLeather },
  { label: "Down", value: jacketsDown, setValue: setJacketsDown },

].map((material, index) => {
  const label =
    material.label === "Down" ? (
      <StyledTooltip title="Down is the soft layer of feathers from ducks or geese, used as insulation in jackets for warmth.">
        <span style={{ textDecoration: 'underline dotted', cursor: 'help', color: '#D28C41' }}>
          {material.label}
        </span>
      </StyledTooltip>
    ) : (
      material.label
    );

  return (
    <Counter
      key={index}
      label={label}
      value={material.value}
      setValue={material.setValue}
      unit="Jacket"
    />
  );
})}

</Box>

  </Box>

          </>
        );
        case 1:
          return (
        <> 
        {/* Q1 - Monthly Laundry Loads (Slider) */}
        <Typography
  variant="h6"
  sx={{
    mt: 4,
    mb: 2,
    fontFamily: "'Urbanist', sans-serif",
    fontSize: isMobile ? '1rem' : '1.25rem'
  }}
>
  Q1.&nbsp;&nbsp;
  <span>
    <a href="https://goodmakertales.com/how-often-should-you-do-your-laundry/" target="_blank" style={{ textDecoration: 'underline', textDecorationColor: '#D28C41' }}>
      The average person does laundry about 1 to 3 times per week
    </a>
    , that’s roughly 4 to 12 loads per month. How many laundry loads do you typically do in a month?
  </span>
  <span style={{ color: '#D28C41' }}>*</span>
</Typography>


        <Box display="flex" alignItems="center" gap={2}>
          <Slider
            value={monthlyLoads}
            onChange={(_e, newValue) => setMonthlyLoads(newValue)}
            min={0}
            max={12}
            step={1}
            valueLabelDisplay="auto"
            sx={{ flexGrow: 1, color: '#D28C41;' }}
          />
        </Box>
        <Typography sx={{ fontFamily: "'Urbanist', sans-serif" }} textAlign="center" mt={1}>
          {monthlyLoads} loads per month
        </Typography>
      
        {/* Q2 - Washing Temperature */}
        <Typography
          variant="h6"
          sx={{
            mt: 4,
            mb: 2,
            fontFamily: "'Urbanist', sans-serif",
            fontSize: isMobile ? '1rem' : '1.25rem'
          }}
        >
          Q2.&nbsp;&nbsp;What is the usual washing temperature you use for most of your laundry? <span style={{ color: '#D28C41' }}>*</span>
        </Typography>
      
        <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
          {["Less than 30", "40", "50", "More than 60"].map(temp => (
            <Button
              key={temp}
              variant={washTemps === temp ? "contained" : "outlined"}
              onClick={() => setWashTemps(temp)}
              sx={{
                textTransform: "none",
                fontFamily: "'Urbanist', sans-serif",
                color: washTemps === temp ? "#fff" : "#D28C41",
                backgroundColor: washTemps === temp ? "#D28C41" : "transparent",
                border: washTemps === temp ? "none" : "1px solid white",
                "&:hover": { backgroundColor: "#D28C41", color: "#fff", border: "none" },
                minWidth: { xs: 100, sm: 120, md: 150 },
                padding: { xs: '5px 10px', sm: '8px 16px' },
              }}
            >
              {temp} ℃
            </Button>
          ))}
        </Box>
      
        {/* Q3 - Detergent Type */}
        <Typography
          variant="h6"
          sx={{
            mt: 4,
            mb: 2,
            fontFamily: "'Urbanist', sans-serif",
            fontSize: isMobile ? '1rem' : '1.25rem'
          }}
        >
          Q3.&nbsp;&nbsp;What type of laundry detergent do you primarily use? <span style={{ color: '#D28C41' }}>*</span>
        </Typography>
      
        <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
          {["Powder", "Liquid", "Capsule", "Tablet"].map(type => (
            <Button
              key={type}
              variant={detergentType === type ? "contained" : "outlined"}
              onClick={() => setDetergentType(type)}
              sx={{
                textTransform: "none",
                fontFamily: "'Urbanist', sans-serif",
                color: detergentType === type ? "#fff" : "#D28C41",
                backgroundColor: detergentType === type ? "#D28C41" : "transparent",
                border: detergentType === type ? "none" : "1px solid white",
                "&:hover": { backgroundColor: "#D28C41", color: "#fff", border: "none" },
                minWidth: { xs: 100, sm: 120, md: 150 },
                padding: { xs: '5px 10px', sm: '8px 16px' },
              }}
            >
              {type}
            </Button>
          ))}
        </Box>
      
        {/* Q4 - Tumble Dry Loads (Slider) */}
        <Typography
          variant="h6"
          sx={{
            mt: 4,
            mb: 2,
            fontFamily: "'Urbanist', sans-serif",
            fontSize: isMobile ? '1rem' : '1.25rem'
          }}
        >
          Q4.&nbsp;&nbsp;Out of the laundry loads you do in a month, how many do you dry using a tumble dryer? <span style={{ color: '#D28C41' }}>*</span>
        </Typography>
      
        <Box display="flex" alignItems="center" gap={2}>
          <Slider
            value={tumbleDryLoads}
            onChange={(_e, newValue) => setTumbleDryLoads(newValue)}
            min={0}
            max={monthlyLoads}
            step={1}
            valueLabelDisplay="auto"
            sx={{ flexGrow: 1, color: '#D28C41;' }}
          />
        </Box>
        <Typography sx={{ fontFamily: "'Urbanist', sans-serif" }} textAlign="center" mt={1}>
          {tumbleDryLoads} loads dried using tumble dryer
        </Typography>
      </>
          );
        case 2:
  return (
    <>
  <Typography 
      variant="h6" 
      sx={{ mt: 4, fontFamily: "'Urbanist', sans-serif", fontSize: isMobile ? '1rem' : '1.25rem', mb: 2 }}
    >
      Q1.&nbsp;&nbsp;In the past 12 months, how many of the following clothing items have you repaired (e.g., by sewing, patching, or mending) instead of buying new ones? <span style={{ color: '#D28C41' }}>*</span>
    </Typography>


{/* T-Shirts Counter */}
<Typography variant="h6" sx={{ mt: 4, fontFamily: "'Urbanist', sans-serif", fontSize: isMobile ? '1rem' : '1.25rem', mb: 2 }}>
  T-Shirts and Tops
</Typography>
<Counter label="T-Shirts and Tops" value={tShirts} setValue={setTShirts} />

{/* Trousers (excluding denim) Counter */}
<Typography variant="h6" sx={{ mt: 4, fontFamily: "'Urbanist', sans-serif", fontSize: isMobile ? '1rem' : '1.25rem', mb: 2 }}>
  Trousers (excluding denim)
</Typography>
<Counter label="Trousers (excluding denim)" value={trousers} setValue={setTrousers} />

{/* Jackets Counter */}
<Typography variant="h6" sx={{ mt: 4, fontFamily: "'Urbanist', sans-serif", fontSize: isMobile ? '1rem' : '1.25rem', mb: 2 }}>
  Jackets (excluding denim)
</Typography>
<Counter label="Jackets(excluding denim)" value={jackets} setValue={setJackets} />

{/* Denim Jeans Counter */}
<Typography variant="h6" sx={{ mt: 4, fontFamily: "'Urbanist', sans-serif", fontSize: isMobile ? '1rem' : '1.25rem', mb: 2 }}>
  Denim Jeans and Jackets
</Typography>
<Counter label="Denim Jeans and Jackets" value={denimJeans} setValue={setDenimJeans} />

{/* Dresses Counter */}
<Typography variant="h6" sx={{ mt: 4, fontFamily: "'Urbanist', sans-serif", fontSize: isMobile ? '1rem' : '1.25rem', mb: 2 }}>
  Dresses
</Typography>
<Counter label="Dresses" value={dresses} setValue={setDresses} />


    {/* Q2 Question */}
    <Typography 
        variant="h6" 
        sx={{ mt: 4, mb: 2, fontFamily: "'Urbanist', sans-serif", fontSize: isMobile ? '1rem' : '1.25rem'}}
      >
        Q2.&nbsp;&nbsp;On average, how long do you keep your clothing before replacing or discarding it? <span style={{ color: '#D28C41' }}>*</span>
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {[
          { label: "Less than 1 year", value: "Less than 1 year" },
          { label: "1-3 years", value: "1-3 years" },
          { label: "4-6 years", value: "4-6 years" },
          { label: "7+ years", value: "7+ years" },
        ].map((item, index) => (
          <Button
            key={index}
            variant={clothingLongevity === item.value ? "contained" : "outlined"}
            onClick={() => setClothingLongevity(item.value)}
            sx={{
              textTransform: "none",
              fontFamily: "'Urbanist', sans-serif",
              color: clothingLongevity === item.value ? "#fff" : "#D28C41",
              backgroundColor: clothingLongevity === item.value ? "#D28C41" : "transparent",
              border: clothingLongevity === item.value ? "none" : "1px solid white", 
              "&:hover": {
                backgroundColor: "#D28C41",
                color: "#fff",
                border: "none"
              },
              minWidth: { xs: 80, sm: 110, md: 130 }, 
              padding: { xs: '1px 2px', sm: '10px 3px' },
            }}
          >
            {item.label}
          </Button>
        ))}
      </Box>
  </>
);

        case 3:
          return (
            <>
               <Typography 
      variant="h6" 
      sx={{ mt: 4, mb: 2, fontFamily: "'Urbanist', sans-serif", fontSize: isMobile ? '1rem' : '1.25rem' }}
    >
      Q1.&nbsp;&nbsp;Approximately how many items of clothing do you purchase second-hand? <span style={{ color: '#D28C41' }}>*</span>
    </Typography>

    {/* T-Shirts Counter */}
    <Typography variant="h6" sx={{ mt: 4, fontFamily: "'Urbanist', sans-serif", fontSize: isMobile ? '1rem' : '1.25rem', mb: 2 }}>
      T-Shirts
    </Typography>
    <Counter label="T-Shirts" value={secondHandTShirts} setValue={setSecondHandTShirts} />

    {/* Knitwear Counter */}
    <Typography variant="h6" sx={{ mt: 4, fontFamily: "'Urbanist', sans-serif", fontSize: isMobile ? '1rem' : '1.25rem', mb: 2 }}>
      Knitwear
    </Typography>
    <Counter label="Knitwear" value={secondHandKnitwear} setValue={setSecondHandKnitwear} />

    {/* Dresses Counter */}
    <Typography variant="h6" sx={{ mt: 4, fontFamily: "'Urbanist', sans-serif", fontSize: isMobile ? '1rem' : '1.25rem', mb: 2 }}>
      Dresses
    </Typography>
    <Counter label="Dresses" value={secondHandDresses} setValue={setSecondHandDresses} />

    {/* Jeans Counter */}
    <Typography variant="h6" sx={{ mt: 4, fontFamily: "'Urbanist', sans-serif", fontSize: isMobile ? '1rem' : '1.25rem', mb: 2 }}>
      Jeans
    </Typography>
    <Counter label="Jeans" value={secondHandJeans} setValue={setSecondHandJeans} />

    {/* Trousers Counter */}
    <Typography variant="h6" sx={{ mt: 4, fontFamily: "'Urbanist', sans-serif", fontSize: isMobile ? '1rem' : '1.25rem', mb: 2 }}>
      Trousers
    </Typography>
    <Counter label="Trousers" value={secondHandTrousers} setValue={setSecondHandTrousers} />

    {/* Shoes Counter */}
    <Typography variant="h6" sx={{ mt: 4, fontFamily: "'Urbanist', sans-serif", fontSize: isMobile ? '1rem' : '1.25rem', mb: 2 }}>
      Shoes
    </Typography>
    <Counter label="Shoes" value={secondHandShoes} setValue={setSecondHandShoes}  />

    {/* Coats Counter */}
    <Typography variant="h6" sx={{ mt: 4, fontFamily: "'Urbanist', sans-serif", fontSize: isMobile ? '1rem' : '1.25rem', mb: 2 }}>
      Coats
    </Typography>
    <Counter label="Coats" value={secondHandCoats} setValue={setSecondHandCoats}/>

  
              <Typography variant="h6" sx={{ mt: 4, mb: 2, fontFamily: "'Urbanist', sans-serif", fontSize: isMobile ? '1rem' : '1.25rem'}}>
                Q2.&nbsp;&nbsp;How often do you donate or resell clothing instead of throwing it away? <span style={{ color: '#D28C41' }}>*</span>
              </Typography>
              <Slider
                value={donationFrequency}
                onChange={(_e, newValue) => setDonationFrequency(newValue)}
                min={0}
                max={50}
                step={1}
                valueLabelDisplay="auto"
                sx={{ flexGrow: 1, color: '#D28C41' }}
              />
              <Typography sx={{fontFamily: "'Urbanist', sans-serif"}}>{donationFrequency} Times/Year</Typography>
            </>
          );
          
        
        case 4: // Ethical & Social Responsibility
          return (
            <>
{/* Question 1 — Ethical Certifications */}
<Typography variant="h6" sx={{ mt: 4, mb: 2, fontFamily: "'Urbanist', sans-serif", fontSize: '1.25rem' }}>
  Q1.&nbsp;&nbsp;
  How important is it to you to support clothing brands that follow ethical standards such as{" "}
  <StyledTooltip title="Fair Trade ensures that producers in developing countries are paid fair wages, work in safe conditions, and are not subject to exploitation.">
    <span style={{ textDecoration: 'underline dotted', cursor: 'help', color: '#D28C41' }}>
      Fair Trade
    </span>
  </StyledTooltip>
  ,{" "}
  <StyledTooltip title="B Corp is a certification for businesses that meet high social and environmental performance standards, accountability, and transparency.">
    <span style={{ textDecoration: 'underline dotted', cursor: 'help', color: '#D28C41' }}>
      B Corp
    </span>
  </StyledTooltip>
  , or{" "}
  <StyledTooltip title="SA8000 is a certification standard for social accountability in workplaces, focusing on labor rights and ethical working conditions.">
    <span style={{ textDecoration: 'underline dotted', cursor: 'help', color: '#D28C41' }}>
      SA8000
    </span>
  </StyledTooltip>
  {" "} as part of your responsibility as a consumer? <span style={{ color: '#D28C41' }}>*</span>
</Typography>

<RadioGroup
  name="ethicalCertifications"
  value={ethicalCertifications}
  onChange={(e) => setEthicalCertifications(Number(e.target.value))}
  sx={{ fontFamily: "'Urbanist', sans-serif" }}
>
  {[
    "Not important at all",
    "Somewhat important",
    "Important",
    "Very important"
  ].map((label, index) => (
    <FormControlLabel
      key={index}
      value={index}
      control={<Radio sx={checkboxStyle} />}
      label={label}
      sx={{
        '& .MuiFormControlLabel-label': {
          fontFamily: "'Urbanist', sans-serif"
        }
      }}
    />
  ))}
</RadioGroup>

{/* Question 2 — Brand Research */}
<Typography variant="h6" sx={{ mt: 4, mb: 2, fontFamily: "'Urbanist', sans-serif", fontSize: '1.25rem' }}>
  Q2.&nbsp;&nbsp;To what extent do you make an effort to understand how a brand treats workers and the environment before buying from them? <span style={{ color: '#D28C41' }}>*</span>
</Typography>
<RadioGroup
  name="brandResearch"
  value={brandResearch}
  onChange={(e) => setBrandResearch(Number(e.target.value))}
  sx={{ fontFamily: "'Urbanist', sans-serif" }}
>
  {[
    "Never",
    "Rarely",
    "Sometimes",
    "Often",
    "Always"
  ].map((label, index) => (
    <FormControlLabel
      key={index}
      value={index}
      control={<Radio sx={checkboxStyle} />}
      label={label}
      sx={{
        '& .MuiFormControlLabel-label': {
          fontFamily: "'Urbanist', sans-serif"
        }
      }}
    />
  ))}
</RadioGroup>

{/* Question 3 — Use of Ethical Platforms */}
<Typography variant="h6" sx={{ mt: 4, mb: 2, fontFamily: "'Urbanist', sans-serif", fontSize: '1.25rem' }}>
  Q3.&nbsp;&nbsp;Do you use platforms like{" "}
  <StyledTooltip 
    title={
      <>
        <p><a href="https://goodonyou.eco/" target="_blank" rel="noopener noreferrer" style={{ color: '#D28C41' }}>Good On You</a> is a platform that rates fashion brands based on their sustainability and ethical practices.</p>
        <p style={{ marginTop: '8px' }}>Visit: <a href="https://goodonyou.eco/" target="_blank" rel="noopener noreferrer" style={{ color: '#D28C41' }}>Good On You</a></p>
      </>
    } 
    placement="top"
  >
    <span style={{ textDecoration: 'underline dotted', cursor: 'help', color: '#D28C41' }}>
      Good On You
    </span>
  </StyledTooltip>
  {" "} or{" "}
  <StyledTooltip 
    title={
      <>
        <p><a href="https://ethicalconsumer.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#D28C41' }}>Ethical Consumer</a> is a platform that helps consumers make ethical buying decisions by providing ratings based on the environmental, social, and ethical performance of companies.</p>
        <p style={{ marginTop: '8px' }}>Visit: <a href="https://ethicalconsumer.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#D28C41' }}>Ethical Consumer</a></p>
      </>
    } 
    placement="top"
  >
    <span style={{ textDecoration: 'underline dotted', cursor: 'help', color: '#D28C41' }}>
      Ethical Consumer
    </span>
  </StyledTooltip>
  {" "} to guide your fashion choices and make informed, ethical, and responsible decisions? <span style={{ color: '#D28C41' }}>*</span>
</Typography>


<RadioGroup
  name="ethicalPlatforms"
  value={ethicalPlatforms}
  onChange={(e) => setEthicalPlatforms(Number(e.target.value))}
  sx={{ fontFamily: "'Urbanist', sans-serif" }}
>
  {[
    "Never",
    "Occasionally",
    "Frequently",
    "Always"
  ].map((label, index) => (
    <FormControlLabel
      key={index}
      value={index}
      control={<Radio sx={checkboxStyle} />}
      label={label}
      sx={{
        '& .MuiFormControlLabel-label': {
          fontFamily: "'Urbanist', sans-serif"
        }
      }}
    />
  ))}
</RadioGroup>

            </>
          );

          default:
            return (
              <Typography sx={{ fontFamily: "'Urbanist', sans-serif" }}>
                Unknown step. Please refresh the page or contact support.
              </Typography>
            );
      }


    };
  

    return (
      <>
        <Navbar/>
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

        <Heading />
        
        <Container maxWidth="lg" sx={{ minHeight: '100vh', backgroundColor: '#372f26', color: 'white', py: 5 }}>
          <Paper elevation={10} sx={{ p: isMobile ? 3 : 5, backgroundColor: '#3b332e', borderRadius: '12px' }}>
            <Stepper
              activeStep={activeStep}
              orientation={isMobile ? 'vertical' : 'horizontal'}
              alternativeLabel={!isMobile}
              sx={{
                mb: 5,
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '30px' : '15px',
                padding: isMobile ? '0 20px' : '0',
              }}
            >
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepLabel
                    icon={
                      activeStep > index ? (
                        <Avatar sx={{ bgcolor: '#7c6f3e', width: 40, height: 40, marginBottom: '10px' }}>
                          <CheckCircleIcon sx={{ color: 'white' }} />
                        </Avatar>
                      ) : (
                        <Avatar sx={{ bgcolor: '#D28C41', width: 40, height: 40, marginBottom: '10px' }}>
                          <IconButton sx={{ color: 'white' }}>
                            {step.icon}
                          </IconButton>
                        </Avatar>
                      )
                    }
                  />
                  {isMobile && activeStep === index && (
                    <Box sx={{ textAlign: 'center', mt: 2, color: 'white' }}>
                      <Typography 
                        sx={{ color: 'white', fontFamily: "'Urbanist', sans-serif", fontSize: '1.2rem', marginBottom: "30px" }} 
                        variant="h6"
                      >
                        {`Step ${index + 1}: ${step.label}`}
                      </Typography>
  
                      <Paper sx={{ p: 3, backgroundColor: '#4a4039', borderRadius: '8px', width: '100%' }}>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Typography sx={{ mt: 1, color: "white", fontFamily: "'Urbanist', sans-serif" }}>
                            {getStepContent(index)}
                          </Typography>
                        </motion.div>
                      </Paper>
                    </Box>
                  )}
                </Step>
              ))}
            </Stepper>
  
            {/* Non-Mobile Version */}
            
            {!isMobile && (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: 'white', mb: 2, fontFamily: "'Urbanist', sans-serif", fontSize: "2rem" }}>
                  {`Step ${activeStep + 1}: ${steps[activeStep].label}`}
                </Typography>
                <Paper sx={{ p: 3, backgroundColor: '#4a4039', borderRadius: '8px', width: '100%' }}>
                  <Typography sx={{ color: 'white', fontFamily: "'Urbanist', sans-serif" }}>
                    {getStepContent(activeStep)}
                  </Typography>
                </Paper>
              </Box>
            )}
  
            {/* Navigation Buttons */}
            <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} justifyContent="space-between" gap={2}>
              {activeStep > 0 && (
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={handleBack} 
                  sx={{
                    backgroundColor: "#7c6f3e", 
                    fontFamily: "'Urbanist', sans-serif", 
                    border: '2px solid white', 
                    borderRadius: '8px',
                    "&:hover": { backgroundColor: "#6a5a39" }
                  }}
                >
                  Back
                </Button>
              )}
              {activeStep < steps.length - 1 ? (
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleNext} 
                  sx={{
                    backgroundColor: "#7c6f3e", 
                    fontFamily: "'Urbanist', sans-serif", 
                    border: '2px solid white', 
                    borderRadius: '8px',
                    "&:hover": { backgroundColor: "#6a5a39" }
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button 
                  variant="contained" 
                  color="success" 
                  onClick={handleSubmit}
                  sx={{
                    backgroundColor: "#7c6f3e", 
                    fontFamily: "'Urbanist', sans-serif",  
                    border: '2px solid white', 
                    borderRadius: '8px',
                    "&:hover": { backgroundColor: "#6a5a39" }
                  }}
                >
                  Submit
                </Button>
              )}
            </Box>
          </Paper>
  
          <Dialog open={open} onClose={handleCancelSubmit}>
            <DialogTitle sx={{ fontFamily: "'Urbanist', sans-serif" }}>Confirm Submission</DialogTitle>
            <DialogContent>
              <Typography sx={{ fontFamily: "'Urbanist', sans-serif" }}>
                Are you sure you want to submit your responses?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button sx={{ fontFamily: "'Urbanist', sans-serif" }} onClick={handleCancelSubmit} color="secondary">
                Cancel
              </Button>
              <Button
                type="button"
      sx={{ fontFamily: "'Urbanist', sans-serif" }}
      color="primary"
      onClick={handleSubmitButton}
     >Submit
    </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </>
    );
  };
  
  export default FashionFootprintCalculator;