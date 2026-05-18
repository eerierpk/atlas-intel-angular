export interface Device {
  id: string;
  name: string;
  vendor: string;
  modality: 'MRI' | 'CT' | 'X-ray' | 'Ultrasound' | 'Mammography' | 'PET/CT';
  description: string;
  priceRange: string;
  basePrice: number;
  releaseYear: number;
  features: string[];
  specs: Record<string, string | number>;
  aiCapabilities: string[];
  reviewScore: number;
  reviewCount: number;
  imageUrl: string;
}

export const DEVICES: Device[] = [
  {
    id: 'mri-lumina-pro',
    name: 'MAGNETOM Lumina Pro',
    vendor: 'Siemens Healthineers',
    modality: 'MRI',
    description: 'A 3T MRI scanner designed for high throughput and exceptional image quality.',
    priceRange: '$1.2M - $1.8M',
    basePrice: 1500000,
    releaseYear: 2023,
    features: ['BioMatrix Technology', 'Turbo Suite', 'Dot Engine'],
    specs: {
      fieldStrength: '3T',
      boreSize: '70cm',
      slewRate: '200 mT/m/ms'
    },
    aiCapabilities: ['Deep Resolve Sharp', 'AI-Rad Companion', 'AutoAlign'],
    reviewScore: 4.8,
    reviewCount: 124,
    imageUrl: 'https://picsum.photos/seed/mri1/800/600'
  },
  {
    id: 'ct-revolution-apex',
    name: 'Revolution Apex',
    vendor: 'GE HealthCare',
    modality: 'CT',
    description: 'Next-generation CT system featuring high-speed scanning and AI-driven reconstruction.',
    priceRange: '$800K - $1.4M',
    basePrice: 1100000,
    releaseYear: 2024,
    features: ['Gemstone Spectral Imaging', 'TrueFidelity Deep Learning', 'Fast Cardio'],
    specs: {
      slices: 512,
      rotationSpeed: '0.23s',
      spatialResolution: '0.23mm'
    },
    aiCapabilities: ['Effortless Workflow', 'Smart Subscription', 'Auto-segmentation'],
    reviewScore: 4.9,
    reviewCount: 89,
    imageUrl: 'https://picsum.photos/seed/ct1/800/600'
  },
  {
    id: 'us-epiq-elite',
    name: 'EPIQ Elite',
    vendor: 'Philips',
    modality: 'Ultrasound',
    description: 'Premium ultrasound system with advanced diagnostic imaging and workflow efficiencies.',
    priceRange: '$120K - $250K',
    basePrice: 180000,
    releaseYear: 2022,
    features: ['nSIGHT Plus', 'Anatomical Intelligence', 'PureWave Transducers'],
    specs: {
      monitor: '24-inch OLED',
      weight: '90kg',
      batteryLife: '45 mins'
    },
    aiCapabilities: ['SmartExam', 'aCMQ AI', 'Auto Doppler'],
    reviewScore: 4.7,
    reviewCount: 215,
    imageUrl: 'https://picsum.photos/seed/us1/800/600'
  }
];
