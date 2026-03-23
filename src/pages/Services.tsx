import { Car, Shield, CreditCard, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
import servicios2Image from "@/assets/servicios-2.png";

const Services = () => {
  const { getCityName, t } = useLanguage();
  const cityName = getCityName();
  const mainServices = [
    {
      icon: Car,
      title: t('services_page.main_services.vip.title'),
      description: t('services_page.main_services.vip.description'),
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      icon: Shield,
      title: t('services_page.main_services.warranty.title'),
      description: t('services_page.main_services.warranty.description'),
      iconBg: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: Truck,
      title: t('services_page.main_services.shipping.title'),
      description: t('services_page.main_services.shipping.description'),
      iconBg: "bg-amber-50 text-amber-600",
    },
    {
      icon: CreditCard,
      title: t('services_page.main_services.financing.title'),
      description: t('services_page.main_services.financing.description'),
      iconBg: "bg-violet-50 text-violet-600",
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO page="services" />
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('services_page.hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('services_page.hero.subtitle')} {cityName}.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-xl border border-gray-100 shadow-sm p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                  <div className={`w-14 h-14 rounded-xl ${service.iconBg} flex items-center justify-center mb-5`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sell Your Car Section */}
      <section className="bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
            <div className="relative h-[300px] lg:h-auto overflow-hidden">
              <img
                src={servicios2Image}
                alt={t('services_page.alt_texts.sell')}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center bg-gray-50">
              <div className="px-8 py-16 lg:px-16 lg:py-20 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-primary text-sm font-medium">
                  <Car className="w-4 h-4" />
                  <span>{t('services_page.sell_section.title')}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  {t('services_page.sell_section.title')}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('services_page.sell_section.description')}
                </p>
                <Button size="lg" className="gap-2" asChild>
                  <a href="/sell">
                    {t('services_page.sell_section.button')}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
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
