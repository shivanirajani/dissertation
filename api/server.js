const express = require('express');
const cors = require('cors');

const app = express();

const port = 3001;
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
    synthetic: 25.4,
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

const wasteDivertedPerItem = {
  secondHandTShirts: 0.1,    // Weight diverted per second-hand T-shirt
  secondHandKnitwear: 0.3,   // Weight diverted per second-hand Knitwear
  secondHandDresses: 0.2,    // Weight diverted per second-hand Dresses
  secondHandJeans: 0.4,      // Weight diverted per second-hand Jeans
  secondHandTrousers: 0.3,   // Weight diverted per second-hand Trousers
  secondHandShoes: 0.6,      // Weight diverted per second-hand Shoes
  secondHandCoats: 0.9       // Weight diverted per second-hand Coats
};



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

// Dress Emissions Calculation
const totalDressEmissions = {
  cotton: (dressesCotton || 0) * emissionFactors.dresses.cotton,
  recycledCotton: (dressesRecycledCotton || 0) * emissionFactors.dresses.recycledCotton,
  polyester: (dressesPolyester || 0) * emissionFactors.dresses.polyester,
  recycledPolyester: (dressesRecycledPolyester || 0) * emissionFactors.dresses.recycledPolyester,
  viscose: (dressesViscose || 0) * emissionFactors.dresses.viscose,
  recycledViscose: (dressesRecycledViscose || 0) * emissionFactors.dresses.recycledViscose,
};

// Jeans Emissions Calculation
const totalJeansEmissions = {
  denim: (trousersDenim || 0) * emissionFactors.jeans.denim,
  cotton: (trousersCottonJeans || 0) * emissionFactors.jeans.cotton,
  polyester: (trousersPolyester || 0) * emissionFactors.jeans.polyester,
};

// Jacket Emissions Calculation
const totalJacketEmissions = {
  synthetic: (jacketsSynthetic || 0) * emissionFactors.jackets.synthetic,
  skinLeather: (jacketsSkinLeather || 0) * emissionFactors.jackets.skinLeather,
  down: (jacketsDown || 0) * emissionFactors.jackets.down,
};

// Log Total Emissions for each section
console.log('T-shirt Emissions:', totalTshirtEmissions);
console.log('Dress Emissions:', totalDressEmissions);
console.log('Jeans Emissions:', totalJeansEmissions);
console.log('Jacket Emissions:', totalJacketEmissions);

// Total Emissions Calculation
const totalEmissions = Object.values(totalTshirtEmissions).reduce((sum, value) => sum + value, 0) +
  Object.values(totalDressEmissions).reduce((sum, value) => sum + value, 0) +
  Object.values(totalJeansEmissions).reduce((sum, value) => sum + value, 0) +
  Object.values(totalJacketEmissions).reduce((sum, value) => sum + value, 0);

console.log('Total Emissions:', totalEmissions);

// Decent CO2 (per person) to calculate the difference
const averageCO2 = 270; // Decent emissions per person (kg CO2)
const fashionPercentDifference = ((totalEmissions - averageCO2) / averageCO2) * 100;

const carKmEquivalence = 0.2545;  // Decent emissions per km for a car (kg CO2/km)


let fashionImpactLevel = '';
let fashionPerformanceMessage = '';
let comparisonMessage = ''; // Additional message to show how the user's impact compares to average

// Fashion Impact Levels and Recommendations


