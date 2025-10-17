// Sample listings data
export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  priceType: 'sale' | 'rent';
  location: {
    city: string;
    neighborhood: string;
    address: string;
  };
  propertyType: 'house' | 'apartment' | 'villa' | 'condo' | 'townhouse' | 'land';
  bedrooms: number;
  bathrooms: number;
  area: number; // in sqft
  features: string[];
  images: string[];
  yearBuilt?: number;
  parking?: number;
  furnished?: boolean;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  status: 'available' | 'pending' | 'sold';
  featured?: boolean;
}

export const listings: Listing[] = [
  {
    id: '1',
    title: 'Luxury Villa in Achrafieh',
    description: 'Stunning luxury villa in the heart of Achrafieh with panoramic views of Beirut. This magnificent property features high-end finishes, spacious rooms, and a beautiful garden. Perfect for families looking for elegance and comfort in one of Beirut\'s most prestigious neighborhoods.',
    price: 850000,
    priceType: 'sale',
    location: {
      city: 'Beirut',
      neighborhood: 'Achrafieh',
      address: 'Damascus Street, Achrafieh',
    },
    propertyType: 'villa',
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    features: ['Sea View', 'Garden', 'Parking', 'Balcony', 'Modern Kitchen', 'Central AC', 'Security System'],
    images: ['/mountainhead-house.webp', '/mountainhead-house.webp', '/mountainhead-house.webp'],
    yearBuilt: 2018,
    parking: 2,
    furnished: false,
    agentName: 'Ayman Sbeity',
    agentPhone: '+961 3 123 456',
    agentEmail: 'ayman@realty.com',
    status: 'available',
    featured: true,
  },
  {
    id: '2',
    title: 'Modern Apartment in Maameltein',
    description: 'Contemporary apartment with breathtaking sea views in Jounieh\'s most sought-after area. This bright and airy unit features an open-plan living area, modern amenities, and a large balcony perfect for entertaining.',
    price: 2500,
    priceType: 'rent',
    location: {
      city: 'Jounieh',
      neighborhood: 'Maameltein',
      address: 'Seaside Road, Maameltein',
    },
    propertyType: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    features: ['Sea View', 'Balcony', 'Elevator', 'Parking', 'Storage', 'Gym'],
    images: ['/mountainhead-house.webp', '/mountainhead-house.webp'],
    yearBuilt: 2020,
    parking: 1,
    furnished: true,
    agentName: 'Richy',
    agentPhone: '+961 3 234 567',
    agentEmail: 'richy@realty.com',
    status: 'available',
    featured: true,
  },
  {
    id: '3',
    title: 'Beachfront Property in Byblos',
    description: 'Exclusive beachfront villa in historic Byblos with direct beach access. This exceptional property combines luxury living with the charm of one of Lebanon\'s most beautiful coastal cities. Features include a private beach, infinity pool, and stunning Mediterranean architecture.',
    price: 1200000,
    priceType: 'sale',
    location: {
      city: 'Byblos',
      neighborhood: 'Old Souk',
      address: 'Coastal Road, Old Souk',
    },
    propertyType: 'villa',
    bedrooms: 5,
    bathrooms: 4,
    area: 4500,
    features: ['Beach Access', 'Pool', 'Garden', 'Sea View', 'Parking', 'Terrace', 'BBQ Area', 'Modern Kitchen'],
    images: ['/mountainhead-house.webp', '/mountainhead-house.webp', '/mountainhead-house.webp'],
    yearBuilt: 2019,
    parking: 3,
    furnished: false,
    agentName: 'Ayman Sbeity',
    agentPhone: '+961 3 123 456',
    agentEmail: 'ayman@realty.com',
    status: 'available',
    featured: true,
  },
  {
    id: '4',
    title: 'Spacious House in Batroun',
    description: 'Beautiful traditional Lebanese house in charming Batroun. This property features authentic architecture combined with modern amenities, a large garden, and stunning mountain views.',
    price: 450000,
    priceType: 'sale',
    location: {
      city: 'Batroun',
      neighborhood: 'Downtown',
      address: 'Main Street, Batroun',
    },
    propertyType: 'house',
    bedrooms: 3,
    bathrooms: 2,
    area: 2200,
    features: ['Garden', 'Mountain View', 'Parking', 'Terrace', 'Storage'],
    images: ['/mountainhead-house.webp', '/mountainhead-house.webp'],
    yearBuilt: 2015,
    parking: 2,
    furnished: false,
    agentName: 'Richy',
    agentPhone: '+961 3 234 567',
    agentEmail: 'richy@realty.com',
    status: 'available',
    featured: false,
  },
  {
    id: '5',
    title: 'Downtown Beirut Apartment',
    description: 'Prime location apartment in Beirut Central District with easy access to shops, restaurants, and business centers. Modern finishes and excellent building amenities.',
    price: 3200,
    priceType: 'rent',
    location: {
      city: 'Beirut',
      neighborhood: 'Downtown',
      address: 'Weygand Street, Downtown',
    },
    propertyType: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 1500,
    features: ['City View', 'Balcony', 'Elevator', 'Parking', 'Concierge', 'Gym', 'Security'],
    images: ['/mountainhead-house.webp'],
    yearBuilt: 2021,
    parking: 1,
    furnished: true,
    agentName: 'Ayman Sbeity',
    agentPhone: '+961 3 123 456',
    agentEmail: 'ayman@realty.com',
    status: 'available',
    featured: false,
  },
  {
    id: '6',
    title: 'Tripoli Family Home',
    description: 'Comfortable family home in a quiet Tripoli neighborhood. Perfect for families with children, close to schools and parks.',
    price: 320000,
    priceType: 'sale',
    location: {
      city: 'Tripoli',
      neighborhood: 'Mina',
      address: 'Azmi Street, Mina',
    },
    propertyType: 'house',
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    features: ['Garden', 'Parking', 'Storage', 'Balcony'],
    images: ['/mountainhead-house.webp', '/mountainhead-house.webp'],
    yearBuilt: 2012,
    parking: 2,
    furnished: false,
    agentName: 'Richy',
    agentPhone: '+961 3 234 567',
    agentEmail: 'richy@realty.com',
    status: 'available',
    featured: false,
  },
  {
    id: '7',
    title: 'Luxury Condo in Verdun',
    description: 'High-end condominium in Beirut\'s Verdun district. Premium finishes, smart home features, and world-class amenities.',
    price: 4500,
    priceType: 'rent',
    location: {
      city: 'Beirut',
      neighborhood: 'Verdun',
      address: 'Verdun Street',
    },
    propertyType: 'condo',
    bedrooms: 3,
    bathrooms: 3,
    area: 2100,
    features: ['City View', 'Pool', 'Gym', 'Elevator', 'Parking', 'Concierge', 'Smart Home', 'Modern Kitchen'],
    images: ['/mountainhead-house.webp', '/mountainhead-house.webp', '/mountainhead-house.webp'],
    yearBuilt: 2022,
    parking: 2,
    furnished: true,
    agentName: 'Ayman Sbeity',
    agentPhone: '+961 3 123 456',
    agentEmail: 'ayman@realty.com',
    status: 'available',
    featured: false,
  },
  {
    id: '8',
    title: 'Cozy Apartment in Saida',
    description: 'Affordable and comfortable apartment in Saida, perfect for small families or couples. Close to the sea and local amenities.',
    price: 1200,
    priceType: 'rent',
    location: {
      city: 'Saida',
      neighborhood: 'Sea Road',
      address: 'Corniche Street',
    },
    propertyType: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    area: 1100,
    features: ['Sea View', 'Balcony', 'Parking'],
    images: ['/mountainhead-house.webp'],
    yearBuilt: 2010,
    parking: 1,
    furnished: false,
    agentName: 'Richy',
    agentPhone: '+961 3 234 567',
    agentEmail: 'richy@realty.com',
    status: 'available',
    featured: false,
  },
];

export const cities = ['Beirut', 'Jounieh', 'Byblos', 'Tripoli', 'Saida', 'Batroun', 'Zahle', 'Tyre'];

export const propertyTypes = ['House', 'Apartment', 'Villa', 'Condo', 'Townhouse', 'Land'];

export const features = [
  'Sea View',
  'Mountain View',
  'City View',
  'Garden',
  'Pool',
  'Parking',
  'Balcony',
  'Terrace',
  'Elevator',
  'Gym',
  'Security System',
  'Modern Kitchen',
  'Central AC',
  'Smart Home',
  'Beach Access',
  'BBQ Area',
  'Storage',
  'Concierge',
];
