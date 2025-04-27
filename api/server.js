const express = require('express');
const cors = require('cors');

const app = express();


// Middleware
app.use(express.json());
app.use(cors());

// Emission factors in kg CO2 per item
const emissionFactors = {
  tshirts: {
    recycledCotton: 5.8,
    cotton: 8.4,
    viscose: 6.7,
    recycledViscose: 6.4,
    polyester: 8.4,
    recycledPolyester: 6.5,
    organicCotton: 4.07,
  },
  dresses: {
    cotton: 25.2,
    recycledCotton: 19.7,
    polyester: 22.7,
    recycledPolyester: 21.4,
    viscose: 21.8,
    recycledViscose: 21.3,
  },
  jeans: {
    denim: 33.4,
    cotton: 90.37,
    polyester: 14.25,
  },
  jackets: {
    synthetic: 25.3,
    skinLeather: 176.0,
    down: 25.44,
  },
};

const laundryEmissionFactors = {
  detergent: {
    powder: 0.084,
    liquid: 0.087,
    capsule: 0.11,
    tablet: 0.17,
  },
  temperature: {
    'Less than 30': 0.16,
    '40': 0.31,
    '50': 0.36,
    'More than 60': 0.51,
  },
  drying: {
    tumble: 1.8,
    air: 0,
  },
};


const waterSavings = {
  dresses: 1813,             // 1,813 litres of water saved by repairing dresses
  jacketsExcludingDenim: 1427,  // 1,427 litres of water saved by repairing jackets excluding denim
  denimJeansAndJackets: 5455,   // 5,455 litres of water saved by repairing denim jeans and jackets
  trousersExcludingDenim: 4073, // 4,073 litres of water saved by repairing trousers excluding denim
  tshirtsAndTops: 2333        // 2,333 litres of water saved by repairing t-shirts and tops
};

