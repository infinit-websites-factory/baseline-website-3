import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, X } from "lucide-react";

interface VehicleFiltersProps {
  searchTerm?: string;
  onSearchChange: (value: string) => void;
  selectedBrand?: string;
  onBrandChange: (value: string) => void;
  selectedBodyType?: string;
  onBodyTypeChange: (value: string) => void;
  selectedTransmission?: string;
  onTransmissionChange: (value: string) => void;
  selectedFuel?: string;
  onFuelChange: (value: string) => void;
  priceRange?: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;
  mileageRange?: [number, number];
  onMileageRangeChange: (value: [number, number]) => void;
  yearRange?: [number, number];
  onYearRangeChange: (value: [number, number]) => void;
  onClearFilters: () => void;
  brands?: string[];
  bodyTypes?: string[];
  transmissions?: string[];
  fuels?: string[];
}

const VehicleFilters = ({ 
  searchTerm = '', 
  onSearchChange, 
  selectedBrand = '', 
  onBrandChange,
  selectedBodyType = '',
  onBodyTypeChange,
  selectedTransmission = '',
  onTransmissionChange,
  selectedFuel = '',
  onFuelChange,
  priceRange = [0, 100000],
  onPriceRangeChange,
  mileageRange = [0, 300000],
  onMileageRangeChange,
  yearRange = [2000, new Date().getFullYear()],
  onYearRangeChange,
  onClearFilters,
  brands = [],
  bodyTypes = [],
  transmissions = [],
  fuels = []
}: VehicleFiltersProps) => {
  // Safely access array values with fallbacks
  const safePriceRange = priceRange || [0, 100000];
  const safeMileageRange = mileageRange || [0, 300000];
  const safeYearRange = yearRange || [2000, new Date().getFullYear()];
  
  const hasActiveFilters = searchTerm || selectedBrand || selectedBodyType || selectedTransmission || selectedFuel || 
    safePriceRange[0] > 0 || safePriceRange[1] < 100000 || 
    safeMileageRange[0] > 0 || safeMileageRange[1] < 300000 ||
    safeYearRange[0] > 2000 || safeYearRange[1] < new Date().getFullYear();

  return (
    <div className="bg-secondary/50 p-6 rounded-lg space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Filtros</h3>
                {hasActiveFilters && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={onClearFilters}
                    className="text-primary"
                  >
                    <X size={16} className="mr-1" />
                    Eliminar filtros
                  </Button>
                )}
              </div>

              {/* Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input 
                    placeholder="Buscar por marca, modelo..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                  />
                </div>
              </div>

              {/* Brand Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Marca</label>
                <Select value={selectedBrand} onValueChange={(value) => onBrandChange(value === 'all' ? '' : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las marcas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las marcas</SelectItem>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Body Type Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Carrocería</label>
                <Select value={selectedBodyType} onValueChange={(value) => onBodyTypeChange(value === 'all' ? '' : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    {bodyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Transmission Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Transmisión</label>
                <Select value={selectedTransmission} onValueChange={(value) => onTransmissionChange(value === 'all' ? '' : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {transmissions.map((transmission) => (
                      <SelectItem key={transmission} value={transmission}>
                        {transmission}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Fuel Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Combustible</label>
                <Select value={selectedFuel} onValueChange={(value) => onFuelChange(value === 'all' ? '' : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {fuels.map((fuel) => (
                      <SelectItem key={fuel} value={fuel}>
                        {fuel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Precio</label>
                <div className="px-2">
                  <Slider
                    value={safePriceRange}
                    onValueChange={onPriceRangeChange}
                    max={100000}
                    step={1000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>£{safePriceRange[0]?.toLocaleString() || '0'}</span>
                    <span>{safePriceRange[1] >= 100000 ? '£100,000+' : `£${safePriceRange[1]?.toLocaleString() || '0'}`}</span>
                  </div>
                </div>
              </div>

              {/* Mileage Range */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Kilómetros</label>
                <div className="px-2">
                  <Slider
                    value={safeMileageRange}
                    onValueChange={onMileageRangeChange}
                    max={300000}
                    step={5000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{safeMileageRange[0]?.toLocaleString() || '0'}</span>
                    <span>{safeMileageRange[1] >= 300000 ? '300,000+' : `${safeMileageRange[1]?.toLocaleString() || '0'}`}</span>
                  </div>
                </div>
              </div>

              {/* Year Range */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Año</label>
                <div className="px-2">
                  <Slider
                    value={safeYearRange}
                    onValueChange={onYearRangeChange}
                    min={2000}
                    max={new Date().getFullYear()}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{safeYearRange[0] || 2000}</span>
                    <span>{safeYearRange[1] || new Date().getFullYear()}</span>
                  </div>
                </div>
              </div>
            </div>
  );
};

export default VehicleFilters;