if (fashionPercentDifference < -15) {
  fashionImpactLevel = 'Outstanding';
  fashionPerformanceMessage = `
    CO2e Breakdown:
    Over the last year, your purchases alone have produced an estimated ${totalEmissions.toFixed(2)} kg CO2e, 
    enough to drive ${Math.round(totalEmissions / carKmEquivalence)} kilometers in the average car.

    You're doing an excellent job! Your choices have led to a much lower footprint than the average, and you are already making a significant impact by choosing sustainable fabrics.

    - Continue choosing sustainable, sustainable fabrics that have low environmental impacts.
    - If possible, try to focus on purchasing fewer items and choose pieces that can be used in a variety of contexts (e.g., versatile clothing that can be styled differently).
    - Look for even more sustainable options and be open to exploring newer sustainable materials in the market such as recycled cotton, organic cotton.
  `;
  comparisonMessage = `Your emissions are ${Math.abs(fashionPercentDifference).toFixed(2)}% below the average. You're doing great! Keep it up.`;
} else if (fashionPercentDifference >= -15 && fashionPercentDifference < 0) {
  fashionImpactLevel = 'Great';
  fashionPerformanceMessage = `
    CO2e Breakdown:
    Over the last year, your purchases alone have produced an estimated ${totalEmissions.toFixed(2)} kg CO2e, 
    enough to drive ${Math.round(totalEmissions / carKmEquivalence)} kilometers in the average car.


    You're doing a great job! You're already ahead of the average, but there's still room to further reduce your footprint.

    - If you haven't already, try to move away from synthetic fibers like polyester and opt for natural fibers, which are less resource-intensive.
    - Be mindful of overconsumption by purchasing fewer, high-quality items that you can wear in multiple ways.
    - Opt for more sustainable options in your wardrobe by looking for items made from recycled or organic materials.
  `;
  comparisonMessage = `Your emissions are ${Math.abs(fashionPercentDifference).toFixed(2)}% below the average. You're doing well, but there are still small improvements to make!`;
} else if (fashionPercentDifference === 0) {
  fashionImpactLevel = 'Decent';
  fashionPerformanceMessage = `
    CO2e Breakdown:
    Over the last year, your purchases alone have produced an estimated ${totalEmissions.toFixed(2)} kg CO2e, 
    enough to drive ${Math.round(totalEmissions / carKmEquivalence)} kilometers in the average car.

    You're at the average level. There's room for improvement, particularly in reducing synthetic materials and increasing the sustainability of your purchases.

    - Gradually replace synthetic fibers with natural ones, which have a lower environmental footprint.
    - Be more selective with your purchases. Consider whether each new piece of clothing is truly necessary. Fewer, better-made items will help you reduce your overall consumption and impact.
    - Focus on long-term investment pieces that are durable and versatile, helping to reduce the need for frequent replacements.
  `;
  comparisonMessage = `Your emissions are exactly at the average level. You’re doing fine, but with small changes, you can reduce your impact further.`;
} else if (fashionPercentDifference > 0 && fashionPercentDifference <= 15) {
  fashionImpactLevel = 'Lacking ';
  fashionPerformanceMessage = `
    CO2e Breakdown:
    Over the last year, your purchases alone have produced an estimated ${totalEmissions.toFixed(2)} kg CO2e, 
    enough to drive ${Math.round(totalEmissions / carKmEquivalence)} kilometers in the average car.


    Your emissions are higher than average. There are a few simple changes you can make to reduce your footprint.

    - Move away from synthetics and instead choose natural fibers or sustainable fabrics for your purchases.
    - Be more intentional with your purchases. Focus on fewer, well-made pieces that are versatile and durable. Reducing the quantity of your purchases can have a big impact on your overall emissions.
    - Invest in higher-quality, long-lasting items that will reduce the need for frequent replacements.
  `;
  comparisonMessage = `Your emissions are ${fashionPercentDifference.toFixed(2)}% above the average. A few simple changes can help lower your footprint.`;
} else if (fashionPercentDifference > 15) {
  fashionImpactLevel = 'Poor';
  fashionPerformanceMessage = `
    CO2e Breakdown:
    Over the last year, your purchases alone have produced an estimated ${totalEmissions.toFixed(2)} kg CO2e, 
    enough to drive ${Math.round(totalEmissions / carKmEquivalence)} kilometers in the average car.

    Your impact is above average. There are significant opportunities to reduce your footprint by being more mindful of your material choices and consumption.


    - Switch to more sustainable materials, avoiding synthetics like polyester and focusing on fabrics with lower environmental impacts.
    - Reduce your clothing consumption. Instead of regularly buying new items, try to purchase fewer, higher-quality pieces.
    - Be selective and intentional about your purchases. Aim for versatility and durability over fast-fashion trends.
  `;
  comparisonMessage = `Your emissions are ${fashionPercentDifference.toFixed(2)}% above the average. By switching to sustainable fabrics and reducing your consumption, you can significantly reduce your impact.`;
}

console.log('Fashion Impact Level:', fashionImpactLevel);
console.log(fashionPerformanceMessage);
console.log(comparisonMessage);



const detergentCO2 = laundryEmissionFactors.detergent[detergentType?.toLowerCase()] || 0;
const temperatureCO2 = laundryEmissionFactors.temperature[washTemps] || 0;
const dryingCO2 = tumbleDryLoads * laundryEmissionFactors.drying.tumble;
const washingCO2 = (detergentCO2 + temperatureCO2) * monthlyLoads;
const totalLaundryCO2 = washingCO2 + dryingCO2;

// Calculate percent difference for performance message$
const averageLaundryCO2 = 19.2;
const percentDifference = ((totalLaundryCO2 - averageLaundryCO2) / averageLaundryCO2) * 100;

