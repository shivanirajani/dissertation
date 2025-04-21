import React from 'react';
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
import { Bar, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
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

  // If no result is available, show an error message and a link to the footprint calculator
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
          label: ctx => `${ctx.dataset.label}: ${ctx.raw.toFixed(2)} kg CO₂`
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

  // --- DONUT CHART DATA ---
  const laundry = result.itemBreakdown?.laundry || {};

  // Breakdown of laundry emissions for detergent, temperature, and drying
  const detergentCO2 = laundry.breakdown.detergent.value;
  const temperatureCO2 = laundry.breakdown.temperature.value;
  const dryingCO2 = laundry.breakdown.drying.value;
  const totalLaundryCO2 = laundry.totalLaundryCO2;

  const donutData = {
    labels: [
      'Detergent',
      'Temperature',
      'Drying'
    ],
    datasets: [
      {
        data: [detergentCO2, temperatureCO2, dryingCO2],
        backgroundColor: ['#8B4513', '#D2691E', '#CD5C5C'], // Earthy tones: brown, reddish-brown, and pinkish-red
        hoverOffset: 8
      }
    ]
  };
  
  // Donut chart options with detailed tooltips
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
            
            // Show only the type information once (without repeating it)
            if (label === 'Detergent') {
              additionalInfo = `Type: ${laundry.detergentType}`;
            } else if (label === 'Temperature') {
              additionalInfo = `Temp: ${laundry.washTemps}`;
            } else if (label === 'Drying') {
              additionalInfo = `Tumble Dry Loads: ${laundry.tumbleDryLoads}`;
            }
  
            // Return tooltip with only percentage and type
            return `${percentage}% - ${additionalInfo}`;
          }
        }
      }
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

      <Box sx={{ textAlign: 'center', color: 'white', my: 4 }}>
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ fontFamily: 'Urbanist', fontSize: isMobile ? '2.5rem' : '4rem' }}
        >
          Results & Recommendations
        </motion.h1>
      </Box>

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
                  <Typography
        align="center"
        color="#fff"
        sx={{ fontFamily: 'Urbanist', fontSize: isMobile ? '1rem' : '1.25rem', mb: 3 }}
      >
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
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </>
  );
}
