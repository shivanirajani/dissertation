import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BathtubIcon from '@mui/icons-material/Bathtub';
import { Bar, Doughnut } from 'react-chartjs-2';
import { motion, useAnimation} from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import Navbar from '../Navbar/Navbar';



// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  zoomPlugin
);

// Color map for material types
const colorMap = {
  cotton: '#D2B79A',
  recycledCotton: '#A3B18C',
  viscose: '#C18D5D',
  recycledViscose: '#6A7F44',
  polyester: '#B5838D',
  recycledPolyester: '#3A5D4E',
  organicCotton: '#B6C649',
  denim: '#7D8597',
  synthetic: '#D00000',
  skinLeather: '#6F1D1B',
  down: '#B08968',
};

export default function ResultsAndRecommendations() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const { result } = useLocation().state || {};
  const performanceMessage = result?.performanceMessage 
  const finalOverallImpact = result?.finalOverallImpact;
  const totalWasteDivertedKg = result?.totalWasteDivertedKg;
  const [displayValue, setDisplayValue] = useState(0);



  const controls = useAnimation();


  useEffect(() => {
    // Animate the value based on finalOverallImpact
    controls.start({
      value: finalOverallImpact, // Use finalOverallImpact instead of footprintValue
      transition: { duration: 1.5, ease: 'easeOut' }
    });
  }, [finalOverallImpact, controls]); // Add finalOverallImpact as a dependency to trigger reanimation
  

  if (!result) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          bgcolor: '#3b332e',
          color: 'white',
          p: isMobile ? 2 : 4,
          textAlign: 'center'
        }}
      >
        <Typography variant="h4" mb={2} fontFamily={'Urbanist'}>
          Oops, No Data Available!
        </Typography>
        <Typography mb={3} fontFamily={'Urbanist'}>
          It seems there was an issue fetching your data. Please answer the fashion footprint calculator questions.
        </Typography>
        <Box
          component="button"
          onClick={() => navigate('/footprint-calculator')}
          sx={{
            color: 'white',
            bgcolor: '#7c6f3e',
            px: 4,
            py: 1,
            border: '2px solid white',
            borderRadius: 1,
            cursor: 'pointer'
          }}
        >
          Fashion Footprint Calculator
        </Box>
      </Box>
    );
  }

  const items = ['tshirts', 'dresses', 'jeans', 'jackets'];
  const labelsBar = ['T‑Shirts', 'Dresses', 'Jeans', 'Jackets'];
  const mats = Array.from(new Set(items.flatMap(i => Object.keys(result.itemBreakdown[i] || {}))));

  const barData = {
    labels: labelsBar,
    datasets: mats.map(mat => ({
      label: mat,
      data: items.map(i => result.itemBreakdown[i]?.[mat] || 0),
      backgroundColor: colorMap[mat] || '#ccc'
    }))
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#fff', font: { family: 'Urbanist', size: isMobile ? 12 : 14 } }
      },
      tooltip: {
        callbacks: {
           label: ctx => `${ctx.dataset.label} kg CO₂`
        }
      },
      zoom: {
        pan: { enabled: true, mode: 'x', modifierKey: 'ctrl' },
        zoom: { enabled: true, mode: 'x', wheel: { enabled: true }, pinch: { enabled: true } }
      }
    },
    scales: {
      x: {
        stacked: true,
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'kg CO₂',
          color: '#fff',
          font: { family: 'Urbanist', size: 14 }
        },
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      }
    }
  };

  const laundry = result.itemBreakdown?.laundry || {};
  const detergentCO2 = laundry.breakdown.detergent.value;
  const temperatureCO2 = laundry.breakdown.temperature.value;
  const dryingCO2 = laundry.breakdown.drying.value;

  const donutData = {
    labels: ['Detergent', 'Temperature', 'Drying'],
    datasets: [
      {
        data: [detergentCO2, temperatureCO2, dryingCO2],
        backgroundColor: ['#8B4513', '#D2691E', '#CD5C5C'],
        hoverOffset: 8
      }
    ]
  };

  const donutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#fff', font: { family: 'Urbanist' } }
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const label = ctx.label || '';
            const percentage = label === 'Detergent' 
              ? laundry.breakdown.detergent.percentage
              : label === 'Temperature' 
              ? laundry.breakdown.temperature.percentage 
              : laundry.breakdown.drying.percentage;

            let additionalInfo = '';
            if (label === 'Detergent') {
              additionalInfo = `Type: ${laundry.detergentType}`;
            } else if (label === 'Temperature') {
              additionalInfo = `Temp: ${laundry.washTemps}`;
            } else if (label === 'Drying') {
              additionalInfo = `Tumble Dry Loads: ${laundry.tumbleDryLoads}`;
            }

            return `${percentage}% - ${additionalInfo}`;
          }
        }
      }
    }
  };

  const bathVolume = 150; // liters
  const totalWaterSaved = result.totalWaterSaved || 0;
  const bathCount = Math.floor(totalWaterSaved / bathVolume);