let impactLevel = '';
let performanceMessage = '';
let recommendations = '';

// Determine impact level and base message
if (percentDifference < -15) {
  impactLevel = 'Outstanding';
  performanceMessage = `Your laundry emissions are ${Math.abs(percentDifference).toFixed(1)}% below average. Amazing work! `;
} else if (percentDifference >= -15 && percentDifference < 0) {
  impactLevel = 'Great';
  performanceMessage = `Your laundry emissions are ${Math.abs(percentDifference).toFixed(1)}% below average. Great job! 🌿`;
} else if (percentDifference === 0) {
  impactLevel = 'Decent';
  performanceMessage = `Your laundry emissions are exactly average. Good job keeping it balanced! `;
} else if (percentDifference > 0 && percentDifference <= 15) {
  impactLevel = 'Lacking ';
  performanceMessage = `Your laundry emissions are ${percentDifference.toFixed(1)}% above average. Try small improvements! `;
} else if (percentDifference > 15) {
  impactLevel = 'Poor';
  performanceMessage = `Your laundry emissions are ${percentDifference.toFixed(1)}% above average. Big opportunity to reduce it! `;
}

// Always compute temperature-related recommendations
if (washTemps === 'More than 60') {
  const co2Diff = (monthlyLoads * (laundryEmissionFactors.temperature['More than 60'] - laundryEmissionFactors.temperature['50'])).toFixed(2);
  recommendations += `\n- Try lowering the wash temperature from above 60°C to 50°C or 40°C. This could save about ${co2Diff} kg of CO₂ monthly.`;
} else if (washTemps === '50') {
  const co2Diff = (monthlyLoads * (laundryEmissionFactors.temperature['50'] - laundryEmissionFactors.temperature['40'])).toFixed(2);
  recommendations += `\n- Lowering your wash temperature from 50°C to 40°C could save about ${co2Diff} kg of CO₂ monthly.`;
} else if (washTemps === '40') {
  const co2Diff = (monthlyLoads * (laundryEmissionFactors.temperature['40'] - laundryEmissionFactors.temperature['Less than 30'])).toFixed(2);
  recommendations += `\n- Reducing wash temperature to under 30°C could save around ${co2Diff} kg of CO₂ monthly.`;
}

// Always compute detergent-related recommendations
const detergentLowerCO2 = Math.min(
  laundryEmissionFactors.detergent['powder'],
  laundryEmissionFactors.detergent['liquid']
);
const currentDetergentCO2 = laundryEmissionFactors.detergent[detergentType?.toLowerCase()];
const detergentCO2Diff = (monthlyLoads * (currentDetergentCO2 - detergentLowerCO2)).toFixed(2);

if (
  ['tablet', 'capsule'].includes(detergentType?.toLowerCase()) &&
  currentDetergentCO2 > detergentLowerCO2
) {
  recommendations += `\n- Consider switching from ${detergentType} detergent to powder or liquid. This change could save around ${detergentCO2Diff} kg of CO₂ per month.`;
} else if (detergentType?.toLowerCase() === 'powder') {
  recommendations += `\n- You're using powder detergent, a great low-emission choice! For even better efficiency, you might also consider liquid detergent.`;
} else if (detergentType?.toLowerCase() === 'liquid') {
  recommendations += `\n- Great job using liquid detergent—it’s one of the most carbon-efficient options!`;
}


// Combine everything in performanceMessage
performanceMessage += `\nTotal monthly CO₂ emissions for ${monthlyLoads} load(s): ${totalLaundryCO2.toFixed(2)} kg.\n${recommendations.trim()}`;

// Output
console.log(`Impact Level: ${impactLevel}`);
console.log(performanceMessage);




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
        let message = '';


let actionSteps = [];

// Total water consumption before extending the lifespan of clothes
let totalWaterConsumption = totalWaterSaved;
console.log("Total Water Consumption Before Lifespan Extension:", totalWaterConsumption);

// Calculate the water savings achieved by extending the lifespan by 9 months (33% extra water savings)
const waterSavedByLifespanExtension = totalWaterConsumption * 0.33;
console.log("Water Saved by Extending Lifespan by 9 Months:", waterSavedByLifespanExtension);

// Now calculate the water consumption after lifespan extension (this is the remaining water after saving)
let waterConsumptionAfterLifespanExtension = totalWaterConsumption - waterSavedByLifespanExtension;
console.log("Water Consumption After Lifespan Extension:", waterConsumptionAfterLifespanExtension);

