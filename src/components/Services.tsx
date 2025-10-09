import { Car, Shield, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      icon: Car,
      title: "Servicio VIP",
      description: "Nos encargamos de todo: recogida, entrega, limpieza y otras gestiones que necesites. Solo tendrás que preocuparte por ponerte al volante de tu nuevo vehículo."
    },
    {
      icon: Shield,
      title: "Garantía Plus (Ampliable a 3 años)",
      description: "Tu vehículo de ocasión con garantía de 12 meses (Ampliable a 3 años).",
      additionalInfo: "Para vehículos de todo tipo como: berlinas, coupés, descapotables, deportivos, SUV, 4×4, etc."
    },
    {
      icon: CreditCard,
      title: "Financiación disponible",
      description: "Trabajamos con los mejores bancos para ofrecerte opciones de financiación que se adapten a ti."
    }
  ];

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nuestros servicios en INFINIT Cars
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comercialización e importación de vehículos premium a la carta, de ocasión, seminuevos y Km0.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="text-center bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-scale overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gray-100 p-6 h-40 flex flex-col justify-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-primary" />
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
              Más información
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;