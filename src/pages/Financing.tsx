import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { CheckCircle2, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CONTACT_FORM_API_URL, PROFILE_ID, fetchCars, transformApiCarToVehicle, Vehicle } from "@/services/carsApi";

const Financing = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [openPrivacyModal, setOpenPrivacyModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [formData, setFormData] = useState({
    vehiculoId: "",
    entradaInicial: "",
    plazoPago: "",
    dniNie: "",
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    fechaNacimiento: "",
    estadoCivil: "",
    numeroHijos: "",
    direccion: "",
    codigoPostal: "",
    poblacion: "",
    gastosHipotecaAlquiler: "",
    situacionEmpleo: "",
    antiguedadEmpleo: "",
    empresaTrabajo: "",
    ingresoNetoMensual: "",
    nacionalidad: "",
    acceptPrivacy: false
  });

  const totalSteps = 5;

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const apiCars = await fetchCars();
        const transformedVehicles = apiCars.map(transformApiCarToVehicle);

        // If no vehicles available, add placeholder option with dummy data
        if (transformedVehicles.length === 0) {
          setVehicles([
            {
              id: "placeholder-1",
              brand: "BMW",
              model: "Serie 3",
              year: 2020,
              price: 25000,
              mileage: 45000,
              fuel: "Diésel",
              transmission: "Automático",
              type: "Berlina",
              images: [],
              updatedAt: ""
            }
          ]);
        } else {
          setVehicles(transformedVehicles);
        }
      } catch (error) {
        console.error('Error loading vehicles:', error);
        // Add placeholder option with dummy data when error occurs
        setVehicles([
          {
            id: "placeholder-1",
            brand: "BMW",
            model: "Serie 3",
            year: 2020,
            price: 25000,
            mileage: 45000,
            fuel: "Diésel",
            transmission: "Automático",
            type: "Berlina",
            images: [],
            updatedAt: ""
          }
        ]);
      } finally {
        setLoadingVehicles(false);
      }
    };

    loadVehicles();
  }, []);

  const plazoPagoOptions = ["12", "18", "24", "36", "48", "60", "72", "84", "96", "108", "120"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.vehiculoId) {
      newErrors.vehiculoId = "Campo obligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.entradaInicial) {
      newErrors.entradaInicial = "Campo obligatorio";
    } else if (parseFloat(formData.entradaInicial) < 0) {
      newErrors.entradaInicial = "La entrada debe ser positiva";
    }

    if (!formData.plazoPago) {
      newErrors.plazoPago = "Campo obligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.dniNie) {
      newErrors.dniNie = "Campo obligatorio";
    }
    if (!formData.nombre) {
      newErrors.nombre = "Campo obligatorio";
    }
    if (!formData.apellidos) {
      newErrors.apellidos = "Campo obligatorio";
    }
    if (!formData.fechaNacimiento) {
      newErrors.fechaNacimiento = "Campo obligatorio";
    }
    if (!formData.estadoCivil) {
      newErrors.estadoCivil = "Campo obligatorio";
    }
    if (!formData.nacionalidad) {
      newErrors.nacionalidad = "Campo obligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.situacionEmpleo) {
      newErrors.situacionEmpleo = "Campo obligatorio";
    }
    if (!formData.ingresoNetoMensual) {
      newErrors.ingresoNetoMensual = "Campo obligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = false;

    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    } else if (currentStep === 3) {
      isValid = validateStep3();
    } else if (currentStep === 4) {
      isValid = validateStep4();
    }

    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Campo obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.telefono) {
      newErrors.telefono = "Campo obligatorio";
    }
    if (!formData.direccion) {
      newErrors.direccion = "Campo obligatorio";
    }
    if (!formData.codigoPostal) {
      newErrors.codigoPostal = "Campo obligatorio";
    }
    if (!formData.poblacion) {
      newErrors.poblacion = "Campo obligatorio";
    }

    setErrors(newErrors);

    if (!formData.acceptPrivacy) {
      toast({
        title: "Error",
        description: "Debes aceptar la política de privacidad",
        variant: "destructive"
      });
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedVehicle = vehicles.find(v => v.id === formData.vehiculoId);

      let vehicleInfo = 'No especificado';
      let priceInfo = '';

      if (selectedVehicle) {
        vehicleInfo = `${selectedVehicle.brand} ${selectedVehicle.model} (${selectedVehicle.year})`;
        priceInfo = `Precio: ${selectedVehicle.price.toLocaleString('es-ES')}€`;
      }

      const message = `SOLICITUD DE FINANCIACIÓN

=== VEHÍCULO SELECCIONADO ===
${vehicleInfo}
${priceInfo}

=== DETALLES DE FINANCIACIÓN ===
Entrada inicial: ${formData.entradaInicial}€
Plazo de pago: ${formData.plazoPago} meses

=== DATOS PERSONALES ===
DNI/NIE: ${formData.dniNie}
Nombre: ${formData.nombre}
Apellidos: ${formData.apellidos}
Fecha de nacimiento: ${formData.fechaNacimiento}
Estado civil: ${formData.estadoCivil}
Número de hijos: ${formData.numeroHijos || 'No especificado'}
Nacionalidad: ${formData.nacionalidad}

=== DATOS DE CONTACTO ===
Email: ${formData.email}
Teléfono: ${formData.telefono}
Dirección: ${formData.direccion}
Código postal: ${formData.codigoPostal}
Población: ${formData.poblacion}

=== SITUACIÓN FINANCIERA Y LABORAL ===
Situación de empleo: ${formData.situacionEmpleo}
Antigüedad en empleo: ${formData.antiguedadEmpleo || 'No especificado'}
Empresa: ${formData.empresaTrabajo || 'No especificado'}
Ingreso neto mensual: ${formData.ingresoNetoMensual}€
Gastos hipoteca/alquiler mensual: ${formData.gastosHipotecaAlquiler || 'No especificado'}€`;

      const payload = {
        profile_id: PROFILE_ID,
        lead_firstname: formData.nombre,
        lead_lastname: formData.apellidos,
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

      setCurrentStep(6);
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
                    Financiación a tu medida
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Consigue el coche que deseas con las mejores condiciones de financiación del mercado.
                  </p>
                </div>

                {/* Benefits checklist */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1">Cuotas reducidas</h3>
                      <p className="text-muted-foreground">Hasta 120 meses con tipos competitivos</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1">Aprobación rápida</h3>
                      <p className="text-muted-foreground">Respuesta en menos de 24 horas</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1">Sin sorpresas</h3>
                      <p className="text-muted-foreground">Condiciones claras y transparentes</p>
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
                        <CardTitle className="text-2xl text-primary">Solicita tu financiación</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Selecciona el vehículo que deseas financiar
                        </p>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-2">
                        <CardTitle className="text-2xl text-primary">Detalles de financiación</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Cuéntanos sobre tu plan de pago
                        </p>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-2">
                        <CardTitle className="text-2xl text-primary">Datos personales</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Completa tu información personal
                        </p>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="space-y-2">
                        <CardTitle className="text-2xl text-primary">Situación laboral y financiera</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Información sobre tu situación económica
                        </p>
                      </div>
                    )}

                    {currentStep === 5 && (
                      <div className="space-y-2">
                        <CardTitle className="text-2xl text-primary">Datos de contacto</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Indícanos cómo contactarte
                        </p>
                      </div>
                    )}

                    {currentStep === 6 && null}
                  </CardHeader>

                  <CardContent>
                    {/* Step 1: Car Selection */}
                    {currentStep === 1 && (
                      <form onSubmit={handleNext} className="space-y-6">
                        <div className="space-y-6 animate-fade-in">
                          <div className="space-y-2">
                            <Label htmlFor="vehiculoId" className="text-gray-600">Selecciona un vehículo *</Label>
                            {loadingVehicles ? (
                              <div className="text-center py-8 text-muted-foreground">
                                Cargando vehículos disponibles...
                              </div>
                            ) : (
                              <Select
                                value={formData.vehiculoId}
                                onValueChange={(value) => {
                                  handleSelectChange("vehiculoId", value);
                                  setErrors({ ...errors, vehiculoId: "" });
                                }}
                                required
                              >
                                <SelectTrigger className={`bg-gray-50 data-[placeholder]:text-muted-foreground ${errors.vehiculoId ? "border-red-500" : "border-gray-200"}`}>
                                  <SelectValue placeholder="Selecciona el vehículo que te interesa" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[300px]">
                                  {vehicles.map((vehicle) => (
                                    <SelectItem key={vehicle.id} value={vehicle.id}>
                                      {vehicle.brand} {vehicle.model} ({vehicle.year}) - {vehicle.price.toLocaleString('es-ES')}€
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                            {errors.vehiculoId && <p className="text-sm text-red-500">{errors.vehiculoId}</p>}
                          </div>

                          {formData.vehiculoId && vehicles.find(v => v.id === formData.vehiculoId) && (
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                              {(() => {
                                const vehicle = vehicles.find(v => v.id === formData.vehiculoId);
                                if (!vehicle) return null;

                                return (
                                  <div className="space-y-2">
                                    <h4 className="font-semibold text-foreground">
                                      {vehicle.brand} {vehicle.model} ({vehicle.year})
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                                      <div>Precio: <span className="font-semibold text-foreground">{vehicle.price.toLocaleString('es-ES')}€</span></div>
                                      <div>Kilometraje: {vehicle.mileage.toLocaleString('es-ES')} km</div>
                                      <div>Combustible: {vehicle.fuel}</div>
                                      <div>Transmisión: {vehicle.transmission}</div>
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          )}

                          <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            disabled={loadingVehicles}
                          >
                            Continuar
                          </Button>
                        </div>
                      </form>
                    )}

                    {/* Step 2: Financial Details */}
                    {currentStep === 2 && (
                      <form onSubmit={handleNext} className="space-y-6">
                        <div className="space-y-6 animate-fade-in">
                          {/* Selected Vehicle Context */}
                          {(() => {
                            const selectedVehicle = vehicles.find(v => v.id === formData.vehiculoId);
                            if (!selectedVehicle) return null;

                            const vehiclePrice = selectedVehicle.price;

                            return (
                              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-muted-foreground">
                                    {selectedVehicle.brand} {selectedVehicle.model} · {vehiclePrice.toLocaleString('es-ES')}€
                                  </span>
                                </div>
                              </div>
                            );
                          })()}

                          {(() => {
                            const selectedVehicle = vehicles.find(v => v.id === formData.vehiculoId);
                            if (!selectedVehicle) return null;

                            const vehiclePrice = selectedVehicle.price;
                            const downPayment = parseFloat(formData.entradaInicial) || 0;
                            const loanAmount = Math.max(0, vehiclePrice - downPayment);
                            const maxDownPayment = vehiclePrice;

                            return (
                              <div className="space-y-4">
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center">
                                    <Label className="text-gray-600">Entrada inicial (€) *</Label>
                                    <span className="text-lg font-semibold text-primary">
                                      {downPayment.toLocaleString('es-ES')}€
                                    </span>
                                  </div>
                                  <Slider
                                    value={[downPayment]}
                                    onValueChange={(values) => {
                                      setFormData({ ...formData, entradaInicial: values[0].toString() });
                                      setErrors({ ...errors, entradaInicial: "" });
                                    }}
                                    min={0}
                                    max={maxDownPayment}
                                    step={500}
                                    className="w-full"
                                  />
                                  <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>0€</span>
                                    <span>{maxDownPayment.toLocaleString('es-ES')}€</span>
                                  </div>
                                </div>

                                {errors.entradaInicial && <p className="text-sm text-red-500">{errors.entradaInicial}</p>}
                              </div>
                            );
                          })()}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(() => {
                              const selectedVehicle = vehicles.find(v => v.id === formData.vehiculoId);
                              if (!selectedVehicle) return null;

                              const vehiclePrice = selectedVehicle.price;
                              const downPayment = parseFloat(formData.entradaInicial) || 0;
                              const loanAmount = Math.max(0, vehiclePrice - downPayment);

                              return (
                                <div className="space-y-2">
                                  <Label className="text-gray-600">Importe a financiar</Label>
                                  <div className="h-10 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md flex items-center">
                                    <span className="font-bold text-foreground">
                                      {loanAmount.toLocaleString('es-ES')}€
                                    </span>
                                  </div>
                                </div>
                              );
                            })()}

                            <div className="space-y-2">
                              <Label htmlFor="plazoPago" className="text-gray-600">Plazo de pago (meses) *</Label>
                              <Select
                                value={formData.plazoPago}
                                onValueChange={(value) => {
                                  handleSelectChange("plazoPago", value);
                                  setErrors({ ...errors, plazoPago: "" });
                                }}
                                required
                              >
                                <SelectTrigger className={`bg-gray-50 data-[placeholder]:text-muted-foreground ${errors.plazoPago ? "border-red-500" : "border-gray-200"}`}>
                                  <SelectValue placeholder="Selecciona el plazo" />
                                </SelectTrigger>
                                <SelectContent>
                                  {plazoPagoOptions.map((plazo) => (
                                    <SelectItem key={plazo} value={plazo}>{plazo} meses</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {errors.plazoPago && <p className="text-sm text-red-500">{errors.plazoPago}</p>}
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

                    {/* Step 3: Personal Information */}
                    {currentStep === 3 && (
                      <form onSubmit={handleNext} className="space-y-6">
                        <div className="space-y-6 animate-fade-in">
                          {/* Selected Vehicle Context */}
                          {(() => {
                            const selectedVehicle = vehicles.find(v => v.id === formData.vehiculoId);
                            if (!selectedVehicle) return null;

                            const vehiclePrice = selectedVehicle.price;
                            const downPayment = parseFloat(formData.entradaInicial) || 0;
                            const loanAmount = Math.max(0, vehiclePrice - downPayment);

                            return (
                              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-muted-foreground">
                                    {selectedVehicle.brand} {selectedVehicle.model} · {vehiclePrice.toLocaleString('es-ES')}€
                                  </span>
                                  {formData.entradaInicial && (
                                    <span className="font-semibold text-primary">
                                      Financiación: {loanAmount.toLocaleString('es-ES')}€
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })()}

                          <div className="space-y-2">
                            <Label htmlFor="dniNie" className="text-gray-600">DNI/NIE *</Label>
                            <Input
                              id="dniNie"
                              placeholder="12345678A"
                              value={formData.dniNie}
                              onChange={(e) => {
                                handleInputChange(e);
                                setErrors({ ...errors, dniNie: "" });
                              }}
                              required
                              className={`bg-gray-50 ${errors.dniNie ? "border-red-500" : "border-gray-200"}`}
                            />
                            {errors.dniNie && <p className="text-sm text-red-500">{errors.dniNie}</p>}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="nombre" className="text-gray-600">Nombre *</Label>
                              <Input
                                id="nombre"
                                placeholder="Tu nombre"
                                value={formData.nombre}
                                onChange={(e) => {
                                  handleInputChange(e);
                                  setErrors({ ...errors, nombre: "" });
                                }}
                                required
                                className={`bg-gray-50 ${errors.nombre ? "border-red-500" : "border-gray-200"}`}
                              />
                              {errors.nombre && <p className="text-sm text-red-500">{errors.nombre}</p>}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="apellidos" className="text-gray-600">Apellidos *</Label>
                              <Input
                                id="apellidos"
                                placeholder="Tus apellidos"
                                value={formData.apellidos}
                                onChange={(e) => {
                                  handleInputChange(e);
                                  setErrors({ ...errors, apellidos: "" });
                                }}
                                required
                                className={`bg-gray-50 ${errors.apellidos ? "border-red-500" : "border-gray-200"}`}
                              />
                              {errors.apellidos && <p className="text-sm text-red-500">{errors.apellidos}</p>}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="fechaNacimiento" className="text-gray-600">Fecha de nacimiento *</Label>
                              <Input
                                id="fechaNacimiento"
                                type="date"
                                value={formData.fechaNacimiento}
                                onChange={(e) => {
                                  handleInputChange(e);
                                  setErrors({ ...errors, fechaNacimiento: "" });
                                }}
                                required
                                className={`bg-gray-50 ${errors.fechaNacimiento ? "border-red-500" : "border-gray-200"}`}
                              />
                              {errors.fechaNacimiento && <p className="text-sm text-red-500">{errors.fechaNacimiento}</p>}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="estadoCivil" className="text-gray-600">Estado civil *</Label>
                              <Select
                                value={formData.estadoCivil}
                                onValueChange={(value) => {
                                  handleSelectChange("estadoCivil", value);
                                  setErrors({ ...errors, estadoCivil: "" });
                                }}
                                required
                              >
                                <SelectTrigger className={`bg-gray-50 data-[placeholder]:text-muted-foreground ${errors.estadoCivil ? "border-red-500" : "border-gray-200"}`}>
                                  <SelectValue placeholder="Selecciona estado civil" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="soltero">Soltero/a</SelectItem>
                                  <SelectItem value="casado">Casado/a</SelectItem>
                                  <SelectItem value="divorciado">Divorciado/a</SelectItem>
                                  <SelectItem value="viudo">Viudo/a</SelectItem>
                                  <SelectItem value="separado">Separado/a</SelectItem>
                                  <SelectItem value="otro">Otro</SelectItem>
                                </SelectContent>
                              </Select>
                              {errors.estadoCivil && <p className="text-sm text-red-500">{errors.estadoCivil}</p>}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="numeroHijos" className="text-gray-600">Número de hijos</Label>
                              <Input
                                id="numeroHijos"
                                type="number"
                                placeholder="0"
                                value={formData.numeroHijos}
                                onChange={handleInputChange}
                                min="0"
                                className="bg-gray-50 border-gray-200"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="nacionalidad" className="text-gray-600">Nacionalidad *</Label>
                              <Input
                                id="nacionalidad"
                                placeholder="Española"
                                value={formData.nacionalidad}
                                onChange={(e) => {
                                  handleInputChange(e);
                                  setErrors({ ...errors, nacionalidad: "" });
                                }}
                                required
                                className={`bg-gray-50 ${errors.nacionalidad ? "border-red-500" : "border-gray-200"}`}
                              />
                              {errors.nacionalidad && <p className="text-sm text-red-500">{errors.nacionalidad}</p>}
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

                    {/* Step 4: Employment and Financial Situation */}
                    {currentStep === 4 && (
                      <form onSubmit={handleNext} className="space-y-6">
                        <div className="space-y-6 animate-fade-in">
                          {/* Selected Vehicle Context */}
                          {(() => {
                            const selectedVehicle = vehicles.find(v => v.id === formData.vehiculoId);
                            if (!selectedVehicle) return null;

                            const vehiclePrice = selectedVehicle.price;
                            const downPayment = parseFloat(formData.entradaInicial) || 0;
                            const loanAmount = Math.max(0, vehiclePrice - downPayment);

                            return (
                              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-muted-foreground">
                                    {selectedVehicle.brand} {selectedVehicle.model} · {vehiclePrice.toLocaleString('es-ES')}€
                                  </span>
                                  {formData.entradaInicial && (
                                    <span className="font-semibold text-primary">
                                      Financiación: {loanAmount.toLocaleString('es-ES')}€
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })()}

                          <div className="space-y-2">
                            <Label htmlFor="situacionEmpleo" className="text-gray-600">Situación de empleo *</Label>
                            <Select
                              value={formData.situacionEmpleo}
                              onValueChange={(value) => {
                                handleSelectChange("situacionEmpleo", value);
                                setErrors({ ...errors, situacionEmpleo: "" });
                              }}
                              required
                            >
                              <SelectTrigger className={`bg-gray-50 data-[placeholder]:text-muted-foreground ${errors.situacionEmpleo ? "border-red-500" : "border-gray-200"}`}>
                                <SelectValue placeholder="Selecciona situación de empleo" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="empleado-cuenta-ajena">Empleado por cuenta ajena</SelectItem>
                                <SelectItem value="autonomo">Autónomo</SelectItem>
                                <SelectItem value="funcionario">Funcionario</SelectItem>
                                <SelectItem value="jubilado">Jubilado</SelectItem>
                                <SelectItem value="desempleado">Desempleado</SelectItem>
                                <SelectItem value="estudiante">Estudiante</SelectItem>
                                <SelectItem value="otro">Otro</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.situacionEmpleo && <p className="text-sm text-red-500">{errors.situacionEmpleo}</p>}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="antiguedadEmpleo" className="text-gray-600">Antigüedad en empleo (años)</Label>
                              <Input
                                id="antiguedadEmpleo"
                                type="number"
                                placeholder="5"
                                value={formData.antiguedadEmpleo}
                                onChange={handleInputChange}
                                min="0"
                                step="0.5"
                                className="bg-gray-50 border-gray-200"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="empresaTrabajo" className="text-gray-600">Empresa en la que trabajas</Label>
                              <Input
                                id="empresaTrabajo"
                                placeholder="Nombre de la empresa"
                                value={formData.empresaTrabajo}
                                onChange={handleInputChange}
                                className="bg-gray-50 border-gray-200"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="ingresoNetoMensual" className="text-gray-600">Ingreso neto mensual (€) *</Label>
                              <Input
                                id="ingresoNetoMensual"
                                type="number"
                                placeholder="2000"
                                value={formData.ingresoNetoMensual}
                                onChange={(e) => {
                                  handleInputChange(e);
                                  setErrors({ ...errors, ingresoNetoMensual: "" });
                                }}
                                required
                                min="0"
                                step="100"
                                className={`bg-gray-50 ${errors.ingresoNetoMensual ? "border-red-500" : "border-gray-200"}`}
                              />
                              {errors.ingresoNetoMensual && <p className="text-sm text-red-500">{errors.ingresoNetoMensual}</p>}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="gastosHipotecaAlquiler" className="text-gray-600">Gastos hipoteca/alquiler mensual (€)</Label>
                              <Input
                                id="gastosHipotecaAlquiler"
                                type="number"
                                placeholder="800"
                                value={formData.gastosHipotecaAlquiler}
                                onChange={handleInputChange}
                                min="0"
                                step="50"
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

                    {/* Step 5: Contact Information */}
                    {currentStep === 5 && (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-6 animate-fade-in">
                          {/* Selected Vehicle Context */}
                          {(() => {
                            const selectedVehicle = vehicles.find(v => v.id === formData.vehiculoId);
                            if (!selectedVehicle) return null;

                            const vehiclePrice = selectedVehicle.price;
                            const downPayment = parseFloat(formData.entradaInicial) || 0;
                            const loanAmount = Math.max(0, vehiclePrice - downPayment);

                            return (
                              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-muted-foreground">
                                    {selectedVehicle.brand} {selectedVehicle.model} · {vehiclePrice.toLocaleString('es-ES')}€
                                  </span>
                                  {formData.entradaInicial && (
                                    <span className="font-semibold text-primary">
                                      Financiación: {loanAmount.toLocaleString('es-ES')}€
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })()}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="email" className="text-gray-600">Email *</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="tu@email.com"
                                value={formData.email}
                                onChange={(e) => {
                                  handleInputChange(e);
                                  setErrors({ ...errors, email: "" });
                                }}
                                required
                                className={`bg-gray-50 ${errors.email ? "border-red-500" : "border-gray-200"}`}
                              />
                              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="telefono" className="text-gray-600">Teléfono *</Label>
                              <div className="flex">
                                <div className="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md">
                                  <span className="text-sm text-red-600 font-semibold">🇪🇸</span>
                                </div>
                                <Input
                                  id="telefono"
                                  type="tel"
                                  placeholder="600 000 000"
                                  value={formData.telefono}
                                  onChange={(e) => {
                                    handleInputChange(e);
                                    setErrors({ ...errors, telefono: "" });
                                  }}
                                  required
                                  className={`bg-gray-50 rounded-l-none ${errors.telefono ? "border-red-500" : "border-gray-200"}`}
                                />
                              </div>
                              {errors.telefono && <p className="text-sm text-red-500">{errors.telefono}</p>}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="direccion" className="text-gray-600">Dirección *</Label>
                            <Input
                              id="direccion"
                              placeholder="Calle, número, piso, puerta"
                              value={formData.direccion}
                              onChange={(e) => {
                                handleInputChange(e);
                                setErrors({ ...errors, direccion: "" });
                              }}
                              required
                              className={`bg-gray-50 ${errors.direccion ? "border-red-500" : "border-gray-200"}`}
                            />
                            {errors.direccion && <p className="text-sm text-red-500">{errors.direccion}</p>}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="codigoPostal" className="text-gray-600">Código postal *</Label>
                              <Input
                                id="codigoPostal"
                                placeholder="28001"
                                value={formData.codigoPostal}
                                onChange={(e) => {
                                  handleInputChange(e);
                                  setErrors({ ...errors, codigoPostal: "" });
                                }}
                                required
                                className={`bg-gray-50 ${errors.codigoPostal ? "border-red-500" : "border-gray-200"}`}
                              />
                              {errors.codigoPostal && <p className="text-sm text-red-500">{errors.codigoPostal}</p>}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="poblacion" className="text-gray-600">Población *</Label>
                              <Input
                                id="poblacion"
                                placeholder="Madrid"
                                value={formData.poblacion}
                                onChange={(e) => {
                                  handleInputChange(e);
                                  setErrors({ ...errors, poblacion: "" });
                                }}
                                required
                                className={`bg-gray-50 ${errors.poblacion ? "border-red-500" : "border-gray-200"}`}
                              />
                              {errors.poblacion && <p className="text-sm text-red-500">{errors.poblacion}</p>}
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
                                  vehiculoId: "",
                                  entradaInicial: "",
                                  plazoPago: "",
                                  dniNie: "",
                                  nombre: "",
                                  apellidos: "",
                                  email: "",
                                  telefono: "",
                                  fechaNacimiento: "",
                                  estadoCivil: "",
                                  numeroHijos: "",
                                  direccion: "",
                                  codigoPostal: "",
                                  poblacion: "",
                                  gastosHipotecaAlquiler: "",
                                  situacionEmpleo: "",
                                  antiguedadEmpleo: "",
                                  empresaTrabajo: "",
                                  ingresoNetoMensual: "",
                                  nacionalidad: "",
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

                    {/* Step 6: Success Message */}
                    {currentStep === 6 && (
                      <div className="space-y-6">
                        <div className="space-y-6 text-center py-8 animate-fade-in">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                          </div>

                          <div className="space-y-3">
                            <h3 className="text-2xl font-bold text-foreground">
                              ¡Solicitud enviada con éxito!
                            </h3>
                            <p className="text-muted-foreground max-w-md mx-auto">
                              Hemos recibido tu solicitud de financiación. Nuestro equipo la está revisando
                              y te contactaremos en las próximas <span className="font-semibold text-foreground">24 horas</span> con
                              una propuesta personalizada.
                            </p>
                          </div>

                          <Button
                            type="button"
                            onClick={() => {
                              setCurrentStep(1);
                              setFormData({
                                vehiculoId: "",
                                entradaInicial: "",
                                plazoPago: "",
                                dniNie: "",
                                nombre: "",
                                apellidos: "",
                                email: "",
                                telefono: "",
                                fechaNacimiento: "",
                                estadoCivil: "",
                                numeroHijos: "",
                                direccion: "",
                                codigoPostal: "",
                                poblacion: "",
                                gastosHipotecaAlquiler: "",
                                situacionEmpleo: "",
                                antiguedadEmpleo: "",
                                empresaTrabajo: "",
                                ingresoNetoMensual: "",
                                nacionalidad: "",
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

export default Financing;