// Total items repaired
const totalItemsRepaired = tShirts + trousers + jackets + denimJeans + dresses;
console.log('Total Items Repaired:', totalItemsRepaired);

// Set Repair Impact
let repairImpact = '';
if (totalItemsRepaired >= 11) {
  repairImpact = 'Outstanding';
} else if (totalItemsRepaired >= 8) {
  repairImpact = 'Great';
} else if (totalItemsRepaired >= 5) {
  repairImpact = 'Decent';
} else if (totalItemsRepaired >= 2) {
  repairImpact = 'Lacking ';
} else {
  repairImpact = 'Poor';
}

// Set Longevity Impact
let longevityImpact = '';
if (clothingLongevity === '7+ years') {
  longevityImpact = 'Outstanding';
} else if (clothingLongevity === '4-6 years') {
  longevityImpact = 'Great';
} else if (clothingLongevity === '1-3 years') {
  longevityImpact = 'Lacking ';
} else if (clothingLongevity === 'Less than 1 year') {
  longevityImpact = 'Poor';
}

// Impact Score Mapping
const impactScoreMap = {
  'Outstanding': 1,
  'Great': 2,
  'Decent': 3,
  'Lacking ': 4,
  'Poor': 5
};

// Calculate average score from both repair and longevity impacts
const avgScore = (impactScoreMap[repairImpact] + impactScoreMap[longevityImpact]) / 2;

let finalImpact = '';

// Determine the final impact based on the average score
if (avgScore <= 1.5) {
  finalImpact = 'Outstanding';
} else if (avgScore <= 2.5) {
  finalImpact = 'Great';
} else if (avgScore <= 3.5) {
  finalImpact = 'Decent';
} else if (avgScore <= 4.5) {
  finalImpact = 'Lacking ';
} else {
  finalImpact = 'Poor';
}

