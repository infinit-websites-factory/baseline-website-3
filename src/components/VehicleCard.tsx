import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import ReservedBanner from "@/components/ReservedBanner";
import dgtB from "@/assets/dgt-b.png";
import dgtC from "@/assets/dgt-c.png";
import dgtCero from "@/assets/dgt-cero.png";
import dgtEco from "@/assets/dgt-eco.png";

interface VehicleCardProps {
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
  status: string;
  environmentalBadge?: string;
}

const VehicleCard = ({
  id,
  images = [],
  brand,
  model,
  year,
  price,
  mileage,
  fuel,
  transmission,
  type,
  status,
  environmentalBadge
}: VehicleCardProps) => {
  const { translateVehicleAttribute, formatPrice, t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  console.log('VehicleCard - environmentalBadge:', environmentalBadge, 'for', brand, model);
  
  // Preload all images
  useEffect(() => {
    if (images.length > 1) {
      const loadPromises = images.map((src, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            setImagesLoaded(prev => {
              const newLoaded = [...prev];
              newLoaded[index] = true;
              return newLoaded;
            });
            resolve();
          };
          img.onerror = () => resolve(); // Still resolve on error to avoid hanging
          img.src = src;
        });
      });
      
      Promise.all(loadPromises);
    }
  }, [images]);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage = images[currentImageIndex] || '/placeholder.svg';
  
  const getBadgeImage = (badge?: string) => {
    if (!badge) return null;
    const badgeLower = badge.toLowerCase();
    if (badgeLower.includes('b')) return dgtB;
    if (badgeLower.includes('c') && !badgeLower.includes('eco')) return dgtC;
    if (badgeLower.includes('0') || badgeLower.includes('cero')) return dgtCero;
    if (badgeLower.includes('eco')) return dgtEco;
    return null;
  };

  const badgeImage = getBadgeImage(environmentalBadge);
  
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link to={`/stock/${id}`} className="block h-full" onClick={handleClick}>
      <Card className="group overflow-hidden hover:shadow-luxury transition-all duration-300 hover:scale-[1.02] flex flex-col h-full cursor-pointer">
        <div className="relative overflow-hidden">
        {status === 'Reserved' && <ReservedBanner size="small" />}
        <img
          src={currentImage}
          alt={`${brand} ${model}`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          style={{ imageRendering: 'auto' }}
        />
        {images.length > 1 && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              size="icon" 
              variant="secondary" 
              className="h-8 w-8 bg-white/80 hover:bg-white/90"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft size={16} />
            </Button>
            <Button 
              size="icon" 
              variant="secondary" 
              className="h-8 w-8 bg-white/80 hover:bg-white/90"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        )}
        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
            {currentImageIndex + 1}/{images.length}
          </div>
        )}
      </div>
      
      <CardContent className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg text-foreground">{brand} {model}</h3>
            <p className="text-muted-foreground text-sm">{year} • {translateVehicleAttribute('body_type', type)}</p>
          </div>
          <div className="text-right">
            <div className="bg-[#111] px-2 py-0.5 rounded inline-block">
              <p className="text-lg font-bold text-white">{formatPrice(price)}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-end justify-between gap-4 mb-4">
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground flex-1">
              <div>📏 {mileage.toLocaleString()}</div>
              <div>⛽ {translateVehicleAttribute('fuel', fuel)}</div>
              <div>⚙️ {translateVehicleAttribute('transmission', transmission)}</div>
              <div>📅 {year}</div>
            </div>
            {badgeImage && (
              <div className="flex-shrink-0">
                <img src={badgeImage} alt={`Badge ${environmentalBadge}`} className="w-12 h-12" />
              </div>
            )}
          </div>
          <Button
            className="w-full bg-gray-100 hover:bg-primary/15 text-foreground border border-gray-300"
            variant="secondary"
          >
            <Eye size={16} className="mr-2" />
            {t('common.view_details')}
          </Button>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
};

export default VehicleCard;