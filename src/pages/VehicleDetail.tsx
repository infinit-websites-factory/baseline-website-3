import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Share2, MapPin, Phone, Calendar, Mail, User, X } from "lucide-react";
import { fetchCars, transformApiCarToVehicle, type Vehicle, CONTACT_FORM_API_URL, PROFILE_ID } from "@/services/carsApi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { useToast } from "@/hooks/use-toast";
import dgtB from "@/assets/dgt-b.png";
import dgtC from "@/assets/dgt-c.png";
import dgtCero from "@/assets/dgt-cero.png";
import dgtEco from "@/assets/dgt-eco.png";
const VehicleDetail = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const { toast: toastHook } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [openPrivacyModal, setOpenPrivacyModal] = useState(false);
  const [isSubmittingAppointment, setIsSubmittingAppointment] = useState(false);
  const [isSubmittingReservation, setIsSubmittingReservation] = useState(false);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  // Form data states
  const [appointmentFormData, setAppointmentFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    fecha: "",
    hora: "",
    mensaje: "",
    acceptTerms: false
  });

  const [reservationFormData, setReservationFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    mensaje: "",
    acceptTerms: false
  });

  const [contactFormData, setContactFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    mensaje: ""
  });
  const {
    data: carsData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['cars'],
    queryFn: fetchCars,
    staleTime: 5 * 60 * 1000,
    retry: 2
  });
  const vehicle: Vehicle | undefined = carsData ? transformApiCarToVehicle(carsData.find(car => car.id === id)!) : undefined;
  useEffect(() => {
    if (!isLoading && !vehicle) {
      navigate('/stock');
    }
  }, [vehicle, isLoading, navigate]);
  if (isLoading || !vehicle) {
    return <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-video bg-muted rounded"></div>
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded w-2/3"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-10 bg-muted rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % vehicle.images.length);
  };
  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + vehicle.images.length) % vehicle.images.length);
  };
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  };
  const monthlyPayment = Math.round(vehicle.price / 84); // 84 months financing

  const getBadgeImage = (badge?: string) => {
    if (!badge) return null;
    const badgeLower = badge.toLowerCase();
    if (badgeLower.includes('b')) return dgtB;
    if (badgeLower.includes('c') && !badgeLower.includes('eco')) return dgtC;
    if (badgeLower.includes('0') || badgeLower.includes('cero')) return dgtCero;
    if (badgeLower.includes('eco')) return dgtEco;
    return null;
  };

  const badgeImage = getBadgeImage(vehicle.environmentalBadge);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Enlace copiado al portapapeles");
  };
  const handleReserve = () => {
    toast.success("¡Vehículo reservado! Nos pondremos en contacto contigo pronto.");
  };

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservationFormData.acceptTerms) {
      toastHook({
        title: "Error",
        description: "Debes aceptar la política de privacidad",
        variant: "destructive"
      });
      return;
    }

    setIsSubmittingReservation(true);

    try {
      const payload = {
        profile_id: PROFILE_ID,
        lead_firstname: reservationFormData.nombre,
        lead_lastname: reservationFormData.apellido,
        lead_phone_number: reservationFormData.telefono,
        lead_email: reservationFormData.email,
        message: `RESERVA!\n${reservationFormData.mensaje}`
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

      toast.success("¡Reserva confirmada! Nos pondremos en contacto contigo pronto.");
      setIsReservationModalOpen(false);
      setReservationFormData({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        mensaje: "",
        acceptTerms: false
      });
    } catch (error) {
      console.error('Error submitting reservation:', error);
      toastHook({
        title: "Error",
        description: "Hubo un problema al enviar la reserva. Por favor, inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingReservation(false);
    }
  };

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointmentFormData.acceptTerms) {
      toastHook({
        title: "Error",
        description: "Debes aceptar la política de privacidad",
        variant: "destructive"
      });
      return;
    }

    setIsSubmittingAppointment(true);

    try {
      // Format date from YYYY-MM-DD to DD/MM/YYYY
      const [year, month, day] = appointmentFormData.fecha.split('-');
      const formattedDate = `${day}/${month}/${year}`;

      const payload = {
        profile_id: PROFILE_ID,
        lead_firstname: appointmentFormData.nombre,
        lead_lastname: appointmentFormData.apellido,
        lead_phone_number: appointmentFormData.telefono,
        lead_email: appointmentFormData.email,
        message: `CITA - ${formattedDate} ${appointmentFormData.hora}\n${appointmentFormData.mensaje}`
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

      toast.success("¡Cita agendada! Nos pondremos en contacto contigo pronto.");
      setIsAppointmentModalOpen(false);
      setAppointmentFormData({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        fecha: "",
        hora: "",
        mensaje: "",
        acceptTerms: false
      });
    } catch (error) {
      console.error('Error submitting appointment:', error);
      toastHook({
        title: "Error",
        description: "Hubo un problema al agendar la cita. Por favor, inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingAppointment(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmittingContact(true);

    try {
      const payload = {
        profile_id: PROFILE_ID,
        lead_firstname: contactFormData.nombre,
        lead_lastname: contactFormData.apellido,
        lead_phone_number: contactFormData.telefono,
        lead_email: contactFormData.email,
        message: contactFormData.mensaje
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

      setIsContactSubmitted(true);
      setContactFormData({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        mensaje: ""
      });
    } catch (error) {
      console.error('Error submitting contact:', error);
      toastHook({
        title: "Error",
        description: "Hubo un problema al enviar la consulta. Por favor, inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingContact(false);
    }
  };
  return <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/stock')} className="p-0 h-auto text-muted-foreground hover:text-muted-foreground hover:bg-transparent">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Volver al stock
          </Button>
        </nav>

        {/* Vehicle Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {vehicle.brand} {vehicle.model}
            </h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary">{vehicle.year}</Badge>
              <Badge variant="secondary">{vehicle.transmission}</Badge>
              <Badge variant="secondary">{vehicle.fuel}</Badge>
              <Badge variant="secondary">{vehicle.mileage.toLocaleString()} km</Badge>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleShare} className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Compartir
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted group">
              <img src={vehicle.images[currentImageIndex]} alt={`${vehicle.brand} ${vehicle.model}`} className="w-full h-full object-cover" />
              
              {vehicle.images.length > 1 && <>
                  <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {currentImageIndex + 1} / {vehicle.images.length}
                  </div>
                </>}
            </div>

            {/* Thumbnail Navigation */}
            {vehicle.images.length > 1 && <div className="grid grid-cols-5 gap-2">
                {vehicle.images.slice(0, 5).map((image, index) => <button key={index} onClick={() => setCurrentImageIndex(index)} className={`aspect-video rounded overflow-hidden border-2 transition-colors ${currentImageIndex === index ? 'border-primary' : 'border-transparent hover:border-muted-foreground'}`}>
                    <img src={image} alt={`Vista ${index + 1}`} className="w-full h-full object-cover" />
                  </button>)}
              </div>}

            {/* Vehicle Description */}
            <Card>
              <CardHeader className="bg-muted">
                <CardTitle>Detalles</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3 text-sm">
                  <p><strong>{vehicle.brand} {vehicle.model}</strong></p>
                  <p>Financiación a tu medida.</p>
                  <p>En precio de venta están incluidos 12 meses de garantía. (Ampliable a 3 años)</p>
                  <p>Gastos de transferencia y gestor 260€.</p>
                  <p>Aceptamos vehículo como parte de pago.</p>
                  <p>Entrega en toda España, consulte condiciones.</p>
                </div>
              </CardContent>
            </Card>

            {/* Basic Data */}
            <Card>
              <CardHeader className="bg-muted">
                <CardTitle>Especificaciones</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground mb-1">AÑO</div>
                    <div className="font-semibold">{vehicle.year}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">KILÓMETROS</div>
                    <div className="font-semibold">{vehicle.mileage.toLocaleString()} km</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">COMBUSTIBLE</div>
                    <div className="font-semibold">{vehicle.fuel.toUpperCase()}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">CAMBIO</div>
                    <div className="font-semibold">{vehicle.transmission.toUpperCase()}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">CARROCERÍA</div>
                    <div className="font-semibold">{vehicle.type.toUpperCase()}</div>
                  </div>
                  {vehicle.color && <div>
                      <div className="text-muted-foreground mb-1">COLOR</div>
                      <div className="font-semibold">{vehicle.color.toUpperCase()}</div>
                    </div>}
                  {vehicle.doors && <div>
                      <div className="text-muted-foreground mb-1">PUERTAS</div>
                      <div className="font-semibold">{vehicle.doors}</div>
                    </div>}
                  {vehicle.seats && <div>
                      <div className="text-muted-foreground mb-1">ASIENTOS</div>
                      <div className="font-semibold">{vehicle.seats}</div>
                    </div>}
                  {vehicle.engineSize && <div>
                      <div className="text-muted-foreground mb-1">CILINDRADA</div>
                      <div className="font-semibold">{vehicle.engineSize} cc</div>
                    </div>}
                  {vehicle.enginePower && <div>
                      <div className="text-muted-foreground mb-1">POTENCIA</div>
                      <div className="font-semibold">{vehicle.enginePower} CV</div>
                    </div>}
                  {badgeImage && <div>
                      <div className="text-muted-foreground mb-1">DISTINTIVO AMBIENTAL</div>
                      <div className="font-semibold">
                        <img src={badgeImage} alt={`Badge ${vehicle.environmentalBadge}`} className="w-12 h-12" />
                      </div>
                    </div>}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vehicle Information */}
          <div className="space-y-6 sticky top-8 self-start">
            {/* Pricing */}
            <div>
              <div className="text-sm text-muted-foreground mb-2">Precio</div>
              <div className="text-3xl font-bold text-primary mb-4">
                {formatPrice(vehicle.price)}
              </div>
            </div>

            {/* Reserve Button */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                  <span className="font-semibold">Reservar vehículo</span>
                </div>
                <p className="text-sm mb-4 opacity-90">
                  Reserva el vehículo para asegurarte de que no te lo quiten, y
                  nos pondremos en contacto contigo para ayudarte con todo el proceso de compra.
                </p>
                <Dialog open={isReservationModalOpen} onOpenChange={setIsReservationModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="w-full">
                      Reservar ahora
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-background">
                    <DialogHeader>
                      <DialogTitle className="text-lg font-semibold text-foreground">
                        Reservar {vehicle.brand} {vehicle.model}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleReservationSubmit} className="space-y-6 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="reservationName" className="text-gray-600">Nombre</Label>
                          <Input
                            id="reservationName"
                            placeholder="Nombre"
                            required
                            className="bg-gray-50 border-gray-200"
                            value={reservationFormData.nombre}
                            onChange={(e) => setReservationFormData({ ...reservationFormData, nombre: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reservationSurname" className="text-gray-600">Apellido</Label>
                          <Input
                            id="reservationSurname"
                            placeholder="Apellido"
                            required
                            className="bg-gray-50 border-gray-200"
                            value={reservationFormData.apellido}
                            onChange={(e) => setReservationFormData({ ...reservationFormData, apellido: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="reservationEmail" className="text-gray-600">Email</Label>
                          <Input
                            id="reservationEmail"
                            type="email"
                            placeholder="xxx@xxx.com"
                            required
                            className="bg-gray-50 border-gray-200"
                            value={reservationFormData.email}
                            onChange={(e) => setReservationFormData({ ...reservationFormData, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reservationPhone" className="text-gray-600">Teléfono</Label>
                          <div className="flex">
                            <div className="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md">
                              <span className="text-sm text-red-600 font-semibold">🇪🇸</span>
                            </div>
                            <Input
                              id="reservationPhone"
                              placeholder="666 666 666"
                              className="bg-gray-50 border-gray-200 rounded-l-none"
                              required
                              value={reservationFormData.telefono}
                              onChange={(e) => setReservationFormData({ ...reservationFormData, telefono: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reservationMessage" className="text-gray-600">Mensaje</Label>
                        <Textarea
                          id="reservationMessage"
                          placeholder={`Quiero reservar este ${vehicle.brand} ${vehicle.model}`}
                          className="min-h-[80px] resize-none bg-gray-50 border-gray-200"
                          required
                          rows={5}
                          value={reservationFormData.mensaje}
                          onChange={(e) => setReservationFormData({ ...reservationFormData, mensaje: e.target.value })}
                        />
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="reservationTerms"
                          required
                          className="mt-1"
                          checked={reservationFormData.acceptTerms}
                          onCheckedChange={(checked) => setReservationFormData({ ...reservationFormData, acceptTerms: checked as boolean })}
                        />
                        <Label htmlFor="reservationTerms" className="text-sm text-gray-600">
                          Acepto las comunicaciones comerciales y de ofertas. Acepto la{" "}
                          <button type="button" onClick={() => setOpenPrivacyModal(true)} className="text-primary hover:text-primary/80 underline cursor-pointer">
                            política de privacidad
                          </button>.
                        </Label>
                      </div>

                      <Button type="submit" disabled={isSubmittingReservation} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3">
                        {isSubmittingReservation ? "Enviando..." : "Confirmar reserva"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <Button variant="outline" className="flex items-center gap-2" asChild>
                <a href="tel:690715080">
                  <Phone className="w-4 h-4" />
                  Llamar ahora
                </a>
              </Button>
              <Dialog open={isAppointmentModalOpen} onOpenChange={setIsAppointmentModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Agendar cita
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-background">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-foreground">
                      Reserva tu cita en Acierto Cars
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAppointmentSubmit} className="space-y-6 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="appointmentName" className="text-gray-600">Nombre</Label>
                        <Input
                          id="appointmentName"
                          placeholder="Nombre"
                          required
                          className="bg-gray-50 border-gray-200"
                          value={appointmentFormData.nombre}
                          onChange={(e) => setAppointmentFormData({ ...appointmentFormData, nombre: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="appointmentSurname" className="text-gray-600">Apellido</Label>
                        <Input
                          id="appointmentSurname"
                          placeholder="Apellido"
                          required
                          className="bg-gray-50 border-gray-200"
                          value={appointmentFormData.apellido}
                          onChange={(e) => setAppointmentFormData({ ...appointmentFormData, apellido: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="appointmentEmail" className="text-gray-600">Email</Label>
                        <Input
                          id="appointmentEmail"
                          type="email"
                          placeholder="xxx@xxx.com"
                          required
                          className="bg-gray-50 border-gray-200"
                          value={appointmentFormData.email}
                          onChange={(e) => setAppointmentFormData({ ...appointmentFormData, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="appointmentPhone" className="text-gray-600">Teléfono</Label>
                        <div className="flex">
                          <div className="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md">
                            <span className="text-sm text-red-600 font-semibold">🇪🇸</span>
                          </div>
                          <Input
                            id="appointmentPhone"
                            placeholder="666 666 666"
                            className="bg-gray-50 border-gray-200 rounded-l-none"
                            required
                            value={appointmentFormData.telefono}
                            onChange={(e) => setAppointmentFormData({ ...appointmentFormData, telefono: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="appointmentDate" className="text-gray-600">Fecha de la cita</Label>
                        <Input
                          id="appointmentDate"
                          type="date"
                          required
                          className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500"
                          value={appointmentFormData.fecha}
                          onChange={(e) => setAppointmentFormData({ ...appointmentFormData, fecha: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="appointmentTime" className="text-gray-600">Hora</Label>
                        <Select
                          required
                          value={appointmentFormData.hora}
                          onValueChange={(value) => setAppointmentFormData({ ...appointmentFormData, hora: value })}
                        >
                          <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900 data-[placeholder]:text-gray-500">
                            <SelectValue placeholder="Selecciona una hora" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="09:00">09:00</SelectItem>
                            <SelectItem value="09:30">09:30</SelectItem>
                            <SelectItem value="10:00">10:00</SelectItem>
                            <SelectItem value="10:30">10:30</SelectItem>
                            <SelectItem value="11:00">11:00</SelectItem>
                            <SelectItem value="11:30">11:30</SelectItem>
                            <SelectItem value="12:00">12:00</SelectItem>
                            <SelectItem value="12:30">12:30</SelectItem>
                            <SelectItem value="16:00">16:00</SelectItem>
                            <SelectItem value="16:30">16:30</SelectItem>
                            <SelectItem value="17:00">17:00</SelectItem>
                            <SelectItem value="17:30">17:30</SelectItem>
                            <SelectItem value="18:00">18:00</SelectItem>
                            <SelectItem value="18:30">18:30</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="appointmentMessage" className="text-gray-600">Mensaje</Label>
                      <Textarea
                        id="appointmentMessage"
                        placeholder={`Estoy interesado en ${vehicle.brand} ${vehicle.model}`}
                        className="min-h-[80px] resize-none bg-gray-50 border-gray-200"
                        required
                        rows={5}
                        value={appointmentFormData.mensaje}
                        onChange={(e) => setAppointmentFormData({ ...appointmentFormData, mensaje: e.target.value })}
                      />
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="appointmentTerms"
                        required
                        className="mt-1"
                        checked={appointmentFormData.acceptTerms}
                        onCheckedChange={(checked) => setAppointmentFormData({ ...appointmentFormData, acceptTerms: checked as boolean })}
                      />
                      <Label htmlFor="appointmentTerms" className="text-sm text-gray-600">
                        Acepto las comunicaciones comerciales y de ofertas. Acepto la{" "}
                        <button type="button" onClick={() => setOpenPrivacyModal(true)} className="text-primary hover:text-primary/80 underline cursor-pointer">
                          política de privacidad
                        </button>.
                      </Label>
                    </div>

                    <Button type="submit" disabled={isSubmittingAppointment} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3">
                      {isSubmittingAppointment ? "Enviando..." : "Enviar"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Quiero más información de este coche
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isContactSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      ¡Mensaje enviado con éxito!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Gracias por tu interés. Nos pondremos en contacto contigo pronto.
                    </p>
                    <Button
                      onClick={() => {
                        setIsContactSubmitted(false);
                      }}
                      variant="outline"
                    >
                      Enviar otro mensaje
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="name"
                        placeholder="Nombre"
                        required
                        value={contactFormData.nombre}
                        onChange={(e) => setContactFormData({ ...contactFormData, nombre: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="surname">Apellido</Label>
                      <Input
                        id="surname"
                        placeholder="Apellido"
                        required
                        value={contactFormData.apellido}
                        onChange={(e) => setContactFormData({ ...contactFormData, apellido: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@gmail.com"
                        required
                        value={contactFormData.email}
                        onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Teléfono</Label>
                      <div className="flex">
                        <div className="flex items-center px-3 border border-r-0 border-input rounded-l-md bg-muted text-sm whitespace-nowrap">
                          🇪🇸 +34
                        </div>
                        <Input
                          id="phone"
                          placeholder="666 666 666"
                          className="rounded-l-none"
                          required
                          value={contactFormData.telefono}
                          onChange={(e) => setContactFormData({ ...contactFormData, telefono: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="message">Mensaje</Label>
                      <Textarea
                        id="message"
                        placeholder={`Estoy interesado en ${vehicle.brand} ${vehicle.model}`}
                        className="min-h-[80px]"
                        required
                        value={contactFormData.mensaje}
                        onChange={(e) => setContactFormData({ ...contactFormData, mensaje: e.target.value })}
                      />
                    </div>
                    <Button type="submit" disabled={isSubmittingContact} className="w-full">
                      {isSubmittingContact ? "Enviando..." : "Enviar consulta"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>


        {/* Trade-in Offer */}
        
      </main>

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
    </div>;
};
export default VehicleDetail;