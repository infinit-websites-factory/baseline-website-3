import { Car, Shield, CreditCard, Truck, HeadphonesIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import heroImage from "@/assets/servicios-hero.png";
import servicios2Image from "@/assets/servicios-2.png";

const Services = () => {
  const { getCityName, t } = useLanguage();
  const cityName = getCityName();
  const mainServices = [
    {
      icon: Car,
      title: t('services_page.main_services.vip.title'),
      description: t('services_page.main_services.vip.description')
    },
    {
      icon: Shield,
      title: t('services_page.main_services.warranty.title'),
      description: t('services_page.main_services.warranty.description')
    },
    {
      icon: Truck,
      title: t('services_page.main_services.shipping.title'),
      description: t('services_page.main_services.shipping.description')
    },
    {
      icon: CreditCard,
      title: t('services_page.main_services.financing.title'),
      description: t('services_page.main_services.financing.description')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {t('services_page.hero.title')}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t('services_page.hero.subtitle')} {cityName}.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src={heroImage}
                alt={t('services_page.alt_texts.hero')}
                className="w-full max-w-lg h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {mainServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="text-center bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-scale overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative bg-gray-100 p-6">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-black" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {service.title}
                      </h3>
                    </div>
                    <div className="p-6">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {service.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sell Your Car Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t('services_page.sell_section.title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t('services_page.sell_section.description')}
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg"
                asChild
              >
                <a href="/sell">
                  {t('services_page.sell_section.button')}
                </a>
              </Button>
            </div>
            <div className="flex justify-center">
              <img
                src={servicios2Image}
                alt={t('services_page.alt_texts.sell')}
                className="w-full max-w-lg h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      <Footer />
    </div>
  );
};

export default Services;