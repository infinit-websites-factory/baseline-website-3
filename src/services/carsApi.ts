export interface CarApiResponse {
  id: string;
  title: string;
  ad_description: string;
  price_cents: number;
  currency_code: string;
  status: string;
  make: string;
  model: string;
  registration_date: string;
  odometer: {
    value: number;
    unit: string;
  };
  fuel: string;
  transmission: string;
  body_type: string;
  color: string;
  num_doors: number;
  num_seats: number;
  engine_size: number | null;
  engine_power: number;
  photo_urls: string[];
  created_at: string;
  updated_at: string;
  days_in_stock: number;
  country_details?: {
    country_code: string;
    environmental_badge: string;
  };
}

export type CarsApiResponse = CarApiResponse[];

export interface Vehicle {
  id: string;
  images: string[];
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  type: string;
  color?: string;
  doors?: number;
  seats?: number;
  engineSize?: number | null;
  enginePower?: number;
  createdAt: string;
  updatedAt: string;
  environmentalBadge?: string;
}

// Default fallback profile ID
const DEFAULT_PROFILE_ID = 'aba6af2e-18f8-4757-a892-c589d9b965ca';

// UUID v4 regex pattern
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Extract profile ID from subdomain if domain is infinitsite.com
 * Returns the profile ID if valid UUID, otherwise returns default
 */
const getProfileIdFromSubdomain = (): string => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return DEFAULT_PROFILE_ID;
  }

  const hostname = window.location.hostname;

  // Check if the domain ends with infinitsite.com
  if (!hostname.endsWith('.infinitsite.com')) {
    return DEFAULT_PROFILE_ID;
  }

  // Extract subdomain (everything before .infinitsite.com)
  const subdomain = hostname.replace('.infinitsite.com', '');

  // Validate if subdomain is a valid UUID
  if (UUID_REGEX.test(subdomain)) {
    console.log('Using profile ID from subdomain:', subdomain);
    return subdomain;
  }

  console.log('Subdomain is not a valid UUID, using default profile ID');
  return DEFAULT_PROFILE_ID;
};

// Get the profile ID (either from subdomain or default)
export const PROFILE_ID = getProfileIdFromSubdomain();

// API endpoints using the dynamic profile ID
const API_BASE_URL = 'https://multipost-api.alx.test-cluster.alx.tech';
const API_URL = `${API_BASE_URL}/api/public/inventory/profiles/${PROFILE_ID}`;
export const CONTACT_FORM_API_URL = `${API_BASE_URL}/api/interactions/contact-form`;

export const fetchCars = async (): Promise<CarsApiResponse> => {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'cache-control': 'no-cache',
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed with status: ${response.status}`);
  }

  return response.json();
};

export const transformApiCarToVehicle = (apiCar: CarApiResponse): Vehicle => {
  const registrationYear = apiCar.registration_date
    ? new Date(apiCar.registration_date).getFullYear()
    : new Date().getFullYear();

  const badgeValue = apiCar.country_details?.environmental_badge;

  console.log('API Car badge value:', badgeValue, 'for', apiCar.make, apiCar.model);

  return {
    id: apiCar.id,
    images: apiCar.photo_urls?.length > 0 ? apiCar.photo_urls : ['/placeholder.svg'],
    brand: apiCar.make || 'Unknown',
    model: apiCar.model || 'Unknown',
    year: registrationYear,
    price: apiCar.price_cents ? apiCar.price_cents / 100 : 0, // Convert from cents to euros
    mileage: apiCar.odometer?.value || 0,
    fuel: apiCar.fuel || 'Unknown',
    transmission: apiCar.transmission || 'Unknown',
    type: apiCar.body_type || 'Unknown',
    color: apiCar.color,
    doors: apiCar.num_doors,
    seats: apiCar.num_seats,
    engineSize: apiCar.engine_size,
    enginePower: apiCar.engine_power,
    createdAt: apiCar.created_at,
    updatedAt: apiCar.updated_at,
    environmentalBadge: badgeValue
  };
};