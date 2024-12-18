import { MEDICATIONS } from '../../types/medications';
import { handleError } from '../errorService';

export async function calculateDosage(medication: string, tier: number) {
  try {
    const med = MEDICATIONS[medication.toLowerCase()];
    if (!med || !med.tiers[tier]) {
      throw new Error('Invalid medication or tier');
    }

    const tierData = med.tiers[tier];
    return {
      weeklyDosage: `${tierData.dosageMg}mg`,
      monthlyDosage: `${tierData.dosageMg * 4}mg`,
      weeklyVolume: `${tierData.dosageMl}ml`,
      monthlyVolume: `${tierData.dosageMl * 4}ml`,
      cost: tierData.monthlyCost
    };
  } catch (error) {
    throw handleError(error, { medication, tier });
  }
}