// Assuming result.totalWasteDivertedKg is from your API response
const wasteDivertedData = result.totalWasteDivertedKg || 0;
const fashionImpactLevel = result.fashionImpactLevel
const impactLevel= result.impactLevel
const finalImpact = result.finalImpact
const userImpact= result.userImpact
const finalEthicalImpact = result.finalEthicalImpact
const fashionPerformanceMessage = result.fashionPerformanceMessage
const comparisonMessage = result.comparisonMessage
const feedback= result.feedback
const steps= result.steps
const recommendationText = result.recommendationText
const messsage = result.messsage
const actionSteps = result.actionSteps



const bar = {
  labels: ['Waste Diverted Through Second Hand'],
  datasets: [
    {
      label: 'Waste Diverted (kg)',
      data: [wasteDivertedData],
      backgroundColor: ['#D3A6C4'],
      borderColor: ['#C095B6'],
      borderWidth: 1,
    },
  ],
};

const barWaste = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#fff',
        font: { family: 'Urbanist', size: 14 },
      },
    },
    tooltip: {
      callbacks: {
         label: ctx => `${ctx.dataset.label}: kg Waste Diverted`
      },
    },
  },
  scales: {
    x: {
      ticks: { color: '#fff' },
      grid: { color: 'rgba(255,255,255,0.1)' },
    },
    y: {
      title: {
        display: true,
        text: 'kg Waste Diverted',
        color: '#fff',
        font: { family: 'Urbanist', size: 14 },
      },
      ticks: { color: '#fff' },
      grid: { color: 'rgba(255,255,255,0.1)' },
    },
  },
};

  

  return (
    <>
      <Navbar />
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
            {/* Heading */}
            <Box sx={{
        textAlign: 'center',
        color: 'white',
        my: 4,
        padding: isMobile ? '0 10px' : '0 30px',
      }}>
        <motion.h1
          initial={{ y: "4rem", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, type: "spring" }}
          style={{
            color: '#c9c3bd',
            fontSize: isMobile ? '2.5rem' : '4rem',
            margin: 0,
            padding: 0,
          }}
        >
          Results and Recommendations
        </motion.h1>
      </Box>


<Box
  sx={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: { xs: 2, sm: 4 },
    my: 4,
    width: { xs: '95%', md: '80%' },
    margin: '0 auto',
    position: 'relative',
  }}
