import { Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import googleLogo from "@/assets/google-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { useMemo } from "react";

const OVERALL_RATING = 4.4;
const TOTAL_REVIEWS = 47;

const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.min(1, Math.max(0, rating - (star - 1)));
        return (
          <div key={star} className="relative">
            <Star className={`${sizeClasses[size]} text-gray-200`} />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className={`${sizeClasses[size]} fill-amber-400 text-amber-400`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const GoogleReviews = () => {
  const { t, language } = useLanguage();

  const reviews = useMemo(() => {
    return translations[language].reviews.testimonials;
  }, [language]);

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {t('reviews.title')}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-8">
            {t('reviews.subtitle')}
          </p>

          {/* Google Rating Badge */}
          <div className="inline-flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-xl px-6 py-4">
            <img src={googleLogo} alt="Google" className="w-8 h-8" />
            <div className="w-px h-10 bg-gray-200" />
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-foreground">{OVERALL_RATING}</span>
                <StarRating rating={OVERALL_RATING} size="lg" />
              </div>
              <span className="text-muted-foreground text-sm">
                {t('reviews.based_on')} {TOTAL_REVIEWS} {t('reviews.reviews_count')}
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {reviews.map((review, index) => (
                <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="h-full bg-gray-50 border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                    {/* Review Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-semibold text-sm">
                            {review.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">{review.name}</h3>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <img src={googleLogo} alt="" className="w-5 h-5 opacity-50" />
                    </div>

                    {/* Stars */}
                    <div className="mb-3">
                      <StarRating rating={review.rating} size="sm" />
                    </div>

                    {/* Review Text */}
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
                      {review.review}
                    </p>

                    {/* Bottom tag */}
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-green-500 fill-current">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                        <span className="text-xs text-muted-foreground">{t('reviews.google_review')}</span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white border border-gray-200 text-foreground hover:bg-gray-50 w-10 h-10 shadow-sm" />
            <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white border border-gray-200 text-foreground hover:bg-gray-50 w-10 h-10 shadow-sm" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
