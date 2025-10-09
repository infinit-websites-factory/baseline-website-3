import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CONTACT_FORM_API_URL, PROFILE_ID } from "@/services/carsApi";

const Sell = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [openPrivacyModal, setOpenPrivacyModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    tipoVehiculo: "turismo",
    marca: "",
    modelo: "",
    ano: "",
    carroceria: "",
    color: "",
    combustible: "",
    tipoCambio: "",
    version: "",
    kilometraje: "",
    matricula: "",
    cuandoVender: "",
    interesIntercambio: "",
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    acceptPrivacy: false
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  // Vehicle type specific marca lists
  const marcasTurismo = [
    "Abarth", "Aiways", "Aixam", "Alfa Romeo", "Alpine", "Aro", "Asia", "Aston Martin", "Audi",
    "Baic", "Bentley", "Bestune", "BMW", "BYD", "Cadillac", "Chevrolet", "Chrysler", "Citroën",
    "Corvette", "CUPRA", "Dacia", "Daewoo", "Daihatsu", "Daimler", "Dodge", "Dongfeng", "DR AUTOMOBILES",
    "DS", "DFSK", "EBRO", "EVO", "Ferrari", "Fiat", "Fisker", "Ford", "Galloper", "Honda", "HONGQI",
    "HUMMER", "Hyundai", "Ineos", "Infiniti", "Innocenti", "Isuzu", "Iveco", "JAECOO", "Jaguar",
    "Jeep", "Kia", "KIA", "KGM", "Lada", "Lamborghini", "Lancia", "Land Rover", "Leapmotor", "Lexus",
    "Ligier", "Livan", "Lotus", "Lynk & Co", "Mahindra", "Maserati", "Maybach", "Mazda", "MCC",
    "McLaren", "Mercedes", "Mercedes-Benz", "MG", "MHero", "Micro", "MINI", "Mitsubishi", "Morgan",
    "MAXUS", "Nissan", "OMODA", "Opel", "Peugeot", "Pilote", "Polestar", "Pontiac", "Porsche",
    "Renault", "Rolls-Royce", "Rover", "Saab", "Santana", "SEAT", "SERES", "Skoda", "Skywell",
    "smart", "Smart", "SsangYong", "Subaru", "Suzuki", "SWM", "TATA", "Tesla", "Toyota", "UMM",
    "VAZ", "Volkswagen", "Volvo", "Voyah", "Weinsberg", "Xpeng", "Yooudooo", "Yudo", "Zhidou"
  ];

  const marcasIndustrial = [
    "Baic", "BYD", "Cenntro", "Citroën", "Dacia", "Daewoo", "DAF", "Daihatsu", "DFSK", "DR AUTOMOBILES",
    "DSK", "EVO", "EVUM", "Farizon", "Fiat", "Ford", "Foton", "Hyundai", "Ineos", "Isuzu", "Iveco",
    "Jeep", "KGM", "KIA", "Lada", "Land Rover", "LDV", "LEVC", "Ligier", "Livan", "Mahindra", "MAN",
    "MAXUS", "Mazda", "Mercedes", "Mercedes-Benz", "Mitsubishi", "Mitsubishi Fuso", "MW Motors",
    "Nextem", "Nissan", "Opel", "Peugeot", "Piaggio", "RAM", "Renault", "Renault Trucks", "SaIC",
    "SAIC MAXUS", "Santana", "Scania", "SEAT", "Skoda", "SsangYong", "Suzuki", "TATA", "Toyota",
    "UMM", "Volkswagen", "Volvo"
  ];

  // Generate years from 2025 down to 2000
  const years = Array.from({ length: 26 }, (_, i) => (2025 - i).toString());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Reset marca when vehicle type changes
    if (field === "tipoVehiculo") {
      setFormData({ ...formData, [field]: value, marca: "" });
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    // Validate all required Step 1 fields
    if (!formData.marca) {
      newErrors.marca = "Campo obligatorio";
    }
    if (!formData.ano) {
      newErrors.ano = "Campo obligatorio";
    }
    if (!formData.combustible) {
      newErrors.combustible = "Campo obligatorio";
    }
    if (!formData.tipoCambio) {
      newErrors.tipoCambio = "Campo obligatorio";
    }
    if (formData.tipoVehiculo === "turismo" && !formData.carroceria) {
      newErrors.carroceria = "Campo obligatorio";
    }

    setErrors(newErrors);

    // If there are errors, don't proceed
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    // Validate Step 2 fields
    if (!formData.cuandoVender) {
      newErrors.cuandoVender = "Campo obligatorio";
    }
    if (!formData.interesIntercambio) {
      newErrors.interesIntercambio = "Campo obligatorio";
    }

    setErrors(newErrors);

    // Check privacy acceptance
    if (!formData.acceptPrivacy) {
      toast({
        title: "Error",
        description: "Debes aceptar la política de privacidad",
        variant: "destructive"
      });
      return;
    }

    // If there are errors, don't proceed
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Build the message
      const tipoVehiculoLabel = formData.tipoVehiculo === "turismo" ? "Turismo" : "Industrial";
      const cuandoVenderLabels: Record<string, string> = {
        "lo-antes-posible": "Lo antes posible",
        "4-semanas": "En las próximas 4 semanas",
        "4-meses": "En los próximos 4 meses",
        "no-decidido": "Aún no lo he decidido"
      };
      const interesIntercambioLabel = formData.interesIntercambio === "si" ? "Sí" : "No";

      let message = `SOLICITUD DE TASACIÓN

=== DATOS DEL VEHÍCULO ===
Tipo: ${tipoVehiculoLabel}
Marca: ${formData.marca}
Modelo: ${formData.modelo}
Versión: ${formData.version}
Año: ${formData.ano}`;

      if (formData.tipoVehiculo === "turismo" && formData.carroceria) {
        message += `\nCarrocería: ${formData.carroceria.charAt(0).toUpperCase() + formData.carroceria.slice(1)}`;
      }

      message += `
Color: ${formData.color}
Combustible: ${formData.combustible.charAt(0).toUpperCase() + formData.combustible.slice(1)}
Tipo de cambio: ${formData.tipoCambio.charAt(0).toUpperCase() + formData.tipoCambio.slice(1)}
Kilometraje: ${formData.kilometraje} km`;

      if (formData.matricula) {
        message += `\nMatrícula: ${formData.matricula}`;
      }

      message += `

=== INTENCIÓN DEL VENDEDOR ===
¿Cuándo planea vender?: ${cuandoVenderLabels[formData.cuandoVender]}
¿Interesado en comprar un coche a cambio?: ${interesIntercambioLabel}`;

      const payload = {
        profile_id: PROFILE_ID,
        lead_firstname: formData.nombre,
        lead_lastname: formData.apellido,
        lead_phone_number: formData.telefono,
        lead_email: formData.email,
        message: message
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

      setCurrentStep(3);
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
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with Form */}
        <section className="py-16 px-4 bg-muted">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              {/* Left side - Title, subtitle, and benefits */}
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                    Tasa y vende fácilmente
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Consigue la mejor oferta del mercado.
                  </p>
                </div>

                {/* Benefits checklist */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1">Mejor precio</h3>
                      <p className="text-muted-foreground">Te ofrecemos la mejor valoración del mercado</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1">Proceso rápido</h3>
                      <p className="text-muted-foreground">Valoración en 24 horas</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1">Sin compromiso</h3>
                      <p className="text-muted-foreground">Valoración gratuita y sin obligación</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1">Cualquier vehículo</h3>
                      <p className="text-muted-foreground">Compramos todo tipo de vehículos</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Form */}
              <div className="lg:col-span-3">
                <Card className="bg-white shadow-xl border-0">
                  <CardHeader className="space-y-4">
                    {currentStep === 1 && (
                      <div className="space-y-2">
                        <CardTitle className="text-2xl text-primary">Consigue tu tasación</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Completa los detalles de tu vehículo
                        </p>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-2">
                        <CardTitle className="text-2xl text-primary">Consigue tu tasación</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Completa tus datos
                        </p>
                      </div>
                    )}

                    {currentStep === 3 && null}
                  </CardHeader>
                
                <CardContent>
                  {/* Step 1: Vehicle Details */}
                  {currentStep === 1 && (
                    <form onSubmit={handleNext} className="space-y-6">
                      <div className="space-y-6 animate-fade-in">
                        {/* Vehicle Type Toggle Buttons */}
                        <div className="space-y-2">
                          <Label className="text-gray-600">Tipo de vehículo *</Label>
                          <div className="grid grid-cols-2 gap-3">
                            <Button
                              type="button"
                              variant="outline"
                              className={`h-10 ${formData.tipoVehiculo === "turismo" ? "bg-gray-100 hover:bg-gray-100 hover:text-foreground border-gray-300 text-foreground" : "bg-white hover:bg-gray-50 hover:text-foreground border-gray-200 text-foreground"}`}
                              onClick={() => handleSelectChange("tipoVehiculo", "turismo")}
                            >
                              Turismo
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              className={`h-10 ${formData.tipoVehiculo === "industrial" ? "bg-gray-100 hover:bg-gray-100 hover:text-foreground border-gray-300 text-foreground" : "bg-white hover:bg-gray-50 hover:text-foreground border-gray-200 text-foreground"}`}
                              onClick={() => handleSelectChange("tipoVehiculo", "industrial")}
                            >
                              Industrial
                            </Button>
                          </div>
                        </div>

                        {/* Marca - Modelo */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="marca" className="text-gray-600">Marca *</Label>
                            <Select
                              value={formData.marca}
                              onValueChange={(value) => {
                                handleSelectChange("marca", value);
                                setErrors({ ...errors, marca: "" });
                              }}
                              required
                              disabled={!formData.tipoVehiculo}
                            >
                              <SelectTrigger className={`bg-gray-50 data-[placeholder]:text-muted-foreground ${errors.marca ? "border-red-500" : "border-gray-200"}`}>
                                <SelectValue placeholder="Selecciona marca" />
                              </SelectTrigger>
                              <SelectContent>
                                {(formData.tipoVehiculo === "turismo" ? marcasTurismo : marcasIndustrial).map((marca) => (
                                  <SelectItem key={marca} value={marca}>{marca}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.marca && <p className="text-sm text-red-500">{errors.marca}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="modelo" className="text-gray-600">Modelo *</Label>
                            <Input
                              id="modelo"
                              placeholder="Ej: Focus, Corolla..."
                              value={formData.modelo}
                              onChange={handleInputChange}
                              required
                              className="bg-gray-50 border-gray-200"
                            />
                          </div>
                        </div>

                        {/* Versión - Carrocería */}
                        {formData.tipoVehiculo === "turismo" ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="version" className="text-gray-600">Versión *</Label>
                              <Input
                                id="version"
                                placeholder="Ej: GTI, Sport..."
                                value={formData.version}
                                onChange={handleInputChange}
                                required
                                className="bg-gray-50 border-gray-200"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="carroceria" className="text-gray-600">Carrocería *</Label>
                              <Select
                                value={formData.carroceria}
                                onValueChange={(value) => {
                                  handleSelectChange("carroceria", value);
                                  setErrors({ ...errors, carroceria: "" });
                                }}
                                required
                              >
                                <SelectTrigger className={`bg-gray-50 data-[placeholder]:text-muted-foreground ${errors.carroceria ? "border-red-500" : "border-gray-200"}`}>
                                  <SelectValue placeholder="Selecciona carrocería" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="berlina">Berlina</SelectItem>
                                  <SelectItem value="coupe">Coupé</SelectItem>
                                  <SelectItem value="cabrio">Cabrio</SelectItem>
                                  <SelectItem value="familiar">Familiar</SelectItem>
                                  <SelectItem value="monovolumen">Monovolumen</SelectItem>
                                  <SelectItem value="suv">SUV</SelectItem>
                                  <SelectItem value="pickup">Pick Up</SelectItem>
                                  <SelectItem value="otro">Otro</SelectItem>
                                </SelectContent>
                              </Select>
                              {errors.carroceria && <p className="text-sm text-red-500">{errors.carroceria}</p>}
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Label htmlFor="version" className="text-gray-600">Versión *</Label>
                            <Input
                              id="version"
                              placeholder="Ej: GTI, Sport..."
                              value={formData.version}
                              onChange={handleInputChange}
                              required
                              className="bg-gray-50 border-gray-200"
                            />
                          </div>
                        )}

                        {/* Tipo de cambio - Combustible */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="tipoCambio" className="text-gray-600">Tipo de cambio *</Label>
                            <Select
                              value={formData.tipoCambio}
                              onValueChange={(value) => {
                                handleSelectChange("tipoCambio", value);
                                setErrors({ ...errors, tipoCambio: "" });
                              }}
                              required
                            >
                              <SelectTrigger className={`bg-gray-50 data-[placeholder]:text-muted-foreground ${errors.tipoCambio ? "border-red-500" : "border-gray-200"}`}>
                                <SelectValue placeholder="Selecciona tipo" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="manual">Manual</SelectItem>
                                <SelectItem value="automatico">Automático</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.tipoCambio && <p className="text-sm text-red-500">{errors.tipoCambio}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="combustible" className="text-gray-600">Combustible *</Label>
                            <Select
                              value={formData.combustible}
                              onValueChange={(value) => {
                                handleSelectChange("combustible", value);
                                setErrors({ ...errors, combustible: "" });
                              }}
                              required
                            >
                              <SelectTrigger className={`bg-gray-50 data-[placeholder]:text-muted-foreground ${errors.combustible ? "border-red-500" : "border-gray-200"}`}>
                                <SelectValue placeholder="Selecciona combustible" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="gasolina">Gasolina</SelectItem>
                                <SelectItem value="diesel">Diésel</SelectItem>
                                <SelectItem value="hibrido">Híbrido</SelectItem>
                                <SelectItem value="hibrido-enchufable">Híbrido Enchufable</SelectItem>
                                <SelectItem value="electrico">Eléctrico</SelectItem>
                                <SelectItem value="gas">Gas (GLP/GNC)</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.combustible && <p className="text-sm text-red-500">{errors.combustible}</p>}
                          </div>
                        </div>

                        {/* Año - Color */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="ano" className="text-gray-600">Año *</Label>
                            <Select
                              value={formData.ano}
                              onValueChange={(value) => {
                                handleSelectChange("ano", value);
                                setErrors({ ...errors, ano: "" });
                              }}
                              required
                            >
                              <SelectTrigger className={`bg-gray-50 data-[placeholder]:text-muted-foreground ${errors.ano ? "border-red-500" : "border-gray-200"}`}>
                                <SelectValue placeholder="Selecciona año" />
                              </SelectTrigger>
                              <SelectContent>
                                {years.map((year) => (
                                  <SelectItem key={year} value={year}>{year}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.ano && <p className="text-sm text-red-500">{errors.ano}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="color" className="text-gray-600">Color *</Label>
                            <Input
                              id="color"
                              placeholder="Ej: Blanco, Negro..."
                              value={formData.color}
                              onChange={handleInputChange}
                              required
                              className="bg-gray-50 border-gray-200"
                            />
                          </div>
                        </div>

                        {/* Kilometraje - Matrícula */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="kilometraje" className="text-gray-600">Kilometraje *</Label>
                            <Input
                              id="kilometraje"
                              type="number"
                              placeholder="50000"
                              value={formData.kilometraje}
                              onChange={handleInputChange}
                              required
                              className="bg-gray-50 border-gray-200"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="matricula" className="text-gray-600">Matrícula (opcional)</Label>
                            <Input
                              id="matricula"
                              placeholder="1234 ABC"
                              value={formData.matricula}
                              onChange={handleInputChange}
                              className="bg-gray-50 border-gray-200"
                            />
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full"
                          size="lg"
                        >
                          Continuar
                        </Button>
                      </div>
                    </form>
                  )}

                  {/* Step 2: Contact Details */}
                  {currentStep === 2 && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-6 animate-fade-in">
                        <div className="space-y-2">
                          <Label htmlFor="cuandoVender" className="text-gray-600">¿Cuándo planeas venderlo? *</Label>
                          <Select
                            value={formData.cuandoVender}
                            onValueChange={(value) => {
                              handleSelectChange("cuandoVender", value);
                              setErrors({ ...errors, cuandoVender: "" });
                            }}
                            required
                          >
                            <SelectTrigger className={`bg-gray-50 data-[placeholder]:text-muted-foreground ${errors.cuandoVender ? "border-red-500" : "border-gray-200"}`}>
                              <SelectValue placeholder="Selecciona una opción" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="lo-antes-posible">Lo antes posible</SelectItem>
                              <SelectItem value="4-semanas">En las próximas 4 semanas</SelectItem>
                              <SelectItem value="4-meses">En los próximos 4 meses</SelectItem>
                              <SelectItem value="no-decidido">Aún no lo he decidido</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.cuandoVender && <p className="text-sm text-red-500">{errors.cuandoVender}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="interesIntercambio" className="text-gray-600">¿Estás interesado en comprar un coche a cambio? *</Label>
                          <Select
                            value={formData.interesIntercambio}
                            onValueChange={(value) => {
                              handleSelectChange("interesIntercambio", value);
                              setErrors({ ...errors, interesIntercambio: "" });
                            }}
                            required
                          >
                            <SelectTrigger className={`bg-gray-50 data-[placeholder]:text-muted-foreground ${errors.interesIntercambio ? "border-red-500" : "border-gray-200"}`}>
                              <SelectValue placeholder="Selecciona una opción" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="si">Sí</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.interesIntercambio && <p className="text-sm text-red-500">{errors.interesIntercambio}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="nombre" className="text-gray-600">Nombre *</Label>
                            <Input
                              id="nombre"
                              name="nombre"
                              placeholder="Nombre"
                              value={formData.nombre}
                              onChange={handleInputChange}
                              required
                              className="bg-gray-50 border-gray-200"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="apellido" className="text-gray-600">Apellido *</Label>
                            <Input
                              id="apellido"
                              name="apellido"
                              placeholder="Apellidos"
                              value={formData.apellido}
                              onChange={handleInputChange}
                              required
                              className="bg-gray-50 border-gray-200"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-600">Email *</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="email@ejemplo.com"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="bg-gray-50 border-gray-200"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="telefono" className="text-gray-600">Teléfono *</Label>
                            <div className="flex">
                              <div className="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md">
                                <span className="text-sm text-red-600 font-semibold">🇪🇸</span>
                              </div>
                              <Input
                                id="telefono"
                                name="telefono"
                                type="tel"
                                placeholder="600 000 000"
                                value={formData.telefono}
                                onChange={handleInputChange}
                                required
                                className="bg-gray-50 border-gray-200 rounded-l-none"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="acceptPrivacy"
                              checked={formData.acceptPrivacy}
                              onCheckedChange={(checked) =>
                                setFormData({ ...formData, acceptPrivacy: checked as boolean })
                              }
                            />
                            <Label htmlFor="acceptPrivacy" className="text-sm text-gray-600">
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

                        <div className="space-y-4">
                          <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Enviando..." : "Validar"}
                          </Button>
                          <button
                            type="button"
                            onClick={() => {
                              setCurrentStep(1);
                              setFormData({
                                tipoVehiculo: "turismo",
                                marca: "",
                                modelo: "",
                                ano: "",
                                carroceria: "",
                                color: "",
                                combustible: "",
                                tipoCambio: "",
                                version: "",
                                kilometraje: "",
                                matricula: "",
                                cuandoVender: "",
                                interesIntercambio: "",
                                nombre: "",
                                apellido: "",
                                telefono: "",
                                email: "",
                                acceptPrivacy: false
                              });
                            }}
                            className="w-full text-center text-sm text-muted-foreground hover:text-foreground underline"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* Step 3: Success Message */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-6 text-center py-8 animate-fade-in">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>

                        <div className="space-y-3">
                          <h3 className="text-2xl font-bold text-foreground">
                            ¡Gracias por tu solicitud!
                          </h3>
                          <p className="text-muted-foreground max-w-md mx-auto">
                            Hemos recibido la información de tu vehículo. Nuestro equipo la está revisando
                            y te contactaremos en las próximas <span className="font-semibold text-foreground">24 horas</span> con
                            tu valoración personalizada.
                          </p>
                        </div>

                        <Button
                          type="button"
                          onClick={() => {
                            setCurrentStep(1);
                            setFormData({
                              tipoVehiculo: "turismo",
                              marca: "",
                              modelo: "",
                              ano: "",
                              carroceria: "",
                              color: "",
                              combustible: "",
                              tipoCambio: "",
                              version: "",
                              kilometraje: "",
                              matricula: "",
                              cuandoVender: "",
                              interesIntercambio: "",
                              nombre: "",
                              apellido: "",
                              telefono: "",
                              email: "",
                              acceptPrivacy: false
                            });
                          }}
                          variant="outline"
                          size="lg"
                        >
                          Volver al inicio
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

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

export default Sell;
