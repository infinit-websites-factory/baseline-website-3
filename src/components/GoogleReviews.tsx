import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import googleLogo from "@/assets/google-logo.jpeg";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { useMemo } from "react";

const GoogleReviews = () => {
  const { t, language } = useLanguage();

  const reviews = useMemo(() => {
    return translations[language].reviews.testimonials;
  }, [language]);

  return (
    <section className="py-16 px-4 bg-muted">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t('reviews.title')}
          </h2>
          
          {/* Google Rating Display */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <img
                src={googleLogo}
                alt="Google"
                className="w-6 h-6"
              />
              <div className="w-px h-6 bg-border"></div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-foreground">4.9</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {reviews.map((review, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
                  <Card className="border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover-scale h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-semibold text-sm">
                            {review.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{review.name}</h3>
                          <div className="flex items-center gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        "{review.review}"
                      </p>
                      <p className="text-xs text-muted-foreground mt-3 font-medium">
                        {t('reviews.google_review')}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-background border-border shadow-md hover:bg-accent" />
            <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-background border-border shadow-md hover:bg-accent" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;