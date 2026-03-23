import heroImg1 from "@/assets/img1.jpg";
import heroImg2 from "@/assets/img2.jpg";
import heroImg3 from "@/assets/img3.jpg";
import heroImg4 from "@/assets/img4.jpg";
import heroImg5 from "@/assets/img5.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight, Star, ShieldCheck, Truck } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import googleLogo from "@/assets/google-logo.png";

const heroImages = [heroImg1, heroImg2, heroImg3, heroImg4, heroImg5];

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { getCityName, t } = useLanguage();
  const cityName = getCityName();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/stock?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/stock');
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50/40 overflow-hidden">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.4]" style={{
        backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />

      {/* Decorative gradient blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[520px] py-16 lg:py-20">
          {/* Left: Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/15 rounded-full px-4 py-1.5">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs font-semibold">{t('hero.subtitle')} {cityName}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-[1.15] text-foreground">
              {t('hero.title')}
            </h1>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="w-full max-w-md">
              <div className="flex gap-0 rounded-xl overflow-hidden bg-white shadow-lg shadow-black/5 border border-gray-200">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder={t('search.placeholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white border-0 text-foreground placeholder:text-gray-400 h-12 pl-11 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <Button type="submit" className="rounded-none rounded-r-xl px-6 h-12">
                  {t('common.search')}
                </Button>
              </div>
            </form>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">4.4</span>
                <img src={googleLogo} alt="Google" className="w-4 h-4 opacity-60" />
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>{t('services.warranty.title')}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Truck className="w-4 h-4 text-primary" />
                <span>{t('services.vip.additional_info')}</span>
              </div>
            </div>
          </div>

          {/* Right: Image carousel */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/10 border border-white/80">
              {heroImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Vehicle"
                  className={`w-full h-[380px] object-cover transition-opacity duration-700 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                />
              ))}

              {/* Carousel controls */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={prevSlide}
                  className="w-9 h-9 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-white transition-colors shadow-sm"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-9 h-9 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-white transition-colors shadow-sm"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Slide indicators */}
              <div className="absolute bottom-4 left-4 flex gap-1.5">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "bg-white w-5" : "bg-white/50 w-1.5"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg shadow-black/5 border border-gray-100 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t('services.warranty.title')}</p>
                <p className="text-xs text-muted-foreground">{t('services.warranty.additional_info')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
