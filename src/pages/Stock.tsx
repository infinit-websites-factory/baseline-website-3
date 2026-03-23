import { useQuery } from "@tanstack/react-query";
import VehicleCard from "@/components/VehicleCard";
import VehicleFilters from "@/components/VehicleFilters";
import { fetchCars, transformApiCarToVehicle, type Vehicle } from "@/services/carsApi";
import { useVehicleFilters } from "@/hooks/useVehicleFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Stock = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const { 
    data: carsResponse, 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['cars'],
    queryFn: () => fetchCars(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });

  const vehicles: Vehicle[] = carsResponse
    ? carsResponse.items.map(transformApiCarToVehicle)
    : [];

  const totalVehicles = carsResponse?.total || 0;

  const {
    filters,
    updateFilter,
    clearFilters,
    filteredVehicles,
    filterOptions,
  } = useVehicleFilters(vehicles);

  // Set initial search from URL parameter only once, then remove it from the URL
  useEffect(() => {
    if (!initialSearch) return;

    updateFilter('searchTerm', initialSearch);

    const next = new URLSearchParams(searchParams);
    next.delete('search');
    setSearchParams(next, { replace: true });
  }, [initialSearch, updateFilter, setSearchParams, searchParams]);

  const sortOptions = [
    { value: 'updated_desc', label: t('stock_page.sort_options.updated_desc') },
    { value: 'updated_asc', label: t('stock_page.sort_options.updated_asc') },
    { value: 'price_asc', label: t('stock_page.sort_options.price_asc') },
    { value: 'price_desc', label: t('stock_page.sort_options.price_desc') },
    { value: 'year_desc', label: t('stock_page.sort_options.year_desc') },
    { value: 'year_asc', label: t('stock_page.sort_options.year_asc') },
    { value: 'mileage_asc', label: t('stock_page.sort_options.mileage_asc') },
    { value: 'mileage_desc', label: t('stock_page.sort_options.mileage_desc') },
    { value: 'brand_asc', label: t('stock_page.sort_options.brand_asc') },
  ];

  if (isError) {
    return (
      <div className="min-h-screen bg-background">
        <SEO page="stock" />
        <Header />
        <main>
          <div className="container mx-auto px-4 pt-8 pb-16">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">{t('stock_page.title')}</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('stock_page.subtitle')}
              </p>
            </div>
          </div>

          <div className="container mx-auto px-4 pb-16">
            <Alert className="max-w-md mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {t('vehicle_gallery.error_loading')}
              </AlertDescription>
            </Alert>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="container mx-auto px-4 pt-8 pb-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">{t('stock_page.title')}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('stock_page.subtitle')}
            </p>
          </div>
        </div>
        
        {/* Main Content with Sidebar Layout */}
        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <VehicleFilters
                  searchTerm={filters.searchTerm}
                  onSearchChange={(value) => updateFilter('searchTerm', value)}
                  selectedBrand={filters.selectedBrand}
                  onBrandChange={(value) => updateFilter('selectedBrand', value)}
                  selectedBodyType={filters.selectedBodyType}
                  onBodyTypeChange={(value) => updateFilter('selectedBodyType', value)}
                  selectedTransmission={filters.selectedTransmission}
                  onTransmissionChange={(value) => updateFilter('selectedTransmission', value)}
                  selectedFuel={filters.selectedFuel}
                  onFuelChange={(value) => updateFilter('selectedFuel', value)}
                  priceRange={filters.priceRange}
                  onPriceRangeChange={(value) => updateFilter('priceRange', value)}
                  mileageRange={filters.mileageRange}
                  onMileageRangeChange={(value) => updateFilter('mileageRange', value)}
                  yearRange={filters.yearRange}
                  onYearRangeChange={(value) => updateFilter('yearRange', value)}
                  onClearFilters={clearFilters}
                  brands={filterOptions.brands}
                  bodyTypes={filterOptions.bodyTypes}
                  transmissions={filterOptions.transmissions}
                    fuels={filterOptions.fuels}
                  />
                </div>
              </div>

              {/* Vehicles Content */}
              <div className="lg:col-span-3">
                {/* Results Count and Sort Controls */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-sm text-muted-foreground">
                    {(filters.searchTerm || filters.selectedBrand || filters.selectedBodyType || filters.selectedTransmission || filters.selectedFuel) ? (
                      <>
                        {filteredVehicles.length} {filteredVehicles.length !== 1 ? t('stock_page.results_count_plural') : t('stock_page.results_count')} {t('stock_page.found')}
                      </>
                    ) : (
                      <>
                        {totalVehicles} {totalVehicles !== 1 ? t('stock_page.results_count_plural') : t('stock_page.results_count')}
                      </>
                    )}
                  </h2>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{t('stock_page.sort_by')}</span>
                    <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder={t('stock_page.sort_placeholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Vehicles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {isLoading ? (
                    Array.from({ length: 12 }).map((_, index) => (
                      <div key={index} className="space-y-3">
                        <Skeleton className="h-48 w-full rounded-lg" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                          <Skeleton className="h-8 w-full" />
                        </div>
                      </div>
                    ))
                  ) : filteredVehicles.length > 0 ? (
                    filteredVehicles.map((vehicle) => (
                      <VehicleCard key={vehicle.id} {...vehicle} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-lg text-muted-foreground mb-4">
                        {t('stock_page.no_results')}
                      </p>
                      <button
                        onClick={clearFilters}
                        className="text-primary hover:underline"
                      >
                        {t('stock_page.clear_filters')}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Stock;