switch (finalImpact) {
  case 'Outstanding':
    message = 
      `You're currently saving around<strong>${totalWaterSaved.toFixed(2)}</strong>litres of water through your clothing repairs—an outstanding achievement.\n\n` +
      `By keeping garments in use longer, you're helping reduce the demand for new clothing production, which is heavily water-intensive.\n` +
      `Even small habit changes in how you care for your clothes can significantly extend their lifespan and deepen your impact.\n`;

    actionSteps = [
      `You've already made a big difference—here are a few simple habits to strengthen that impact even more:\n`,
      `• Try to wear garments at least 10–30 times before washing. Washing less often preserves fabric structure and colour.\n`,
      `• Opt for air drying instead of tumble drying—heat can break down fibres over time.\n`,
      `• Store clothes in dry, shaded areas, and fold heavy items to prevent stretching.\n`,
      `• Repair minor wear early, like loose seams or tiny holes, before they grow.\n`
    ];
    break;

  case 'Great':
    message = 
      `You're saving<strong>${totalWaterSaved.toFixed(2)}</strong> litres of water through your repairs—fantastic work!\n\n` +
      `Your efforts are helping to reduce the environmental impact of fashion production. With a few adjustments, you can increase this impact even more.\n` +
      `Small habit changes, like wearing clothes more times before washing, can add years to their lifespan and lower your environmental footprint.\n`;

    actionSteps = [
      `You're on the right track—keep it up! Here’s how to elevate your impact further:\n`,
      `• Aim to wash garments only after 10–15 wears to preserve fabric integrity.\n`,
      `• When possible, air dry instead of using high-heat dryers, which can weaken the fibres.\n`,
      `• Store your clothes in a dry, well-ventilated place to prevent mould and fabric degradation.\n`,
      `• Use simple repairs like replacing buttons or fixing hems to prevent garments from needing to be replaced early.\n`
    ];
    break;

  case 'Decent':
    message = 
      `You're currently saving <strong>${totalWaterSaved.toFixed(2)}</strong> litres of water through your repairs—a solid start!\n\n` +
      `Though your impact is good, there’s still plenty of opportunity to maximise the life of your clothes.\n` +
      `Small changes in how you care for your garments can increase their lifespan and help reduce your environmental footprint even more.\n`;

    actionSteps = [
      `You're heading in the right direction—here’s what you can do to have an even bigger impact:\n`,
      `• Try wearing items 5–10 times before washing. It helps preserve the fabric and can extend the garment's life.\n`,
      `• Air-dry garments instead of tumble drying. This reduces wear from heat exposure and conserves energy.\n`,
      `• Keep your clothes stored in cool, dry places to avoid premature ageing.\n`,
      `• Repair small damages, like loose seams or buttons, early to keep clothes in circulation longer.\n`
    ];
    break;

  case 'Lacking':
    message = 
      `You're saving <strong>${totalWaterSaved.toFixed(2)}</strong>litres of water through your clothing repairs, but there’s a lot more potential to unlock.\n\n` +
      `Repairing clothes is a great start, but there’s an opportunity to increase the impact further with small habit changes in your clothing care routine.\n`;

    actionSteps = [
      `You're making progress—here’s how to extend the lifespan of your clothes even more:\n`,
      `• Aim to wear garments a bit more before washing—try 5–10 wears before a wash. This can significantly reduce wear and tear.\n`,
      `• Avoid using the dryer too often; instead, air dry your clothes to preserve fabric strength.\n`,
      `• Store your garments properly, away from direct sunlight or damp conditions that can cause fibres to break down.\n`,
      `• Fix small damages as soon as you notice them to prevent them from getting worse. A quick stitch can save the garment from being discarded.\n`
    ];
    break;

  case 'Poor':
    message =
      `At the moment, based on your repairs, you are saving <strong>${totalWaterSaved.toFixed(2)}</strong> liters of water.\n` +
      `\n` +
      `It looks like your current impact is not enough, but there's a lot of room to improve.\n` +
      `Repairing more clothes can significantly reduce your water footprint and support global water conservation.\n`;

    actionSteps = [
      `Try repairing more garments to boost your impact.\n`,
      `By extending the lifespan of your clothes for 9 months, you're saving <strong>${waterSavedByLifespanExtension.toFixed(2)}</strong> liters of water.\n`,
      `Steps to conserve more water:\n`,
      `1. Limit washing and use cold water cycles.\n`,
      `2. Fix small damage early to prevent replacements.\n`,
      `3. Store clothes properly and avoid dryers when possible.\n`,
      `4. Maintain and clean garments promptly.\n`,
      `5. Minimize dry cleaning or use sustainable providers.\n`
    ];
    break;

  default:
    message =
      `At the moment, based on your repairs, you are saving <strong>${totalWaterSaved.toFixed(2)}</strong> liters of water.\n` +
      `\n` +
      `Every step you take matters.\n` +
      `More repairs and maintenance can significantly increase your water savings and environmental impact.\n`;

    actionSteps = [
      `Repair more clothes to reduce new garment demand.\n`,
      `Extending the lifespan by 9 months saves an extra ${waterSavedByLifespanExtension.toFixed(2)} liters.\n`,
      `Extending lifespan of clothing items tips:\n`,
      `1. Wash less frequently, using cold water.\n`,
      `2. Fix tears, rips, and missing buttons promptly.\n`,
      `3. Store your clothes carefully to avoid damage.\n`,
      `4. Maintain items like wool by de-pilling regularly.\n`,
      `5. Avoid unnecessary dry cleaning or choose sustainable services.\n`
    ];
    break;
}


// Example output to console
console.log(message + '\n' + actionSteps.join('\n'));


// Output the personalized message and action steps
console.log("\n👤 Personalized Message:");
console.log(message);

console.log("\n💧 Here are your personalized action steps based on your water-saving efforts:");
actionSteps.forEach((step, index) => {
  console.log(`${index + 1}. ${step}`);
});
        

    
// --- Constants ---
const averageLandfillKgUK = 1.7;  // UK average textile waste to landfill per person/year

// --- Step 1: Calculate total waste diverted per item ---
const totalWasteDiverted = {
  secondHandTShirts: (secondHandTShirts || 0) * wasteDivertedPerItem.secondHandTShirts,
  secondHandKnitwear: (secondHandKnitwear || 0) * wasteDivertedPerItem.secondHandKnitwear,
  secondHandDresses: (secondHandDresses || 0) * wasteDivertedPerItem.secondHandDresses,
  secondHandJeans: (secondHandJeans || 0) * wasteDivertedPerItem.secondHandJeans,
  secondHandTrousers: (secondHandTrousers || 0) * wasteDivertedPerItem.secondHandTrousers,
  secondHandShoes: (secondHandShoes || 0) * wasteDivertedPerItem.secondHandShoes,
  secondHandCoats: (secondHandCoats || 0) * wasteDivertedPerItem.secondHandCoats
};

console.log('Waste Diverted:', totalWasteDiverted);

// --- Step 2: Calculate total waste diverted in kg ---
const totalWasteDivertedInKg = Object.values(totalWasteDiverted).reduce((acc, curr) => acc + curr, 0);
console.log("Total Waste Diverted (kg):", totalWasteDivertedInKg);

