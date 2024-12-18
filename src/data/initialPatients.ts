import { Patient } from '../types/patient';

export const initialPatients: Patient[] = [
  {
    id: 'zach-bligh',
    name: 'Zach Bligh',
    prescriptions: [{
      id: 'zb-sem-1',
      product: 'Semaglutide',
      weeklyDosage: '0.5mg',
      monthlyDosage: '2mg',
      weeklyVolume: '0.2ml',
      monthlyVolume: '0.8ml',
      tier: 'Tier 2',
      price: '200.00',
      contactInfo: 'Griffin',
      refillDue: '11/14',
      lastFillDate: '12/26',
      daysUntilFill: -33,
      status: 'active'
    }],
    status: 'active',
    contactInfo: 'Griffin'
  },
  {
    id: 'jodi',
    name: 'Jodi',
    prescriptions: [{
      id: 'j-tir-1',
      product: 'Tirzepatide',
      weeklyDosage: '5mg',
      monthlyDosage: '20mg',
      weeklyVolume: '0.8ml',
      monthlyVolume: '3.2ml',
      tier: 'Tier 2',
      price: '175.00',
      contactInfo: 'Michael',
      refillDue: '11/19',
      lastFillDate: '12/19',
      daysUntilFill: -28,
      status: 'active'
    }],
    status: 'active',
    contactInfo: 'Michael'
  },
  {
    id: 'michael',
    name: 'Michael',
    prescriptions: [{
      id: 'm-ret-1',
      product: 'Retatrutide',
      weeklyDosage: '10mg',
      monthlyDosage: '32mg',
      weeklyVolume: '1.6ml',
      monthlyVolume: '6.4ml',
      tier: 'Tier 3',
      price: '550.00',
      contactInfo: 'Michael',
      refillDue: '11/19',
      lastFillDate: '12/19',
      daysUntilFill: -28,
      status: 'active'
    }],
    status: 'active',
    contactInfo: 'Michael'
  },
  {
    id: 'maria',
    name: 'Maria',
    prescriptions: [{
      id: 'ma-ret-1',
      product: 'Retatrutide',
      weeklyDosage: '4mg',
      monthlyDosage: '16mg',
      weeklyVolume: '0.4ml',
      monthlyVolume: '1.6ml',
      tier: 'Tier 1',
      price: '300.00',
      contactInfo: 'Michael',
      refillDue: '11/19',
      lastFillDate: '12/19',
      daysUntilFill: -28,
      status: 'active',
      nextMonthDosage: '4mg',
      newPrice: '350'
    }],
    status: 'active',
    contactInfo: 'Michael'
  },
  {
    id: 'david',
    name: 'David',
    prescriptions: [{
      id: 'd-sem-1',
      product: 'Semaglutide',
      weeklyDosage: '0.5mg',
      monthlyDosage: '1mg',
      weeklyVolume: '0.2ml',
      monthlyVolume: '0.8ml',
      tier: 'Tier 2',
      price: '250.00',
      contactInfo: 'Michael',
      refillDue: '11/20',
      lastFillDate: '12/15',
      daysUntilFill: -27,
      status: 'active'
    }],
    status: 'active',
    contactInfo: 'Michael'
  },
  {
    id: 'angela',
    name: 'Angela',
    prescriptions: [{
      id: 'a-sem-1',
      product: 'Semaglutide',
      weeklyDosage: '0.25mg',
      monthlyDosage: '1mg',
      weeklyVolume: '0.1ml',
      monthlyVolume: '0.4ml',
      tier: 'Tier 1',
      price: '200.00',
      contactInfo: 'Griffin',
      refillDue: '11/22',
      lastFillDate: '10/22',
      daysUntilFill: -25,
      status: 'active'
    }],
    status: 'active',
    contactInfo: 'Griffin'
  },
  {
    id: 'ye',
    name: 'Ye',
    prescriptions: [{
      id: 'y-sem-1',
      product: 'Semaglutide',
      weeklyDosage: '0.25mg',
      monthlyDosage: '1mg',
      weeklyVolume: '0.1ml',
      monthlyVolume: '0.4ml',
      tier: 'Tier 1',
      price: '200.00',
      contactInfo: 'Griffin',
      refillDue: '11/22',
      lastFillDate: '10/22',
      daysUntilFill: -25,
      status: 'active'
    }],
    status: 'active',
    contactInfo: 'Griffin'
  },
  {
    id: 'allison',
    name: 'Allison',
    prescriptions: [{
      id: 'al-sem-1',
      product: 'Semaglutide',
      weeklyDosage: '0.25mg',
      monthlyDosage: '1mg',
      weeklyVolume: '0.1ml',
      monthlyVolume: '0.4ml',
      tier: 'Tier 1',
      price: '200.00',
      contactInfo: 'Griffin',
      refillDue: '11/26',
      lastFillDate: '10/26',
      daysUntilFill: -21,
      status: 'active'
    }],
    status: 'active',
    contactInfo: 'Griffin'
  },
  {
    id: 'mackenzie',
    name: 'Mackenzie',
    prescriptions: [{
      id: 'mk-sem-1',
      product: 'Semaglutide',
      weeklyDosage: '0.5mg',
      monthlyDosage: '2mg',
      weeklyVolume: '0.2ml',
      monthlyVolume: '0.8ml',
      tier: 'Tier 2',
      price: '0.00',
      contactInfo: 'Griffin',
      refillDue: '11/26',
      lastFillDate: '10/26',
      daysUntilFill: -21,
      status: 'active'
    }],
    status: 'active',
    contactInfo: 'Griffin'
  },
  {
    id: 'andres',
    name: 'Andres',
    prescriptions: [{
      id: 'an-sem-1',
      product: 'Semaglutide',
      weeklyDosage: '0.25mg',
      monthlyDosage: '1mg',
      weeklyVolume: '0.1ml',
      monthlyVolume: '0.4ml',
      tier: 'Tier 1',
      price: '250.00',
      contactInfo: 'Michael',
      refillDue: '10/27',
      lastFillDate: '11/26',
      daysUntilFill: -51,
      status: 'active'
    }],
    status: 'active',
    contactInfo: 'Michael'
  },
  {
    id: 'griffin',
    name: 'Griffin',
    prescriptions: [{
      id: 'g-ret-1',
      product: 'Retatrutide',
      weeklyDosage: '4mg',
      monthlyDosage: '16mg',
      weeklyVolume: '0.8ml',
      monthlyVolume: '3.2ml',
      tier: 'Tier 2',
      price: '0.00',
      contactInfo: 'Griffin',
      refillDue: '10/29',
      lastFillDate: '10/22',
      daysUntilFill: -49,
      status: 'active'
    }],
    status: 'active',
    contactInfo: 'Griffin'
  },
  {
    id: 'gino',
    name: 'Gino',
    prescriptions: [{
      id: 'gi-sem-1',
      product: 'Semaglutide',
      weeklyDosage: '0.25mg',
      monthlyDosage: '1mg',
      weeklyVolume: '0.1ml',
      monthlyVolume: '0.4ml',
      tier: 'Tier 1',
      price: '300.00',
      contactInfo: 'Nate',
      refillDue: '12/22',
      lastFillDate: '11/22',
      daysUntilFill: 5,
      status: 'active'
    }],
    status: 'active',
    contactInfo: 'Nate'
  },
  {
    id: 'nate',
    name: 'Nate',
    prescriptions: [{
      id: 'n-sem-1',
      product: 'Semaglutide',
      weeklyDosage: '2.7mg',
      monthlyDosage: '10.8mg',
      weeklyVolume: '1.08ml',
      monthlyVolume: '4.32ml',
      tier: 'Tier 3',
      price: '250.00',
      contactInfo: 'Griffin',
      refillDue: '11/5',
      lastFillDate: '11/5',
      daysUntilFill: -42,
      status: 'active'
    }],
    status: 'active',
    contactInfo: 'Griffin'
  },
  {
    id: 'nestors-brother',
    name: 'Nestor\'s brother',
    prescriptions: [{
      id: 'nb-sem-1',
      product: 'Semaglutide',
      weeklyDosage: '0.25mg',
      monthlyDosage: '1mg',
      weeklyVolume: '0.1ml',
      monthlyVolume: 'N/A',
      tier: 'Tier 1',
      price: '100.00',
      contactInfo: 'Griffin',
      refillDue: '11/7',
      lastFillDate: '11/7',
      daysUntilFill: -40,
      status: 'active'
    }],
    status: 'active',
    contactInfo: 'Griffin'
  },
  {
    id: 'nestor',
    name: 'Nestor',
    prescriptions: [{
      id: 'ne-sem-1',
      product: 'Semaglutide',
      weeklyDosage: '0.25mg',
      monthlyDosage: '1mg',
      weeklyVolume: '0.1ml',
      monthlyVolume: '0.4ml',
      tier: 'Tier 1',
      price: '100.00',
      contactInfo: 'Griffin',
      refillDue: '11/7',
      lastFillDate: '11/7',
      daysUntilFill: -40,
      status: 'active'
    }],
    status: 'active',
    contactInfo: 'Griffin'
  },
  {
    id: 'zachs-mom',
    name: 'Zach\'s Mom',
    prescriptions: [{
      id: 'zm-sem-1',
      product: 'Semaglutide',
      weeklyDosage: '0.25mg',
      monthlyDosage: '1mg',
      weeklyVolume: '0.1ml',
      monthlyVolume: '0.4ml',
      tier: 'Tier 1',
      price: '200.00',
      contactInfo: 'Griffin',
      refillDue: '11/10',
      lastFillDate: '12/10',
      daysUntilFill: -37,
      status: 'active'
    }],
    status: 'active',
    contactInfo: 'Griffin'
  }
];