>
  {/* Progress Bar Section */}
  <Box sx={{ flex: 1, position: 'relative', minWidth: 0 }}>
    {/* Marker */}
    <Box
      sx={{
        position: 'absolute',
        top: '-14px',
        left: `calc(${finalOverallImpact}%)`,
        transform: 'translateX(-50%)',
        width: 0,
        height: 0,
        zIndex: 5,
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderBottom: '8px solid white',
        transition: 'left 0.5s ease-in-out',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
        pointerEvents: 'none',
      }}
    />

    {/* Gradient Track */}
    <Box
      sx={{
        height: 20,
        width: '100%',
        borderRadius: 10,
        background: 'linear-gradient(to right, #d50000 0%, #ffeb3b 50%, #00c853 100%)',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
      }}
    />

    {/* Fill */}
    <Box
      sx={{
        height: 20,
        width: `${finalOverallImpact}%`,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(1px)',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
        transition: 'width 0.5s ease-in-out',
      }}
    />

    {/* Labels */}
    <Box
      sx={{
        position: 'absolute',
        bottom: { xs: '-45px', sm: '-50px' },
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: { xs: '0.6rem', sm: '1rem' },
        color: 'white',
        padding: '0 5px',
        zIndex: 4,
        textAlign: 'center',
      }}
    >
     {['Poor', 'Lacking', 'Decent', 'Great', 'Outstanding'].map((label) => (
  <Typography
    key={label}
    sx={{
      width: '30%',
      fontSize: '0.8rem',
      textAlign: 'center',

    }}
  >
    {label}
  </Typography>
))}

    </Box>
  </Box>

  {/* Circle Indicator */}
  <motion.div
    animate={controls}
    initial={{ value: 0 }}
    onUpdate={(latest) => setDisplayValue(Math.round(latest.value))}
  >
    <Box
      sx={{
        width: { xs: 90, sm: 120, md: 150 },
        height: { xs: 90, sm: 120, md: 150 },
        borderRadius: '50%',
        border: '4px solid white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: { xs: '0.75rem', sm: '1rem' },
        boxShadow: '0 0 15px rgba(255,255,255,0.3)',
        background: 'rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(4px)',
        transition: 'all 0.3s ease-in-out',
        minWidth: { xs: 90, sm: 120, md: 150 },
      }}
    >
      <div
        style={{
          fontSize: '0.75rem',
          textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          margin: '0 6px',
        }}
      >
        Average Footprint Score:
      </div>
      <div
        style={{
          fontSize: '1.2rem',
          fontWeight: 'bold',
          textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
        }}
      >
        {finalOverallImpact}%
      </div>
    </Box>
  </motion.div>