function calculateImpactScoreBasedOnWaste(totalWasteDivertedInKg) {
  const percentageDifferenceFromAverage = ((totalWasteDivertedInKg - averageLandfillKgUK) / averageLandfillKgUK) * 100;

  let impactLevel;
  if (percentageDifferenceFromAverage >= 100) {
    impactLevel = 'Outstanding';
  } else if (percentageDifferenceFromAverage >= 50) {
    impactLevel = 'Great';
  } else if (percentageDifferenceFromAverage >= 0) {
    impactLevel = 'Decent';
  } else if (percentageDifferenceFromAverage >= -25) {
    impactLevel = 'Lacking';
  } else {
    impactLevel = 'Poor';
  }

  console.log(`% Difference from average UK landfill waste: ${percentageDifferenceFromAverage.toFixed(2)}%`);
  return impactLevel;
}


const userImpact = calculateImpactScoreBasedOnWaste(totalWasteDivertedInKg);
console.log("User Impact:", userImpact);

// --- Step 4: Map feedback and steps based on impact level ---
let feedback = '';
let steps = [];

switch (userImpact) {
  case 'Outstanding':
    feedback = 
      `Your commitment to second-hand fashion is exemplary and has a measurable positive impact on environmental sustainability.\n` +
      `By consistently purchasing second-hand garments, you are actively diverting textile waste from landfill and reducing demand for resource-intensive new clothing production.\n` +
      `Each pre-owned item prevents approximately 2,900 litres of water use and reduces carbon emissions by up to 73% compared to a new equivalent.\n` +
      `Furthermore, supporting charity shops and circular economy initiatives contributes to both environmental preservation and social welfare.\n` +
      `Your actions represent a high-impact model of sustainable consumer behaviour — commendable work.\n`;
    steps = [
      "1. Maintain your practice of regularly sourcing garments from second-hand or charity shops.\n",
      "2. Support organisations that reinvest profits into community and environmental programmes.\n",
      "3. Engage in awareness-raising about sustainable fashion and landfill reduction within your social networks.\n"
    ];
    break;

  case 'Great':
    feedback = 
      `You are making significant strides in reducing fashion-related environmental harm.\n` +
      `Your second-hand purchases contribute to decreased textile waste, lower water consumption, and reduced greenhouse gas emissions.\n` +
      `However, expanding your efforts could yield even greater environmental and social benefits.\n` +
      `Donating used garments and increasing the frequency of second-hand purchases can further mitigate the ecological footprint of clothing disposal.\n` +
      `Your choices already have a meaningful impact — building on them can amplify your contribution to sustainable development.\n`;
    steps = [
      "1. Increase the variety and volume of second-hand clothing purchases, especially for categories like footwear and outerwear.\n",
      "2. Regularly donate usable garments to reuse schemes or charity organisations.\n",
      "3. Encourage peer engagement in sustainable fashion behaviours to scale collective impact.\n"
    ];
    break;

  case 'Decent':
    feedback = 
      `You are making a positive contribution, but there remains considerable scope to reduce your impact on textile waste and landfill usage.\n` +
      `The fashion industry is a significant generator of solid waste, with millions of tonnes of textiles discarded globally each year.\n` +
      `Increasing your reliance on second-hand clothing and participating in clothing reuse systems can substantially reduce resource extraction, energy use, and the release of landfill-related pollutants such as methane.\n` +
      `With targeted adjustments to your shopping and disposal habits, you can greatly enhance both environmental and social outcomes.\n`;
    steps = [
      "1. Prioritise second-hand purchasing for a broader range of clothing items, including accessories and seasonal wear.\n",
      "2. Participate in or organise local clothes swaps to extend the lifecycle of textiles.\n",
      "3. Integrate routine clothing donation into your wardrobe management practices.\n"
    ];
    break;

  case 'Lacking':
    feedback = 
      `While you have taken some steps towards sustainable fashion, your current behaviours are insufficient to significantly divert textile waste from landfill.\n` +
      `Synthetic fibres in clothing can persist for decades, contributing to soil and water pollution and emitting methane during decomposition.\n` +
      `Increased engagement with the second-hand market and proactive donation practices are essential to minimising fashion’s environmental burden and supporting social enterprises that rely on reused goods.\n` +
      `With a shift in habits, your potential for meaningful impact remains high.\n`;
    steps = [
      "1. Increase the proportion of second-hand clothing in your wardrobe, especially for staple and high-turnover items.\n",
      "2. Divert garments from landfill through frequent donations or resale on peer-to-peer platforms.\n",
      "3. Raise awareness of the environmental consequences of textile waste among your peers and community.\n"
    ];
    break;

  case 'Poor':
    feedback = 
      `Your current fashion habits are contributing substantially to environmental degradation through landfill accumulation.\n` +
      `Textiles that end up in landfill produce methane a potent greenhouse gas and can leach harmful dyes and chemicals into surrounding ecosystems.\n` +
      `Transitioning to second-hand fashion reduces both the extraction of virgin resources and the downstream impacts of disposal.\n` +
      `Additionally, donating clothing to charity-based reuse systems supports circularity and has tangible community benefits.\n` +
      `Substantial behavioural change is necessary to align with sustainable fashion practices and reduce your ecological footprint.\n`;
    steps = [
      "1. Begin a consistent transition towards second-hand shopping for all clothing categories.\n",
      "2. Divert all usable clothing away from landfill by donating to registered charity shops or reuse organisations.\n",
      "3. Educate yourself and others on the lifecycle impacts of garments and advocate for waste-conscious fashion choices.\n"
    ];
    break;

  default:
    feedback = 
      `You are at the beginning of your second-hand fashion journey — an important first step in reducing textile waste.\n` +
      `The environmental implications of fashion consumption are profound, with landfill pressure and pollution among the key concerns.\n` +
      `Every second-hand item you purchase contributes to a more circular and less resource-intensive fashion system.\n` +
      `By also donating your used clothing, you support community-based reuse and reduce waste volume.\n` +
      `Now is the time to build sustainable habits that will have lasting environmental and social impact.\n`;
    steps = [
      "1. Start by purchasing second-hand clothing for essential items such as trousers, tops, and jumpers.\n",
      "2. Donate garments that are still wearable rather than disposing of them with general waste.\n",
      "3. Explore circular fashion models and avoid fast fashion purchases where possible.\n"
    ];
    break;
}

