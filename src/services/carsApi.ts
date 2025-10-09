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

const API_URL = 'https://multipost-api.app.infinit.cc/api/public/inventory/profiles/442804f3-ac62-4488-b940-1c11a0f641c2';
export const CONTACT_FORM_API_URL = 'https://multipost-api.app.infinit.cc/api/interactions/contact-form';
export const PROFILE_ID = '442804f3-ac62-4488-b940-1c11a0f641c2';

const TRANSMISSION_TRANSLATIONS: Record<string, string> = {
  'Manual': 'Manual',
  'Automatic': 'Automático',
};

const FUEL_TRANSLATIONS: Record<string, string> = {
  'Diesel': 'Diésel',
  'Petrol': 'Gasolina',
  'Electricity': 'Eléctrico',
  'Hydrogen': 'Hidrógeno',
  'Biofuels': 'Biocombustibles',
  'CNG': 'GNC',
  'LPG': 'GLP',
  'Hybrid': 'Híbrido',
  'Other': 'Otro',
};

const COLOR_TRANSLATIONS: Record<string, string> = {
  'White': 'Blanco',
  'Black': 'Negro',
  'Silver': 'Plateado',
  'Grey': 'Gris',
  'Gray': 'Gris',
  'Red': 'Rojo',
  'Blue': 'Azul',
  'Green': 'Verde',
  'Yellow': 'Amarillo',
  'Orange': 'Naranja',
  'Brown': 'Marrón',
  'Beige': 'Beige',
  'Gold': 'Dorado',
  'Purple': 'Morado',
  'Pink': 'Rosa',
  'Other': 'Otro',
};

const BODY_TYPE_TRANSLATIONS: Record<string, string> = {
  'Sedan': 'Sedán',
  'Hatchback': 'Compacto',
  'SUV': 'SUV',
  'Coupe': 'Coupé',
  'Convertible': 'Descapotable',
  'Wagon': 'Familiar',
  'Van': 'Furgoneta',
  'Truck': 'Camioneta',
  'Minivan': 'Monovolumen',
  'Pickup': 'Pick-up',
  'Crossover': 'Crossover',
  'Sports Car': 'Deportivo',
  'Luxury': 'Lujo',
  'Compact': 'Compacto',
  'Subcompact': 'Subcompacto',
  'Other': 'Otro',
};

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
    fuel: FUEL_TRANSLATIONS[apiCar.fuel] || apiCar.fuel || 'Desconocido',
    transmission: TRANSMISSION_TRANSLATIONS[apiCar.transmission] || apiCar.transmission || 'Desconocido',
    type: BODY_TYPE_TRANSLATIONS[apiCar.body_type] || apiCar.body_type || 'Desconocido',
    color: apiCar.color ? (COLOR_TRANSLATIONS[apiCar.color] || apiCar.color) : undefined,
    doors: apiCar.num_doors,
    seats: apiCar.num_seats,
    engineSize: apiCar.engine_size,
    enginePower: apiCar.engine_power,
    createdAt: apiCar.created_at,
    updatedAt: apiCar.updated_at,
    environmentalBadge: badgeValue
  };
};