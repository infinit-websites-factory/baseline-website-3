import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const { language, getPhoneNumber, getAddress, t } = useLanguage();
  const address = getAddress();

  const getFlag = () => {
    switch (language) {
      case "es": return "🇪🇸";
      case "en": return "🇬🇧";
      case "fr": return "🇫🇷";
      default: return "🇪🇸";
    }
  };
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
      newErrors.marca = t("sell_page.form.required_field");
    }
    if (!formData.ano) {
      newErrors.ano = t("sell_page.form.required_field");
    }
    if (!formData.combustible) {
      newErrors.combustible = t("sell_page.form.required_field");
    }
    if (!formData.tipoCambio) {
      newErrors.tipoCambio = t("sell_page.form.required_field");
    }
    if (formData.tipoVehiculo === "turismo" && !formData.carroceria) {
      newErrors.carroceria = t("sell_page.form.required_field");
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
      newErrors.cuandoVender = t("sell_page.form.required_field");
    }
    if (!formData.interesIntercambio) {
      newErrors.interesIntercambio = t("sell_page.form.required_field");
    }

    setErrors(newErrors);

    // Check privacy acceptance
    if (!formData.acceptPrivacy) {
      toast({
        title: "Error",
        description: t("sell_page.errors.privacy_required"),
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
        description: t("sell_page.errors.submission_error"),
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
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              {/* Left side - Title, subtitle, and benefits */}
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                    {t("sell_page.hero.title")}
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {t("sell_page.hero.subtitle")}
                  </p>
                </div>

                {/* Benefits checklist */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1">{t("sell_page.benefits.best_price.title")}</h3>
                      <p className="text-muted-foreground">{t("sell_page.benefits.best_price.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1">{t("sell_page.benefits.fast_process.title")}</h3>
                      <p className="text-muted-foreground">{t("sell_page.benefits.fast_process.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1">{t("sell_page.benefits.no_commitment.title")}</h3>
                      <p className="text-muted-foreground">{t("sell_page.benefits.no_commitment.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1">{t("sell_page.benefits.any_vehicle.title")}</h3>
                      <p className="text-muted-foreground">{t("sell_page.benefits.any_vehicle.description")}</p>
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
                        <CardTitle className="text-2xl text-primary">{t("sell_page.form.step1.title")}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {t("sell_page.form.step1.subtitle")}
                        </p>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-2">
                        <CardTitle className="text-2xl text-primary">{t("sell_page.form.step2.title")}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {t("sell_page.form.step2.subtitle")}
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
                          <Label className="text-gray-600">{t("sell_page.form.vehicle_type")} {t("sell_page.form.required")}</Label>
                          <div className="grid grid-cols-2 gap-3">
                            <Button
                              type="button"
                              variant="outline"
                              className={`h-10 ${formData.tipoVehiculo === "turismo" ? "bg-gray-100 hover:bg-gray-100 hover:text-foreground border-gray-300 text-foreground" : "bg-white hover:bg-gray-50 hover:text-foreground border-gray-200 text-foreground"}`}
                              onClick={() => handleSelectChange("tipoVehiculo", "turismo")}
                            >
                              {t("sell_page.form.vehicle_type_tourism")}
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              className={`h-10 ${formData.tipoVehiculo === "industrial" ? "bg-gray-100 hover:bg-gray-100 hover:text-foreground border-gray-300 text-foreground" : "bg-white hover:bg-gray-50 hover:text-foreground border-gray-200 text-foreground"}`}
                              onClick={() => handleSelectChange("tipoVehiculo", "industrial")}
                            >
                              {t("sell_page.form.vehicle_type_industrial")}
                            </Button>
                          </div>
                        </div>

                        {/* Marca - Modelo */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="marca" className="text-gray-600">{t("sell_page.form.brand")} {t("sell_page.form.required")}</Label>
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
                                <SelectValue placeholder={t("sell_page.form.brand_placeholder")} />
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
                            <Label htmlFor="modelo" className="text-gray-600">{t("sell_page.form.model")} {t("sell_page.form.required")}</Label>
                            <Input
                              id="modelo"
                              placeholder={t("sell_page.form.model_placeholder")}
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
                              <Label htmlFor="version" className="text-gray-600">{t("sell_page.form.version")} {t("sell_page.form.required")}</Label>
                              <Input
                                id="version"
                                placeholder={t("sell_page.form.version_placeholder")}
                                value={formData.version}
                                onChange={handleInputChange}
                                required
                                className="bg-gray-50 border-gray-200"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="carroceria" className="text-gray-600">{t("sell_page.form.body_type")} {t("sell_page.form.required")}</Label>
                              <Select
                                value={formData.carroceria}
                                onValueChange={(value) => {
                                  handleSelectChange("carroceria", value);
                                  setErrors({ ...errors, carroceria: "" });
                                }}
                                required
                              >
                                <SelectTrigger className={`bg-gray-50 data-[placeholder]:text-muted-foreground ${errors.carroceria ? "border-red-500" : "border-gray-200"}`}>
                                  <SelectValue placeholder={t("sell_page.form.body_type_placeholder")} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="berlina">{t("sell_page.form.body_types.berlina")}</SelectItem>
                                  <SelectItem value="coupe">{t("sell_page.form.body_types.coupe")}</SelectItem>
                                  <SelectItem value="cabrio">{t("sell_page.form.body_types.cabrio")}</SelectItem>
                                  <SelectItem value="familiar">{t("sell_page.form.body_types.familiar")}</SelectItem>
                                  <SelectItem value="monovolumen">{t("sell_page.form.body_types.monovolumen")}</SelectItem>
                                  <SelectItem value="suv">{t("sell_page.form.body_types.suv")}</SelectItem>
                                  <SelectItem value="pickup">{t("sell_page.form.body_types.pickup")}</SelectItem>
                                  <SelectItem value="otro">{t("sell_page.form.body_types.otro")}</SelectItem>
                                </SelectContent>
                              </Select>
                              {errors.carroceria && <p className="text-sm text-red-500">{errors.carroceria}</p>}
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Label htmlFor="version" className="text-gray-600">{t("sell_page.form.version")} {t("sell_page.form.required")}</Label>
                            <Input
                              id="version"
                              placeholder={t("sell_page.form.version_placeholder")}
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
                            <Label htmlFor="tipoCambio" className="text-gray-600">{t("sell_page.form.transmission")} {t("sell_page.form.required")}</Label>
                            <Select
                              value={formData.tipoCambio}
                              onValueChange={(value) => {
                                handleSelectChange("tipoCambio", value);
                                setErrors({ ...errors, tipoCambio: "" });
                              }}
                              required
                            >
                              <SelectTrigger className={`bg-gray-50 data-[placeholder]:text-muted-foreground ${errors.tipoCambio ? "border-red-500" : "border-gray-200"}`}>
                                <SelectValue placeholder={t("sell_page.form.transmission_placeholder")} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="manual">{t("sell_page.form.transmission_types.manual")}</SelectItem>
                                <SelectItem value="automatico">{t("sell_page.form.transmission_types.automatico")}</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.tipoCambio && <p className="text-sm text-red-500">{errors.tipoCambio}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="combustible" className="text-gray-600">{t("sell_page.form.fuel")} {t("sell_page.form.required")}</Label>
                            <Select
                              value={formData.combustible}
                              onValueChange={(value) => {
                                handleSelectChange("combustible", value);
                                setErrors({ ...errors, combustible: "" });
                              }}
                              required
                            >
                              <SelectTrigger className={`bg-gray-50 data-[placeholder]:text-muted-foreground ${errors.combustible ? "border-red-500" : "border-gray-200"}`}>
                                <SelectValue placeholder={t("sell_page.form.fuel_placeholder")} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="gasolina">{t("sell_page.form.fuel_types.gasolina")}</SelectItem>
                                <SelectItem value="diesel">{t("sell_page.form.fuel_types.diesel")}</SelectItem>
                                <SelectItem value="hibrido">{t("sell_page.form.fuel_types.hibrido")}</SelectItem>
                                <SelectItem value="hibrido-enchufable">{t("sell_page.form.fuel_types.hibrido_enchufable")}</SelectItem>
                                <SelectItem value="electrico">{t("sell_page.form.fuel_types.electrico")}</SelectItem>
                                <SelectItem value="gas">{t("sell_page.form.fuel_types.gas")}</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.combustible && <p className="text-sm text-red-500">{errors.combustible}</p>}
                          </div>
                        </div>

                        {/* Año - Color */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="ano" className="text-gray-600">{t("sell_page.form.year")} {t("sell_page.form.required")}</Label>
                            <Select
                              value={formData.ano}
                              onValueChange={(value) => {
                                handleSelectChange("ano", value);
                                setErrors({ ...errors, ano: "" });
                              }}
                              required
                            >
                              <SelectTrigger className={`bg-gray-50 data-[placeholder]:text-muted-foreground ${errors.ano ? "border-red-500" : "border-gray-200"}`}>
                                <SelectValue placeholder={t("sell_page.form.year_placeholder")} />
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
                            <Label htmlFor="color" className="text-gray-600">{t("sell_page.form.color")} {t("sell_page.form.required")}</Label>
                            <Input
                              id="color"
                              placeholder={t("sell_page.form.color_placeholder")}
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
                            <Label htmlFor="kilometraje" className="text-gray-600">{t("sell_page.form.mileage")} {t("sell_page.form.required")}</Label>
                            <Input
                              id="kilometraje"
                              type="number"
                              placeholder={t("sell_page.form.mileage_placeholder")}
                              value={formData.kilometraje}
                              onChange={handleInputChange}
                              required
                              className="bg-gray-50 border-gray-200"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="matricula" className="text-gray-600">{t("sell_page.form.license_plate")}</Label>
                            <Input
                              id="matricula"
                              placeholder={t("sell_page.form.license_plate_placeholder")}
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
                          {t("sell_page.form.continue")}
                        </Button>
                      </div>
                    </form>
                  )}

                  {/* Step 2: Contact Details */}
                  {currentStep === 2 && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-6 animate-fade-in">
                        <div className="space-y-2">
                          <Label htmlFor="cuandoVender" className="text-gray-600">{t("sell_page.form.when_to_sell")} {t("sell_page.form.required")}</Label>
                          <Select
                            value={formData.cuandoVender}
                            onValueChange={(value) => {
                              handleSelectChange("cuandoVender", value);
                              setErrors({ ...errors, cuandoVender: "" });
                            }}
                            required
                          >
                            <SelectTrigger className={`bg-gray-50 data-[placeholder]:text-muted-foreground ${errors.cuandoVender ? "border-red-500" : "border-gray-200"}`}>
                              <SelectValue placeholder={t("sell_page.form.when_to_sell_placeholder")} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="lo-antes-posible">{t("sell_page.form.when_to_sell_options.asap")}</SelectItem>
                              <SelectItem value="4-semanas">{t("sell_page.form.when_to_sell_options.4_weeks")}</SelectItem>
                              <SelectItem value="4-meses">{t("sell_page.form.when_to_sell_options.4_months")}</SelectItem>
                              <SelectItem value="no-decidido">{t("sell_page.form.when_to_sell_options.not_decided")}</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.cuandoVender && <p className="text-sm text-red-500">{errors.cuandoVender}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="interesIntercambio" className="text-gray-600">{t("sell_page.form.interested_trade")} {t("sell_page.form.required")}</Label>
                          <Select
                            value={formData.interesIntercambio}
                            onValueChange={(value) => {
                              handleSelectChange("interesIntercambio", value);
                              setErrors({ ...errors, interesIntercambio: "" });
                            }}
                            required
                          >
                            <SelectTrigger className={`bg-gray-50 data-[placeholder]:text-muted-foreground ${errors.interesIntercambio ? "border-red-500" : "border-gray-200"}`}>
                              <SelectValue placeholder={t("sell_page.form.interested_trade_placeholder")} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="si">{t("sell_page.form.yes")}</SelectItem>
                              <SelectItem value="no">{t("sell_page.form.no")}</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.interesIntercambio && <p className="text-sm text-red-500">{errors.interesIntercambio}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="nombre" className="text-gray-600">{t("sell_page.form.first_name")} {t("sell_page.form.required")}</Label>
                            <Input
                              id="nombre"
                              name="nombre"
                              placeholder={t("sell_page.form.first_name_placeholder")}
                              value={formData.nombre}
                              onChange={handleInputChange}
                              required
                              className="bg-gray-50 border-gray-200"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="apellido" className="text-gray-600">{t("sell_page.form.last_name")} {t("sell_page.form.required")}</Label>
                            <Input
                              id="apellido"
                              name="apellido"
                              placeholder={t("sell_page.form.last_name_placeholder")}
                              value={formData.apellido}
                              onChange={handleInputChange}
                              required
                              className="bg-gray-50 border-gray-200"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-600">{t("sell_page.form.email")} {t("sell_page.form.required")}</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder={t("sell_page.form.email_placeholder")}
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="bg-gray-50 border-gray-200"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="telefono" className="text-gray-600">{t("sell_page.form.phone")} {t("sell_page.form.required")}</Label>
                            <div className="flex">
                              <div className="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md">
                                <span className="text-sm text-red-600 font-semibold">{getFlag()}</span>
                              </div>
                              <Input
                                id="telefono"
                                name="telefono"
                                type="tel"
                                placeholder={t("sell_page.form.phone_placeholder")}
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
                              {t("sell_page.form.accept_privacy")}{" "}
                              <button
                                type="button"
                                onClick={() => setOpenPrivacyModal(true)}
                                className="text-primary hover:text-gray-600 underline"
                              >
                                {t("sell_page.form.privacy_policy")}
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
                            {isSubmitting ? t("sell_page.form.validating") : t("sell_page.form.validate")}
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
                            {t("sell_page.form.cancel")}
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
                            {t("sell_page.success.title")}
                          </h3>
                          <p className="text-muted-foreground max-w-md mx-auto">
                            {t("sell_page.success.description")} <span className="font-semibold text-foreground">{t("sell_page.success.hours")}</span> {t("sell_page.success.description_suffix")}
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
                          {t("sell_page.success.back_home")}
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
            <DialogTitle className="text-xl font-bold">{t('legal.privacy_policy.title')}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 text-sm text-muted-foreground">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{t('legal.privacy_policy.section_2_1.title')}</h3>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p><strong>{t('legal.privacy_policy.section_2_1.company_name')}:</strong> INFINIT Cars</p>
                <p><strong>{t('legal.privacy_policy.section_2_1.address')}:</strong> {address.full}</p>
                <p><strong>{t('legal.privacy_policy.section_2_1.email')}:</strong> contact@infinit.com</p>
                <p><strong>{t('legal.privacy_policy.section_2_1.phone')}:</strong> {getPhoneNumber()}</p>
              </div>

              <h3 className="text-lg font-semibold">{t('legal.privacy_policy.section_2_2.title')}</h3>
              <p>{t('legal.privacy_policy.section_2_2.intro')}</p>
              <ul className="list-disc pl-6 space-y-1">
                {t('legal.privacy_policy.section_2_2.items', { returnObjects: true }).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold">{t('legal.privacy_policy.section_2_3.title')}</h3>
              <p>{t('legal.privacy_policy.section_2_3.intro')}</p>
              <ul className="list-disc pl-6 space-y-1">
                {t('legal.privacy_policy.section_2_3.items', { returnObjects: true }).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold">{t('legal.privacy_policy.section_2_4.title')}</h3>
              <p>{t('legal.privacy_policy.section_2_4.content')} <strong>contact@infinit.com</strong></p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sell;