// --- Step 5: Display feedback and steps ---
console.log("\n👤 Personalized Feedback:");
console.log(feedback);

console.log("\n💡 Here are your personalized steps based on your waste-diverting efforts:");
steps.forEach((step, index) => {
  console.log(`${index + 1}. ${step}`);
});







    

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
  importanceImpact = 'Outstanding';
} else if (ethicalCertificationsAnswer === 'Important') {
  importanceImpact = 'Great';
} else if (ethicalCertificationsAnswer === 'Somewhat important') {
  importanceImpact = 'Decent';
} else {
  importanceImpact = 'Lacking ';
}

// 2. Brand Research Effort Impact
let researchImpact = '';
if (brandResearchAnswer === 'Always') {
  researchImpact = 'Outstanding';
} else if (brandResearchAnswer === 'Often') {
  researchImpact = 'Great';
} else if (brandResearchAnswer === 'Sometimes') {
  researchImpact = 'Decent';
} else if (brandResearchAnswer === 'Rarely') {
  researchImpact = 'Lacking ';
} else {
  researchImpact = 'Poor';
}

// 3. Ethical Platforms Usage Impact
let platformsImpact = '';
if (ethicalPlatformsAnswer === 'Always') {
  platformsImpact = 'Outstanding';
} else if (ethicalPlatformsAnswer === 'Frequently') {
  platformsImpact = 'Great';
} else if (ethicalPlatformsAnswer === 'Occasionally') {
  platformsImpact = 'Decent';
} else {
  platformsImpact = 'Poor';
}

// 4. Final Overall Ethical & Social Responsibility Impact
let finalEthicalImpact = '';
const impacts = [importanceImpact, researchImpact, platformsImpact];

if (impacts.every(i => i === 'Outstanding')) {
  finalEthicalImpact = 'Outstanding';
} else if (impacts.includes('Great') && !impacts.includes('Decent') && !impacts.includes('Lacking ') && !impacts.includes('Poor')) {
  finalEthicalImpact = 'Great';
} else if (impacts.includes('Decent') && !impacts.includes('Lacking ') && !impacts.includes('Poor')) {
  finalEthicalImpact = 'Decent';
} else if (impacts.includes('Lacking ') && !impacts.includes('Poor')) {
  finalEthicalImpact = 'Lacking ';
} else {
  finalEthicalImpact = 'Poor';
}

console.log('Ethical Certifications Impact:', importanceImpact);
console.log('Brand Research Impact:', researchImpact);
console.log('Ethical Platforms Impact:', platformsImpact);
console.log('Final Ethical Responsibility Impact:', finalEthicalImpact);



