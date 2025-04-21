export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
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
        denim: 1400.4,
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
        jacketsDenim,
  
        monthlyLoads,
        washTemps,
        detergentType,
        tumbleDryLoads
      } = req.body;
  
      const totalTshirtEmissions = {
        recycledCotton: (tshirtsRecycledCotton || 0) * emissionFactors.tshirts.recycledCotton,
        cotton: (tshirtsCotton || 0) * emissionFactors.tshirts.cotton,
        viscose: (tshirtsViscose || 0) * emissionFactors.tshirts.viscose,
        recycledViscose: (tshirtsRecycledViscose || 0) * emissionFactors.tshirts.recycledViscose,
        polyester: (tshirtsPolyester || 0) * emissionFactors.tshirts.polyester,
        recycledPolyester: (tshirtsRecycledPolyester || 0) * emissionFactors.tshirts.recycledPolyester,
        organicCotton: (tshirtsOrganicCotton || 0) * emissionFactors.tshirts.organicCotton,
      };
  
      const totalDressEmissions = {
        cotton: (dressesCotton || 0) * emissionFactors.dresses.cotton,
        recycledCotton: (dressesRecycledCotton || 0) * emissionFactors.dresses.recycledCotton,
        polyester: (dressesPolyester || 0) * emissionFactors.dresses.polyester,
        recycledPolyester: (dressesRecycledPolyester || 0) * emissionFactors.dresses.recycledPolyester,
        viscose: (dressesViscose || 0) * emissionFactors.dresses.viscose,
        recycledViscose: (dressesRecycledViscose || 0) * emissionFactors.dresses.recycledViscose,
      };
  
      const totalJeansEmissions = {
        denim: (trousersDenim || 0) * emissionFactors.jeans.denim,
        cotton: (trousersCottonJeans || 0) * emissionFactors.jeans.cotton,
        polyester: (trousersPolyester || 0) * emissionFactors.jeans.polyester,
      };
  
      const totalJacketEmissions = {
        synthetic: (jacketsSynthetic || 0) * emissionFactors.jackets.synthetic,
        skinLeather: (jacketsSkinLeather || 0) * emissionFactors.jackets.skinLeather,
        down: (jacketsDown || 0) * emissionFactors.jackets.down,
        denim: (jacketsDenim || 0) * emissionFactors.jackets.denim,
      };
  
      const detergentCO2 = laundryEmissionFactors.detergent[detergentType?.toLowerCase()] || 0;
      const temperatureCO2 = laundryEmissionFactors.temperature[washTemps] || 0;
      const dryingCO2 = tumbleDryLoads * laundryEmissionFactors.drying.tumble;
      const washingCO2 = (detergentCO2 + temperatureCO2) * monthlyLoads;
      const totalLaundryCO2 = washingCO2 + dryingCO2;
  
      const tshirtFootprint = Object.values(totalTshirtEmissions).reduce((acc, v) => acc + v, 0);
      const dressFootprint = Object.values(totalDressEmissions).reduce((acc, v) => acc + v, 0);
      const jeansFootprint = Object.values(totalJeansEmissions).reduce((acc, v) => acc + v, 0);
      const jacketFootprint = Object.values(totalJacketEmissions).reduce((acc, v) => acc + v, 0);
      const totalFootprint = tshirtFootprint + dressFootprint + jeansFootprint + jacketFootprint + totalLaundryCO2;
  
      const categoryBreakdown = {
        tshirts: tshirtFootprint,
        dresses: dressFootprint,
        jeans: jeansFootprint,
        jackets: jacketFootprint,
        laundry: totalLaundryCO2,
      };
  
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
  
      res.status(200).json({
        totalFootprint: totalFootprint.toFixed(2),
        sectionTotals: categoryBreakdown,
        categoryBreakdown,
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
  }
  