// Route to calculate CO2 footprint
app.post('/api/calculate-footprint', (req, res) => {
  try {
    const {
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
      washTemps,
      detergentType,
      tumbleDryLoads,

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
      clothingLongevity,
      ethicalCertifications, brandResearch, ethicalPlatforms
    } = req.body;

    // T-Shirt Emissions Calculation
    const totalTshirtEmissions = {
      recycledCotton: (tshirtsRecycledCotton || 0) * emissionFactors.tshirts.recycledCotton,
      cotton: (tshirtsCotton || 0) * emissionFactors.tshirts.cotton,
      viscose: (tshirtsViscose || 0) * emissionFactors.tshirts.viscose,
      recycledViscose: (tshirtsRecycledViscose || 0) * emissionFactors.tshirts.recycledViscose,
      polyester: (tshirtsPolyester || 0) * emissionFactors.tshirts.polyester,
      recycledPolyester: (tshirtsRecycledPolyester || 0) * emissionFactors.tshirts.recycledPolyester,
      organicCotton: (tshirtsOrganicCotton || 0) * emissionFactors.tshirts.organicCotton,
    };

    // Log T-shirt emissions
    console.log('T-shirt Emissions:', totalTshirtEmissions);

    // Dress Emissions Calculation
    const totalDressEmissions = {
      cotton: (dressesCotton || 0) * emissionFactors.dresses.cotton,
      recycledCotton: (dressesRecycledCotton || 0) * emissionFactors.dresses.recycledCotton,
      polyester: (dressesPolyester || 0) * emissionFactors.dresses.polyester,
      recycledPolyester: (dressesRecycledPolyester || 0) * emissionFactors.dresses.recycledPolyester,
      viscose: (dressesViscose || 0) * emissionFactors.dresses.viscose,
      recycledViscose: (dressesRecycledViscose || 0) * emissionFactors.dresses.recycledViscose,
    };

    // Log Dress emissions
    console.log('Dress Emissions:', totalDressEmissions);

    // Jeans Emissions Calculation
    const totalJeansEmissions = {
      denim: (trousersDenim || 0) * emissionFactors.jeans.denim,
      cotton: (trousersCottonJeans || 0) * emissionFactors.jeans.cotton,
      polyester: (trousersPolyester || 0) * emissionFactors.jeans.polyester,
    };

    // Log Jeans emissions
    console.log('Jeans Emissions:', totalJeansEmissions);

    // Jacket Emissions Calculation
    const totalJacketEmissions = {
      synthetic: (jacketsSynthetic || 0) * emissionFactors.jackets.synthetic,
      skinLeather: (jacketsSkinLeather || 0) * emissionFactors.jackets.skinLeather,
      down: (jacketsDown || 0) * emissionFactors.jackets.down,

    };
      // Log Jacket emissions
      console.log('Jacket Emissions:', totalJacketEmissions);

    const totalEmissions = Object.values(totalTshirtEmissions).reduce((sum, value) => sum + value, 0) +
    Object.values(totalDressEmissions).reduce((sum, value) => sum + value, 0) +
    Object.values(totalJeansEmissions).reduce((sum, value) => sum + value, 0) +
    Object.values(totalJacketEmissions).reduce((sum, value) => sum + value, 0);

    // Log Total Emissions
    console.log('Total Emissions:', totalEmissions);

  
    const averageCO2 = 270; // Average emissions per person (kg CO2)
    const fashionPercentDifference = ((totalEmissions - averageCO2) / averageCO2) * 100;
    
    let fashionImpactLevel = '';
    let fashionPerformanceMessage = '';
    
    if (fashionPercentDifference < -15) {
      fashionImpactLevel = 'Very Low Impact';
      fashionPerformanceMessage = `You're emitting ${Math.abs(fashionPercentDifference.toFixed(1))}% less CO₂ than average! 🌱 Amazing!`;
  } else if (fashionPercentDifference >= -15 && fashionPercentDifference < 0) {
      fashionImpactLevel = 'Low Impact';
      fashionPerformanceMessage = `You're emitting ${Math.abs(fashionPercentDifference.toFixed(1))}% less CO₂ than average. 🌿`;
  } else if (fashionPercentDifference === 0) {
      fashionImpactLevel = 'Average';
      fashionPerformanceMessage = `You're exactly at the average! 🔄`;
  } else if (fashionPercentDifference > 0 && fashionPercentDifference <= 15) {
      fashionImpactLevel = 'High Impact';
      fashionPerformanceMessage = `You're emitting ${fashionPercentDifference.toFixed(1)}% more CO₂ than average. 🌎`;
  } else if (fashionPercentDifference > 15) {
      fashionImpactLevel = 'Very High Impact';
      fashionPerformanceMessage = `You're emitting ${fashionPercentDifference.toFixed(1)}% more CO₂ than average. 🔥 Big opportunity to improve!`;
  }
  
    
    console.log('Fashion Impact Level:', fashionImpactLevel);
    console.log(fashionPerformanceMessage);
    

    // Laundry Emissions Calculation
    const detergentCO2 = laundryEmissionFactors.detergent[detergentType?.toLowerCase()] || 0;
    const temperatureCO2 = laundryEmissionFactors.temperature[washTemps] || 0;
    const dryingCO2 = tumbleDryLoads * laundryEmissionFactors.drying.tumble;
    const washingCO2 = (detergentCO2 + temperatureCO2) * monthlyLoads;
    const totalLaundryCO2 = washingCO2 + dryingCO2;


    const averageLaundryCO2 = 20; // Average emissions per person for laundry (kg CO₂)

    // Calculate percent difference
const percentDifference = ((totalLaundryCO2 - averageLaundryCO2) / averageLaundryCO2) * 100;

// Determine impact level and performance message

let performanceMessage = '';
let impactLevel = '';
    


if (percentDifference < -15) {
  impactLevel = 'Very Low Impact';
  performanceMessage = `Your laundry emissions are ${Math.abs(percentDifference.toFixed(1))}% below average. Amazing work! 🌱`;
} else if (percentDifference >= -15 && percentDifference < 0) {
  impactLevel = 'Low Impact';
  performanceMessage = `Your laundry emissions are ${Math.abs(percentDifference.toFixed(1))}% below average. Great job! 🌿`;
} else if (percentDifference === 0) {
  impactLevel = 'Average';
  performanceMessage = `Your laundry emissions are exactly average. Good job keeping it balanced! 🔄`;
} else if (percentDifference > 0 && percentDifference <= 15) {
  impactLevel = 'High Impact';
  performanceMessage = `Your laundry emissions are ${percentDifference.toFixed(1)}% above average. Try small improvements! 🌎`;
} else if (percentDifference > 15) {
  impactLevel = 'Very High Impact';
  performanceMessage = `Your laundry emissions are ${percentDifference.toFixed(1)}% above average. Big opportunity to reduce it! 🔥`;
}


// Final Output
console.log('Impact Level:', impactLevel);
console.log(performanceMessage);

    

    // Log Laundry emissions
    console.log('Laundry Emissions:', totalLaundryCO2);

    let totalWaterSaved = 0;
      // Add water savings based on the number of items repaired
      totalWaterSaved += (dresses || 0) * waterSavings.dresses;
      totalWaterSaved += (jackets|| 0) * waterSavings.jacketsExcludingDenim;
      totalWaterSaved += (denimJeans || 0) * waterSavings.denimJeansAndJackets;
      totalWaterSaved += (trousers|| 0) * waterSavings.trousersExcludingDenim;
      totalWaterSaved += (tShirts || 0) * waterSavings.tshirtsAndTops;

        // Breakdown of water savings by category
        const waterBreakdown = {
          dresses: (dresses || 0) * waterSavings.dresses,
          jackets: (jackets || 0) * waterSavings.jacketsExcludingDenim,
          denimJeansAndJackets: (denimJeans || 0) * waterSavings.denimJeansAndJackets,
          trousers: (trousers || 0) * waterSavings.trousersExcludingDenim,
          tshirtsAndTops: (tShirts || 0) * waterSavings.tshirtsAndTops,
        };
    
        // Log water breakdown
        console.log('Water Breakdown:', waterBreakdown);
        console.log('Total Water Saved:', totalWaterSaved);
    
    const wasteDivertedPerItem = {
          secondHandTShirts: 0.1,    // Weight diverted per second-hand T-shirt
          secondHandKnitwear: 0.3,   // Weight diverted per second-hand Knitwear
          secondHandDresses: 0.2,    // Weight diverted per second-hand Dresses
          secondHandJeans: 0.4,      // Weight diverted per second-hand Jeans
          secondHandTrousers: 0.3,   // Weight diverted per second-hand Trousers
          secondHandShoes: 0.6,      // Weight diverted per second-hand Shoes
          secondHandCoats: 0.9       // Weight diverted per second-hand Coats
        };
    
        // Calculate total waste diverted for each item
     const totalWasteDiverted = {
          secondHandTShirts: (secondHandTShirts || 0) * wasteDivertedPerItem.secondHandTShirts,
          secondHandKnitwear: (secondHandKnitwear || 0) * wasteDivertedPerItem.secondHandKnitwear,
          secondHandDresses: (secondHandDresses || 0) * wasteDivertedPerItem.secondHandDresses,
          secondHandJeans: (secondHandJeans || 0) * wasteDivertedPerItem.secondHandJeans,
          secondHandTrousers: (secondHandTrousers || 0) * wasteDivertedPerItem.secondHandTrousers,
          secondHandShoes: (secondHandShoes || 0) * wasteDivertedPerItem.secondHandShoes,
          secondHandCoats: (secondHandCoats || 0) * wasteDivertedPerItem.secondHandCoats
        };
    
        // Log waste diverted for each item
        console.log('Waste Diverted:', totalWasteDiverted);   
        

    

    // Category totals
    const tshirtFootprint = Object.values(totalTshirtEmissions).reduce((acc, v) => acc + v, 0);
    const dressFootprint = Object.values(totalDressEmissions).reduce((acc, v) => acc + v, 0);
    const jeansFootprint = Object.values(totalJeansEmissions).reduce((acc, v) => acc + v, 0);
    const jacketFootprint = Object.values(totalJacketEmissions).reduce((acc, v) => acc + v, 0);
    const totalWasteDivertedKg = Object.values(totalWasteDiverted).reduce((acc, val) => acc + val, 0);
    

    console.log('Total Waste Diverted (kg):', totalWasteDivertedKg);


    // TOTAL EMISSIONS
    const totalFootprint = tshirtFootprint + dressFootprint + jeansFootprint + jacketFootprint + totalLaundryCO2;

    // Log category breakdown
    console.log('Category Breakdown:', {
      tshirts: tshirtFootprint,
      dresses: dressFootprint,
      jeans: jeansFootprint,
      jackets: jacketFootprint,
      laundry: totalLaundryCO2,
    });

    // Breakdown for each section (without percentages)
    const categoryBreakdown = {
      tshirts: tshirtFootprint,
      dresses: dressFootprint,
      jeans: jeansFootprint,
      jackets: jacketFootprint,
      laundry: totalLaundryCO2,
    };

    // Laundry sub-breakdown (detergent, temperature, drying)
    const laundryBreakdown = {
      detergent: {
        value: (detergentCO2 * monthlyLoads),
        percentage: (((detergentCO2 * monthlyLoads) / totalLaundryCO2) * 100).toFixed(2),
      },
      temperature: {
        value: (temperatureCO2 * monthlyLoads),
        percentage: (((temperatureCO2 * monthlyLoads) / totalLaundryCO2) * 100).toFixed(2),
      },
      drying: {
        value: dryingCO2,
        percentage: ((dryingCO2 / totalLaundryCO2) * 100).toFixed(2),
      },
    };

    // Log laundry breakdown
    console.log('Laundry Breakdown:', laundryBreakdown);

   // 1. Calculate total repairs
const totalItemsRepaired = tShirts + trousers + jackets + denimJeans + dresses;
console.log('Total Items Repaired:', totalItemsRepaired);

// 2. Set Repair Impact
let repairImpact = '';
if (totalItemsRepaired >= 11) {
    repairImpact = 'Very Low Impact';
} else if (totalItemsRepaired >= 8) {
    repairImpact = 'Low Impact';
} else if (totalItemsRepaired >= 5) {
    repairImpact = 'Average';
} else if (totalItemsRepaired >= 2) {
    repairImpact = 'High Impact';
} else {
    repairImpact = 'Very High Impact';
}

// 3. Set Longevity Impact
let longevityImpact = '';
if (clothingLongevity === '7+ years') {
    longevityImpact = 'Very Low Impact';
} else if (clothingLongevity === '4-6 years') {
    longevityImpact = 'Low Impact';
} else if (clothingLongevity === '1-3 years') {
    longevityImpact = 'High Impact';
} else if (clothingLongevity === 'Less than 1 year') {
    longevityImpact = 'Very High Impact';
}

// 4. Impact Score Mapping
const impactScoreMap = {
  'Very Low Impact': 1,
  'Low Impact': 2,
  'Average': 3,
  'High Impact': 4,
  'Very High Impact': 5
};

// Calculate average score from both repair and longevity impacts
const avgScore = (impactScoreMap[repairImpact] + impactScoreMap[longevityImpact]) / 2;

let finalImpact = '';

// Determine the final impact based on the average score
if (avgScore <= 1.5) {
    finalImpact = 'Very Low Impact';
} else if (avgScore <= 2.5) {
    finalImpact = 'Low Impact';
} else if (avgScore <= 3.5) {
    finalImpact = 'Average';
} else if (avgScore <= 4.5) {
    finalImpact = 'High Impact';
} else {
    finalImpact = 'Very High Impact';
}

// Output the final impact and individual impacts
console.log('Repair Impact:', repairImpact);
console.log('Longevity Impact:', longevityImpact);
console.log('Final Impact Score:', finalImpact);

// Mapping arrays
const ethicalCertificationsOptions = [
  "Not important at all",
  "Somewhat important",
  "Important",
  "Very important"
];

const brandResearchOptions = [
  "Never",
  "Rarely",
  "Sometimes",
  "Often",
  "Always"
];

const ethicalPlatformsOptions = [
  "Never",
  "Occasionally",
  "Frequently",
  "Always"
];

// Map user answers (indexes) to text
const ethicalCertificationsAnswer = ethicalCertificationsOptions[ethicalCertifications];
const brandResearchAnswer = brandResearchOptions[brandResearch];
const ethicalPlatformsAnswer = ethicalPlatformsOptions[ethicalPlatforms];

// 1. Ethical Certifications Importance Impact
let importanceImpact = '';
if (ethicalCertificationsAnswer === 'Very important') {
  importanceImpact = 'Very Low Impact';
} else if (ethicalCertificationsAnswer === 'Important') {
  importanceImpact = 'Low Impact';
} else if (ethicalCertificationsAnswer === 'Somewhat important') {
  importanceImpact = 'Average';
} else {
  importanceImpact = 'High Impact';
}

// 2. Brand Research Effort Impact
let researchImpact = '';
if (brandResearchAnswer === 'Always') {
  researchImpact = 'Very Low Impact';
} else if (brandResearchAnswer === 'Often') {
  researchImpact = 'Low Impact';
} else if (brandResearchAnswer === 'Sometimes') {
  researchImpact = 'Average';
} else if (brandResearchAnswer === 'Rarely') {
  researchImpact = 'High Impact';
} else {
  researchImpact = 'Very High Impact';
}

// 3. Ethical Platforms Usage Impact
let platformsImpact = '';
if (ethicalPlatformsAnswer === 'Always') {
  platformsImpact = 'Very Low Impact';
} else if (ethicalPlatformsAnswer === 'Frequently') {
  platformsImpact = 'Low Impact';
} else if (ethicalPlatformsAnswer === 'Occasionally') {
  platformsImpact = 'Average';
} else {
  platformsImpact = 'Very High Impact';
}

// 4. Final Overall Ethical & Social Responsibility Impact
let finalEthicalImpact = '';
const impacts = [importanceImpact, researchImpact, platformsImpact];

if (impacts.every(i => i === 'Very Low Impact')) {
  finalEthicalImpact = 'Very Low Impact';
} else if (impacts.includes('Low Impact') && !impacts.includes('Average') && !impacts.includes('High Impact') && !impacts.includes('Very High Impact')) {
  finalEthicalImpact = 'Low Impact';
} else if (impacts.includes('Average') && !impacts.includes('High Impact') && !impacts.includes('Very High Impact')) {
  finalEthicalImpact = 'Average';
} else if (impacts.includes('High Impact') && !impacts.includes('Very High Impact')) {
  finalEthicalImpact = 'High Impact';
} else {
  finalEthicalImpact = 'Very High Impact';
}

console.log('Ethical Certifications Impact:', importanceImpact);
console.log('Brand Research Impact:', researchImpact);
console.log('Ethical Platforms Impact:', platformsImpact);
console.log('Final Ethical Responsibility Impact:', finalEthicalImpact);




    // Send response
    res.json({
      totalFootprint: totalFootprint.toFixed(2),
      sectionTotals: categoryBreakdown,
      categoryBreakdown,
      totalWaterSaved: totalWaterSaved.toFixed(2),  // Add the total water saved
      totalWasteDivertedKg: totalWasteDivertedKg.toFixed(2),
      repairImpact,
      longevityImpact,
      finalImpact,
      finalEthicalImpact,
      fashionImpactLevel,
      waterBreakdown,
      itemBreakdown: {
        tshirts: totalTshirtEmissions,
        dresses: totalDressEmissions,
        jeans: totalJeansEmissions,
        jackets: totalJacketEmissions,
        laundry: {
          totalLaundryCO2,
          breakdown: laundryBreakdown,
          detergentType,
          washTemps,
          monthlyLoads,
          tumbleDryLoads,
        }
      },
    });

  } catch (error) {
    console.error('Error calculating footprint:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = app;