// Map impact levels to percentages (reversed)
const impactPercentageMap = {
  'Outstanding': 100, // Outstanding gets the highest score (100%)
  'Great': 75,        // Great impact gets a high score (75%)
  'Decent': 50,       // Decent impact gets a middle score (50%)
  'Lacking': 25,      // Lacking gets a lower score (25%)
  'Poor': 0           // Poor gets the lowest score (0%)
};

// Function to calculate overall impact percentage based on multiple categories
function calculateOverallImpactPercentage(impactLevels) {
  // Map the impact levels from each category to their corresponding percentages
  const percentages = impactLevels
    .map(level => {
      const trimmedLevel = level.trim();
      return impactPercentageMap[trimmedLevel] !== undefined ? impactPercentageMap[trimmedLevel] : null; // Skip invalid levels
    })
    .filter(percentage => percentage !== null); // Remove any invalid values

  // If no valid levels are provided, return an error or appropriate message
  if (percentages.length === 0) {
    return 'Invalid levels provided';  // You can customize this message as needed
  }

  // Calculate the average percentage
  const averagePercentage = percentages.reduce((sum, percentage) => sum + percentage, 0) / percentages.length;

  // Return the average percentage
  return averagePercentage;
}


// Impact levels from various categories (replace these variables with actual values)
const overallImpactPercentage = [
  impactLevel,           // Impact level based on emissions
  finalImpact,           // Impact level based on repairs & longevity
  userImpact,            // Impact level based on waste diverted
  finalEthicalImpact,    // Ethical impact
  fashionImpactLevel     // Fashion impact
];

// Call the function to get the average percentage
const averageImpactPercentage = calculateOverallImpactPercentage(overallImpactPercentage);

// Output the result
console.log("Average Impact Percentage:", averageImpactPercentage);


// Generate recommendation text based on overall impact
function generateRecommendation(finalEthicalImpact) {
  switch (finalEthicalImpact) {
    case 'Outstanding':
      return `You're doing great! Your choices have minimal negative impact on people and the planet. 
Consider continuing to support brands that uphold ethical standards, and use platforms like Good On You or Ethical Consumer to stay informed.`;

    case 'Great':
      return `You're making thoughtful decisions that show concern for workers' rights and environmental health. 
To go even further, prioritize brands certified by programs like Fair Trade, SA8000, or B Corp.`;

    case 'Decent':
      return `You're on the right path, but there’s room to grow. 
Using resources like Good On You can help you better understand which brands are transparent, ethical, and environmentally conscious.`;

    case 'Lacking ':
      return `Your habits may be unintentionally supporting brands with poor ethical or environmental practices. 
Try researching brands before purchasing, and seek those with clear supply chains and strong ethical commitments.`;

    case 'Poor':
      return `Your current fashion habits have a significant negative social and environmental impact. 
To change that, start using platforms like Good On You and Ethical Consumer, and shift your support to brands that respect workers and sustainability.`;

    default:
      return `We couldn't determine your recommendation. Please complete all the steps for accurate insights.`;
  }
}


// Example impact levels from each category
const impactLevels = [
  impactLevel,           // Impact level based on emissions (from your code)
  finalImpact,           // Impact level based on repairs & longevity (from your code)
  userImpact,            // Impact level based on waste diverted (from your code)
  finalEthicalImpact,    // Ethical impact (from your code)
  fashionImpactLevel     // Fashion impact (from your code)
];

// Calculate the overall impact score
const overallImpact = calculateOverallImpactPercentage(impactLevels);
const recommendationText = generateRecommendation(finalEthicalImpact);
const finalOverallImpact = calculateOverallImpactPercentage(impactLevels);

console.log('Overall Impact Score:', overallImpact);
console.log('Recommendation:\n', recommendationText);



    // Send response
    res.json({
      totalFootprint: totalFootprint.toFixed(2),
      sectionTotals: categoryBreakdown,
      categoryBreakdown,
      totalWaterSaved: totalWaterSaved.toFixed(2),  // Add the total water saved
      totalWasteDivertedKg: totalWasteDivertedKg.toFixed(2),
      repairImpact,
      longevityImpact,
      impactLevel,
      finalImpact,
      finalEthicalImpact,
      fashionImpactLevel,
      fashionPerformanceMessage,
      comparisonMessage,
      fashionPercentDifference,
      performanceMessage, 
      recommendationText,
      waterBreakdown,
      finalOverallImpact,
      feedback,
      steps,
      userImpact,
      message,
      actionSteps,
      overallImpact,
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


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
