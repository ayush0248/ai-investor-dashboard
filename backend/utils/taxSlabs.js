export const taxSlabs = {
    old: [
      { min: 0, max: 250000, rate: 0 },
      { min: 250001, max: 500000, rate: 5 },
      { min: 500001, max: 1000000, rate: 20 },
      { min: 1000001, max: Infinity, rate: 30 },
    ],
    new: [
      { min: 0, max: 250000, rate: 0 },
      { min: 250001, max: 500000, rate: 5 },
      { min: 500001, max: 750000, rate: 10 },
      { min: 750001, max: 1000000, rate: 15 },
      { min: 1000001, max: 1250000, rate: 20 },
      { min: 1250001, max: 1500000, rate: 25 },
      { min: 1500001, max: Infinity, rate: 30 },
    ],
  };
  