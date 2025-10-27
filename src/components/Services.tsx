import { Car, Shield, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Car,
      title: t('services.vip.title'),
      description: t('services.vip.description'),
      additionalInfo: t('services.vip.additional_info')
    },
    {
      icon: Shield,
      title: t('services.warranty.title'),
      description: t('services.warranty.description'),
      additionalInfo: t('services.warranty.additional_info')
    },
    {
      icon: CreditCard,
      title: t('services.financing.title'),
      description: t('services.financing.description')
    }
  ];

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground mx-auto whitespace-nowrap">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="text-center bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-scale overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative bg-gray-100 p-6 h-40 flex flex-col justify-center">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground text-center leading-tight">
                      {service.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                      {service.description}
                    </p>
                    {service.additionalInfo && (
                      <p className="text-sm text-muted-foreground italic">
                        {service.additionalInfo}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg"
          >
            <a href="/services">
              {t('common.more_information')}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;