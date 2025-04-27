import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery
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
import ClearIcon from '@mui/icons-material/Clear';


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
  const footprintValue = 90; // Dynamic value between 0–100

  const controls = useAnimation();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    controls.start({ value: footprintValue, transition: { duration: 1.5, ease: 'easeOut' } });
  }, [footprintValue]);

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
  const showIcons = bathCount; // Show all bathtubs based on full bath equivalents

// Assuming result.totalWasteDivertedKg is from your API response
const wasteDivertedData = result.totalWasteDivertedKg || 0;



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


      <Box sx={{
        display: 'flex',
        flexDirection: isMobile ? 'row' : 'row', // Ensures side by side on mobile as well
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        my: 4,
        width: isMobile ? '90%' : '60%',
        margin: '0 auto',
        position: 'relative',
      }}>
{/* Left: Progress Bar */}
<Box sx={{ flexGrow: 1, position: 'relative', width: '100%' }}>
  {/* Marker */}
  <Box
    sx={{
      position: 'absolute',
      top: '-14px',
      left: `calc(${footprintValue}% - 6px)`,
      width: 0,
      height: 0,
      zIndex: 5,
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      borderBottom: '8px solid white',
      transition: 'left 0.5s ease-in-out',
    }}
  />

  {/* Gradient Track */}
  <Box sx={{
    height: 20,
    width: '100%',
    borderRadius: 10,
    background: 'linear-gradient(to right, #00c853 0%, #ffeb3b 50%, #d50000 100%)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  }} />

  {/* Overlay Fill */}
  <Box sx={{
    height: 20,
    width: `${footprintValue}%`,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    backdropFilter: 'blur(1px)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    transition: 'width 0.5s ease-in-out',
  }} />

  
<br></br> <br></br>
  {/* Labels */}
  <Box sx={{
    position: 'absolute',
    bottom: isMobile? '-70px': '-10px',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: isMobile? '0.2rem' : '1.5rem',
    color: 'white',
    padding: '0 5px',
    zIndex: 4,
    textAlign: 'center',
  }}>
    <Typography sx={{ color: "#d3c7c8", width: '20%' }}>Very Low Impact</Typography>
    <Typography sx={{ color: "#d3c7c8", width: '20%' }}>Low Impact</Typography>
    <Typography sx={{ color: "#d3c7c8", width: '20%' }}>Average</Typography>
    <Typography sx={{ color: "#d3c7c8", width: '20%' }}>High Impact</Typography>
    <Typography sx={{ color: "#d3c7c8", width: '20%' }}>Very High Impact</Typography>
  </Box>
</Box>

      </Box>


 <br></br>  <br></br>  <br></br>  <br></br>

      <Container>
        {[
          'Clothing Consumption and Materials',
          'Clothing Care',
          'Clothing Repair & Longevity',
          'Second Hand & Donations',
          'Ethical & Social Responsibility',
        ].map((title, i) => (
          <Accordion key={i} sx={{ bgcolor: '#3b332e', color: 'white', mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
              <Typography sx={{ fontFamily: 'Urbanist', fontWeight: 'bold', fontSize: isMobile ? '1.25rem' : '1.5rem' }}>
                {title} 
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {title === 'Clothing Consumption and Materials' && (
                <>
                  <Typography align="center" sx={{ fontFamily: 'Urbanist', fontWeight: 'bold', mb: 2, fontSize: isMobile ? '1rem' : '1.5rem'}}>
                    CO₂ Emissions by Item and Material
                  </Typography>
                  <Typography align="center" color="#fff" sx={{ fontFamily: 'Urbanist', fontSize: isMobile ? '1rem' : '1.25rem', mb: 3 }}>
                    This chart shows the CO₂ emissions from the clothing purchases you made in the last 12 months.
                  </Typography>
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
                      boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
                    }}
                  >
                    <Bar data={barData} options={barOptions} />
                  </motion.div>
                </>
              )}

              {title === 'Clothing Care' && (
                <>
                  <Typography align="center" sx={{ fontFamily: 'Urbanist', fontWeight: 'bold', mb: 2, fontSize: isMobile ? '1rem' : '1.5rem'}}>
                    Laundry CO₂ Breakdown
                  </Typography>
                  <Typography align="center" sx={{ mb: 3, fontFamily: 'Urbanist', fontSize: isMobile ? '1rem' : '1.25rem' }}>
                    This chart shows the breakdown of emissions from washing and drying your clothes.
                  </Typography>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    style={{
                      maxWidth: isMobile ? 300 : 400,
                      margin: '0 auto',
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
      align="center"
      sx={{
        fontFamily: 'Urbanist',
        fontWeight: 'bold',
        mb: 2,
        fontSize: isMobile ? '1rem' : '1.5rem',
      }}
    >
      Water Saved by Extending Clothing Lifespan
    </Typography>

    <Typography
      align="center"
      sx={{
        mb: 3,
        fontFamily: 'Urbanist',
        fontSize: isMobile ? '1rem' : '1.25rem',
      }}
    >
      Thanks to your clothing repair and reuse habits, you’ve saved the equivalent of{' '}
      <strong>{bathCount}</strong> bathtubs of water!
    </Typography>

    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2, // space between the icon and the number
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1rem',
        p: 2,
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      }}
    >
      <BathtubIcon sx={{ fontSize: isMobile ? 28 : 36, color: '#a1eafb' }} />
      <Typography
  sx={{
    fontFamily: 'Urbanist',
    fontSize: isMobile ? '1rem' : '1.25rem',
    color: '#a1eafb',
    display: 'inline-flex',
    alignItems: 'center', // Aligns the icon and text
  }}
>
  <ClearIcon sx={{ verticalAlign: 'middle', marginBottom: '-2px' }} /> 
  {bathCount}
</Typography>

    </Box>
                  <Typography
                    align="center"
                    sx={{
                      fontFamily: 'Urbanist',
                      fontWeight: 'bold',
                      mt: 4,
                      mb: 1,
                      fontSize: isMobile ? '1rem' : '1.25rem'
                    }}
                  >
                    🌍 **Social and Ethical Benefits of Clothing Repair & Longevity**
                  </Typography>

                  <ul style={{ textAlign: 'left', maxWidth: 700, margin: '0 auto', color: '#fff', fontFamily: 'Urbanist', fontSize: isMobile ? '1rem' : '1.15rem' }}>
                    <li><strong>Reducing water usage:</strong> By repairing and extending the lifespan of your clothes, you're not just saving water from washing, you're also preventing the massive amounts of water used in clothing production. For example, it takes over 2,700 liters of water to produce just one cotton t-shirt. Every repair and reuse decision helps conserve this precious resource.</li>
                    <li><strong>Lowering demand for fast fashion:</strong> The fast fashion industry uses millions of liters of water in the production of clothing. By choosing to extend the life of your garments, you are directly contributing to a decrease in demand for new garments and the water-intensive processes involved in creating them.</li>
                    <li><strong>Protecting communities with limited access to clean water:</strong> The textile industry is a major consumer of water in regions where access to clean water is already scarce. By saving water through clothing repair, you're contributing to preserving this vital resource for communities that need it most.</li>
                    <li><strong>Empowering ethical practices:</strong> By supporting repair over fast fashion, you help reduce the environmental damage caused by water-intensive garment manufacturing processes, which often take place in countries with poor labor practices and exploitative working conditions.</li>
                    <li><strong>Promoting a circular economy:</strong> Repairing and reusing your clothing is a powerful way to foster a circular economy, where water, materials, and resources are kept in use for as long as possible, helping to protect the environment and ensure fair labor practices across the supply chain.</li>
                  </ul>

                  <Typography
                    align="center"
                    sx={{
                      fontFamily: 'Urbanist',
                      fontStyle: 'italic',
                      mt: 3,
                      fontSize: isMobile ? '0.9rem' : '1.1rem',
                      color: '#bbb'
                    }}
                  >
                    Your conscious decision to repair, reuse, and extend the life of your clothes helps save water, protect the environment, and promote a fairer, more ethical world. Every little action counts!
                  </Typography>
                </>
              )}

              {title === 'Second Hand & Donations' && (
                <>
                  <Typography
                    align="center"
                    sx={{
                      fontFamily: 'Urbanist',
                      fontWeight: 'bold',
                      mb: 2,
                      fontSize: isMobile ? '1rem' : '1.5rem'
                    }}
                  >
                    Waste Diverted Through Second Hand 
                  </Typography>
                  <Typography
                    align="center"
                    sx={{
                      mb: 3,
                      fontFamily: 'Urbanist',
                      fontSize: isMobile ? '1rem' : '1.25rem'
                    }}
                  >
                    This shows the amount of waste you've diverted by donating or buying second hand.
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
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </>
  );
}