</Box>



 <br></br>  <br></br>  <br></br>  <br></br>

 <Container>
  {[
    'Clothing Consumption and Materials',
    'Clothing Care',
    'Clothing Repair & Longevity',
    'Second Hand',
    'Ethical & Social Responsibility',
  ].map((title, i) => (
    <Accordion key={i} sx={{ bgcolor: '#3b332e', color: 'white', mb: 2 }}>
   <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
  <Typography
    sx={{
      fontFamily: 'Urbanist',
      fontWeight: 'bold',
      fontSize: isMobile ? '1.25rem' : '1.5rem',
      display: 'flex', // Use flex to align title and impact levels horizontally
      justifyContent: 'center', // Center them horizontally
      alignItems: 'center', // Align items vertically
    }}
  >
    {title}

    {/* Conditionally show fashionImpactLevel next to the title if it's 'Clothing Consumption and Materials' */}
    {title === 'Clothing Consumption and Materials' && fashionImpactLevel && (
      <span
        style={{
          marginLeft: '10px', // Space between the title and fashionImpactLevel
          fontSize: '1.25rem',
          fontWeight: 'normal',
          color: 'lightgrey',
        }}
      >
        {fashionImpactLevel}
      </span>
    )}

    {/* Conditionally show impactLevel next to the title if it's 'Clothing Care' */}
    {title === 'Clothing Care' && impactLevel && (
      <span
        style={{
          marginLeft: '10px', // Space between the title and impactLevel
          fontSize: '1.25rem',
          fontWeight: 'normal',
          color: 'lightgrey',
        }}
      >
        {impactLevel}
      </span>
    )}

   
    {title === 'Clothing Repair & Longevity' && finalImpact && (
      <span
        style={{
          marginLeft: '10px', // Space between the title and secondHandImpactLevel
          fontSize: '1.25rem',
          fontWeight: 'normal',
          color: 'lightgrey',
        }}
      >
        {finalImpact}
      </span>
    )}


{title === 'Second Hand' &&  userImpact && (
      <span
        style={{
          marginLeft: '10px',
          fontSize: '1.25rem',
          fontWeight: 'normal',
          color: 'lightgrey',
        }}
      >
        {userImpact}
      </span>
    )}
    


    {/* Conditionally show impactLevel next to the title if it's 'Clothing Care' */}
    {title === 'Ethical & Social Responsibility' && finalEthicalImpact  && (
      <span
        style={{
          marginLeft: '10px', // Space between the title and impactLevel
          fontSize: '1.25rem',
          fontWeight: 'normal',
          color: 'lightgrey',
        }}
      >
        {finalEthicalImpact}
      </span>
    )}

  </Typography>
</AccordionSummary>


<AccordionDetails>
  {title === 'Clothing Consumption and Materials' && (
    <>
        {/* Section Title */}
    <Typography
      variant="h6"
      color="#fff"
      sx={{
        fontFamily: 'Urbanist',
        fontWeight: 'bold',
        fontSize: isMobile ? '1rem' : '1.3rem',
        mb: 1,
      }}
    >
      Results and Recommendations
    </Typography>
      <Typography
        align="justify"
        color="#fff"
        sx={{
          fontFamily: 'Urbanist',
          fontSize: isMobile ? '0.9rem' : '1.1rem',  // Smaller font size
          mb: 2,
          whiteSpace: 'pre-line',  

        }}
      >
        {fashionPerformanceMessage}
      </Typography>

      {/* Comparison Message */}
      <Typography
        align="left"
        color="#fff"
        sx={{
          fontFamily: 'Urbanist',
          fontSize: isMobile ? '0.9rem' : '1.1rem',  // Smaller font size
          mb: 3,
          whiteSpace: 'pre-line', 

        }}
      >
        {comparisonMessage}
      </Typography>

      <Typography
  sx={{
    fontFamily: 'Urbanist',
    mb: 2,
    fontSize: isMobile ? '1rem' : '1.5rem',
  }}
>
  CO₂ Emissions by Item and Material
</Typography>

<Typography
  color="#fff"
  sx={{
    fontFamily: 'Urbanist',
    fontSize: isMobile ? '1rem' : '1.25rem',
    mb: 3,
  }}
>
  This chart shows the CO₂ emissions from the clothing purchases you made in the last 12 months.
</Typography>


      {/* Chart (motion animation) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          height: isMobile ? 400 : 600,
          width: '100%',
          padding: '2rem',
          borderRadius: '1.5rem',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
        }}
      >
        <Bar data={barData} options={barOptions} />
      </motion.div>
    </>

        )}
        

              {title === 'Clothing Care' &&  (
                <>
               {/* Section Title */}
                  <Typography
                    variant="h6"
                    color="#fff"
                    sx={{
                      fontFamily: 'Urbanist',
                      fontWeight: 'bold',
                      fontSize: isMobile ? '1rem' : '1.3rem',
                      mb: 1,
                    }}
                  >
                    Results and Recommendations

                  </Typography>
                    <Typography
                      align="left"
                      color="#fff"
                      sx={{
                        fontFamily: 'Urbanist',
                        fontSize: isMobile ? '0.9rem' : '1.1rem',  // Smaller font size
                        mb: 3,
                        whiteSpace: 'pre-line',  
                      }}
                    >
                      {performanceMessage}
                    </Typography>



                    <Typography
  sx={{
    fontFamily: 'Urbanist',
    fontWeight: 'bold',
    mb: 2,
    fontSize: isMobile ? '1rem' : '1.5rem',
  }}
>
  Laundry CO₂ Breakdown
</Typography>

<Typography
  sx={{
    mb: 3,
    fontFamily: 'Urbanist',
    fontSize: isMobile ? '1rem' : '1.25rem',
  }}
>
  This chart shows the breakdown of emissions from washing and drying your clothes.
</Typography>

<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  style={{
    maxWidth: isMobile ? 300 : 400,
    marginLeft: 0,
    padding: '1rem',
    borderRadius: '1rem',
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
  }}
>
  <Doughnut data={donutData} options={donutOptions} />
</motion.div>

                </>
              )}

{title === 'Clothing Repair & Longevity' && (
  <>
<Typography
  variant="h6"
  color="#fff"
  sx={{
    fontFamily: 'Urbanist',
    fontWeight: 'bold',
    fontSize: isMobile ? '1rem' : '1.3rem',
    mb: 1,
  }}
>
  Results and Recommendations
</Typography>
<Typography
  sx={{
    fontFamily: 'Urbanist',
    fontWeight: 'bold',
    mb: 2,
    fontSize: isMobile ? '1rem' : '1.1rem',
  }}
>
  Water Saved by Extending Clothing Lifespan through Repair
</Typography>
<Typography
  sx={{
    mb: 3,
    fontFamily: 'Urbanist',
    fontSize: isMobile ? '1rem' : '1.1rem',
    display: 'inline-flex',
    alignItems: 'center',
  }}
>
  You have saved the equivalent of
  <Box component="span" sx={{ ml: 0.5, mr: 0.5 }}>
    <strong>{bathCount}</strong>
  </Box>
  bathtubs of water!
  <BathtubIcon sx={{ fontSize: isMobile ? 28 : 36, color: '#a1eafb', marginLeft: '8px' }} />
</Typography>

<Typography
                      align="left"
                      color="#fff"
                      sx={{
                        fontFamily: 'Urbanist',
                        fontSize: isMobile ? '0.9rem' : '1.1rem',  // Smaller font size
                        mb: 3,
                        whiteSpace: 'pre-line',  
                   
                      }}
                    >
                      {messsage}
                    </Typography>

                    <Typography
                      align="left"
                      color="#fff"
                      sx={{
                        fontFamily: 'Urbanist',
                        fontSize: isMobile ? '0.9rem' : '1.1rem',  // Smaller font size
                        mb: 3,
                        whiteSpace: 'pre-line',  
          
                      }}
                    >
                      {actionSteps}
                    </Typography>                    






                </>
              )}

              {title === 'Second Hand' && (
                <>
                  <Typography
                    variant="h6"
                    color="#fff"
                    sx={{
                      fontFamily: 'Urbanist',
                      fontWeight: 'bold',
                      fontSize: isMobile ? '1rem' : '1.3rem',
                      mb: 1,
                    }}
                  >
                    Results and Recommendations

                  </Typography>

                  <Typography
                    variant="h6"
                    color="#fff"
                    sx={{
                      fontFamily: 'Urbanist',
                      fontSize: isMobile ? '1rem' : '1.1rem',
                      mb: 1,
                    }}
                  >
                By buying second hand items, you have diverted <strong>{totalWasteDivertedKg}kg</strong> of waste from landfills.


                  </Typography>
                 <Typography
                      align="left"
                      color="#fff"
                      sx={{
                        fontFamily: 'Urbanist',
                        fontSize: isMobile ? '0.9rem' : '1.1rem',  // Smaller font size
                        mb: 3,
                        whiteSpace: 'pre-line',  
                 
                      }}
                    >
                     
                      {feedback}
                    
                    </Typography>

                    <Typography
                      align="left"
                      color="#fff"
                      sx={{
                        fontFamily: 'Urbanist',
                        fontSize: isMobile ? '0.9rem' : '1.1rem',  // Smaller font size
                        mb: 3,
                        whiteSpace: 'pre-line',  
           
                      }}
                    >
                      {steps}
                    </Typography>
            <Typography
  sx={{
    fontFamily: 'Urbanist',
    fontWeight: 'bold',
    mb: 2,
    fontSize: isMobile ? '1em' : '1.5rem'
  }}
>
  Waste Diverted Through Buying From Second Hand 
</Typography>

<Typography
  sx={{
    mb: 3,
    fontFamily: 'Urbanist',
    fontSize: isMobile ? '1rem' : '1.25rem'
  }}
>
  This shows the amount of waste you've diverted by buying second hand.
</Typography>

                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    style={{
                      height: isMobile ? 300 : 400,
                      width: '100%',
                      padding: '2rem',
                      borderRadius: '1.5rem',
                      background: 'rgba(255,255,255,0.05)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
                    }}
                  >
                    <Bar data={bar} options={barWaste} />
                  </motion.div>
                </>
              )}
                          {title === 'Ethical & Social Responsibility' && (
                <>
                  <Typography
                      align="left"
                      color="#fff"
                      sx={{
                        fontFamily: 'Urbanist',
                        fontSize: isMobile ? '0.9rem' : '1.1rem',  // Smaller font size
                        mb: 3,
                        whiteSpace: 'pre-line',  
                      }}
                    >
                      {recommendationText}
                    </Typography>
    
                </>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      

<br></br> <br></br>
        {/* FAQ Section */}
<Typography
  variant="h5"
  color="#fff"
  sx={{
    fontFamily: 'Urbanist',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: '16px',
    mb: 3,
  }}
>
  Frequently Asked Questions
</Typography>

<Container>
  {[
    {
      question: 'What is the Fashion Footprint Calculator?',
      answer:
        'The Fashion Footprint Calculator is a tool designed to help you understand the environmental, social, and ethical impact of your clothing choices. It evaluates your habits, such as clothing consumption, laundry practices, and second-hand purchases, to provide actionable recommendations for reducing your footprint.',
    },
    {
      question: 'How is the Average Footprint Score calculated?',
      answer:
        'The Average Footprint Score is calculated based on your responses to the Fashion Footprint Calculator. It considers factors such as CO₂ emissions from clothing materials, laundry habits, water savings from repairs, and waste diverted through second-hand purchases. Each factor is weighted to provide a comprehensive score ranging from Poor to Outstanding.',
    },
    {
      question: 'What do the categories (Poor, Lacking, Decent, Great and Outstanding mean?',
      answer:
        'These categories represent your overall performance in terms of sustainability. "Poor" indicates a high environmental and social impact, while "Outstanding" reflects minimal impact and highly sustainable practices. The categories help you understand where you stand and how you can improve.',
    },
    {
      question: 'Where can I find my average Fashion Footprint Score?',
      answer:
      'Your Fashion Footprint Score is displayed in two ways: as an average score and as individual scores for each category. The average score is shown at the top of the Results and Recommendations page, represented by a visual scale indicator, which ranges from Poor to Outstanding, and a percentage value inside a circular indicator. This helps you understand your overall performance. The individual scores for each category, such as Clothing Care or Second Hand, are displayed next to the category titles in the accordion sections. These scores provide a detailed breakdown of your performance in specific areas.',
    },
  
  ].map((faq, index) => (
    <Accordion key={index} sx={{ bgcolor: '#3b332e', color: 'white', mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
        <Typography
          sx={{
            fontFamily: 'Urbanist',
            fontWeight: 'bold',
            fontSize: isMobile ? '1rem' : '1.25rem',
          }}
        >
          {faq.question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          sx={{
            fontFamily: 'Urbanist',
            fontSize: isMobile ? '0.9rem' : '1.1rem',
            color: '#fff',
          }}
        >
          {faq.answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  ))}
</Container>

{/* Export Results Button */}
<button 
  className="register-button" 
  style={{ fontFamily: 'Urbanist', marginTop: '20px' }} // Adjust the margin value as needed
>
  Export Results
</button>


      </Container>
    </>
  );
}
