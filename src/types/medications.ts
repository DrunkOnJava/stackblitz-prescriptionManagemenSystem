export interface MedicationTier {
  dosageMg: number;
  dosageMl: number;
  weeklyCost: number;
  monthlyCost: number;
}

export interface Medication {
  name: string;
  concentration: string;
  tiers: {
    [key: number]: MedicationTier;
  };
}

export const MEDICATIONS: { [key: string]: Medication } = {
  tirzepatide: {
    name: 'Tirzepatide',
    concentration: '10 mg/2ml',
    tiers: {
      1: { dosageMg: 2.5, dosageMl: 0.5, weeklyCost: 19.50, monthlyCost: 78 },
      2: { dosageMg: 5, dosageMl: 1, weeklyCost: 39, monthlyCost: 156 },
      3: { dosageMg: 7.5, dosageMl: 1.5, weeklyCost: 58.50, monthlyCost: 234 },
      4: { dosageMg: 10, dosageMl: 2, weeklyCost: 78, monthlyCost: 312 },
      5: { dosageMg: 15, dosageMl: 3, weeklyCost: 117, monthlyCost: 468 }
    }
  },
  retatrutide: {
    name: 'Retatrutide',
    concentration: '10 mg/2ml',
    tiers: {
      1: { dosageMg: 2, dosageMl: 0.4, weeklyCost: 17, monthlyCost: 68 },
      2: { dosageMg: 4, dosageMl: 0.8, weeklyCost: 34, monthlyCost: 136 },
      3: { dosageMg: 8, dosageMl: 1.6, weeklyCost: 68, monthlyCost: 272 },
      4: { dosageMg: 10, dosageMl: 2, weeklyCost: 85, monthlyCost: 340 },
      5: { dosageMg: 12, dosageMl: 2.4, weeklyCost: 102, monthlyCost: 408 }
    }
  },
  semaglutide: {
    name: 'Semaglutide',
    concentration: '5 mg/2ml',
    tiers: {
      1: { dosageMg: 0.25, dosageMl: 0.1, weeklyCost: 3.70, monthlyCost: 14.80 },
      2: { dosageMg: 0.5, dosageMl: 0.2, weeklyCost: 7.40, monthlyCost: 29.60 },
      3: { dosageMg: 1, dosageMl: 0.4, weeklyCost: 14.80, monthlyCost: 59.20 },
      4: { dosageMg: 1.7, dosageMl: 0.68, weeklyCost: 25.16, monthlyCost: 100.64 },
      5: { dosageMg: 2, dosageMl: 0.8, weeklyCost: 29.60, monthlyCost: 118.40 }
    }
  }
};