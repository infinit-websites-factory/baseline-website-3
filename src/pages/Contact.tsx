import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import contactBackground from "@/assets/contact.png";
import { useToast } from "@/hooks/use-toast";
import { CONTACT_FORM_API_URL, PROFILE_ID } from "@/services/carsApi";

const Contact = () => {
  const { toast } = useToast();
  const [openPrivacyModal, setOpenPrivacyModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    mensaje: "",
    acceptMarketing: false,
    acceptPrivacy: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptMarketing) {
      toast({
        title: "Error",
        description: "Debes aceptar la política de privacidad",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        profile_id: PROFILE_ID,
        lead_firstname: formData.nombre,
        lead_lastname: formData.apellido,
        lead_phone_number: formData.telefono,
        lead_email: formData.email,
        message: formData.mensaje
      };

      const response = await fetch(CONTACT_FORM_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Llámanos",
      description: "Estamos disponible en el siguiente teléfono:",
      contact: "690715080",
      href: "tel:690715080"
    },
    {
      icon: Mail,
      title: "Escríbenos",
      description: "No dudes en contactar con nosotros en el siguiente correo o si lo prefieres, puedes rellenar el anterior formulario.",
      contact: "contacto@aciertocars.com",
      href: "mailto:contacto@aciertocars.com"
    },
    {
      icon: MapPin,
      title: "Ven a visitarnos",
      description: "Encuéntranos en Calle Rio Tormes, 83, 28110 Algete, Madrid",
      contact: "Calle Rio Tormes, 83, 28110 Algete, Madrid",
      href: "https://www.google.com/maps/place//data=!4m2!3m1!1s0xd43ccc764e50acb:0x9f466d7bde5e0e58?sa=X&ved=1t:8290&ictx=111"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Form */}
      <div 
        className="bg-gray-700 pt-24"
        style={{
          backgroundImage: `url(${contactBackground})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }}
      >
        <div className="px-4 lg:pt-12 pt-6 pb-32 lg:pb-40 mx-auto max-w-screen-sm text-center lg:px-6">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">
            Contacta con nosotros
          </h2>
          <p className="mb-8 font-light text-white sm:text-xl pb-5 md:pb-0">
            Para cualquier información sobre nosotros o culquier vehículo no dude en contactarnos
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="py-8 px-4 bg-background">
        <div className="container mx-auto max-w-2xl">
          <Card className="bg-white shadow-xl border-0 -mt-48 relative z-10">
            <CardContent className="p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    ¡Mensaje enviado con éxito!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Gracias por contactarnos. Nos pondremos en contacto contigo pronto.
                  </p>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        nombre: "",
                        apellido: "",
                        email: "",
                        telefono: "",
                        mensaje: "",
                        acceptMarketing: false,
                        acceptPrivacy: false
                      });
                    }}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre" className="text-gray-600">Nombre</Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-50 border-gray-200"
                        placeholder="Nombre"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apellido" className="text-gray-600">Apellido</Label>
                      <Input
                        id="apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-50 border-gray-200"
                        placeholder="Apellidos"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-600">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-50 border-gray-200"
                        placeholder="email@ejemplo.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono" className="text-gray-600">Teléfono</Label>
                      <div className="flex">
                        <div className="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md">
                          <span className="text-sm text-red-600 font-semibold">🇪🇸</span>
                        </div>
                        <Input
                          id="telefono"
                          name="telefono"
                          type="tel"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          required
                          className="bg-gray-50 border-gray-200 rounded-l-none"
                          placeholder="600 000 000"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensaje" className="text-gray-600">Mensaje</Label>
                    <Textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      placeholder="Escribe tu mensaje aquí..."
                      className="bg-gray-50 border-gray-200"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="acceptMarketing"
                        checked={formData.acceptMarketing}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, acceptMarketing: checked as boolean })
                        }
                      />
                      <Label htmlFor="acceptMarketing" className="text-sm text-gray-600">
                        Acepto las comunicaciones comerciales y de ofertas. Acepto la{" "}
                        <button 
                          type="button"
                          onClick={() => setOpenPrivacyModal(true)}
                          className="text-primary hover:text-primary/80 underline"
                        >
                          política de privacidad
                        </button>.
                      </Label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card key={index} className="text-center bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gray-100 p-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {info.title}
                      </h3>
                    </div>
                    <div className="p-6">
                      <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                        {info.description}
                      </p>
                      <a 
                        href={info.href}
                        className="text-primary hover:text-primary/80 font-semibold transition-colors text-lg"
                        target={info.icon === MapPin ? "_blank" : undefined}
                        rel={info.icon === MapPin ? "noopener noreferrer" : undefined}
                      >
                        {info.contact}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Address Information */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-foreground">
                Nuestra ubicación
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Dirección
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Calle Rio Tormes, 83<br />
                      28110 Algete, Madrid<br />
                      España
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Horarios de atención
                    </h3>
                    <div className="space-y-1 text-muted-foreground">
                      <p>Lunes a Viernes: 10:00 - 14:00, 16:00 - 19:00</p>
                      <p>Sábado: Con cita previa</p>
                      <p>Domingo: Cerrado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="w-full">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12149.207471547842!2d-3.4993847!3d40.5969394!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd43ccc764e50acb%3A0x9f466d7bde5e0e58!2sAcierto%20Cars!5e0!3m2!1sen!2ses!4v1234567890123!5m2!1sen!2ses"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de Acierto Cars en Algete, Madrid"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      <Footer />

      {/* Privacy Policy Modal */}
      <Dialog open={openPrivacyModal} onOpenChange={setOpenPrivacyModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Política de Privacidad</DialogTitle>
          </DialogHeader>
          <div className="mt-4 text-sm text-muted-foreground">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">2.1 Responsable del Tratamiento de Datos</h3>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p><strong>Nombre de la empresa:</strong> Acierto Cars Luxury S.L.U.</p>
                <p><strong>Dirección:</strong> Calle Río Tormes, nº 83, 28110, Algete</p>
                <p><strong>Correo electrónico:</strong> contacto@aciertocars.com</p>
                <p><strong>Teléfono:</strong> 690715080</p>
              </div>
              
              <h3 className="text-lg font-semibold">2.2 Datos que Recopilamos</h3>
              <p>Podemos recopilar los siguientes datos personales:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Nombre y apellidos</li>
                <li>CIF/NIF o número de identificación fiscal</li>
                <li>Correo electrónico y teléfono</li>
                <li>Dirección postal</li>
                <li>Datos de navegación mediante cookies (ver nuestra Política de Cookies)</li>
              </ul>
              
              <h3 className="text-lg font-semibold">2.3 Finalidad del Tratamiento</h3>
              <p>Usamos sus datos para:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Gestionar la compra y venta de vehículos</li>
                <li>Gestionar garantías, seguros y financiación</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
              
              <h3 className="text-lg font-semibold">2.4 Derechos del Usuario</h3>
              <p>Tiene derecho a acceder, rectificar, suprimir o limitar el tratamiento de sus datos enviando un correo a: <strong>contacto@aciertocars.com</strong></p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;