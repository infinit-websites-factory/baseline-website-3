import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Me gusta un coche, ¿Cómo lo puedo reservar?",
      answer: "Selecciona el vehículo que te gusta, pulsa en el botón \"Reservar Vehículo\" y sigue los pasos. ¡Más sencillo que comprarse unos zapatos!"
    },
    {
      question: "¿Qué cubren las garantías de nuestros vehículos?",
      answer: "La garantía que ofrecemos es de 1 año respetando la legislación actual. Además, ofrecemos la posibilidad de contratar una ampliación de coberturas de hasta 3 años."
    },
    {
      question: "¿Cuál es nuestro horario?",
      answer: "Estamos abiertos todo el año de Lunes a Viernes de 10:00 a 14:00 y de 16:00 a 19:00. Los Sábados atendemos con cita previa y los Domingos permanecemos cerrados."
    },
    {
      question: "¿Qué control de calidad pasan nuestros vehículos?",
      answer: "En INFINIT Cars, cada vehículo es sometido a un exhaustivo control de calidad para garantizar su fiabilidad y seguridad. Este proceso incluye: Inspección Mecánica Completa, Revisión Estética y Funcional, Pruebas de Rendimiento en Carretera y Control de Calidad Final."
    },
    {
      question: "¿Aceptáis vehículos como parte de pago?",
      answer: "Sí, en INFINIT Cars aceptamos vehículos como parte de pago. Para decidir si aceptamos un vehículo o no, realizamos una evaluación detallada del coche que se ofrece en parte de pago, considerando factores como el año, el kilometraje, el estado general y el historial de mantenimiento, asegurando así un acuerdo justo y transparente para ambas partes. Te invitamos a visitar nuestro concesionario con tu vehículo actual para una valoración sin compromiso y discutir las opciones disponibles para ti."
    }
  ];

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Resolvemos las dudas más comunes sobre nuestros servicios
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-border rounded-lg px-6 bg-card"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2 pb-4 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;