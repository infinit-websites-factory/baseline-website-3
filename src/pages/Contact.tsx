import { useState } from "react";
import { Phone, MapPin, Clock } from "lucide-react";
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
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
import contactBackground from "@/assets/contact.png";
import { useToast } from "@/hooks/use-toast";
import { CONTACT_FORM_API_URL, PROFILE_ID } from "@/services/carsApi";

const Contact = () => {
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
        description: t('contact_page.errors.privacy_required'),
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
        description: t('contact_page.errors.submission_error'),
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

  const phoneNumber = getPhoneNumber();

  const contactInfo = [
    {
      icon: Phone,
      title: t('contact_page.info.call_us.title'),
      description: t('contact_page.info.call_us.description'),
      contact: phoneNumber,
      href: `tel:${phoneNumber}`
    },
    {
      icon: MapPin,
      title: t('contact_page.info.visit_us.title'),
      description: `${t('contact_page.info.visit_us.description')} ${address.full}`,
      contact: address.full,
      href: address.mapsUrl
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO page="contact" />
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-4xl tracking-tight font-bold text-foreground">
            {t('contact_page.title')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('contact_page.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-8 px-4 bg-background">
        <div className="container mx-auto max-w-2xl">
          <Card className="bg-white shadow-sm border border-gray-100 rounded-xl">
            <CardContent className="p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {t('contact_page.success.title')}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {t('contact_page.success.description')}
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
                    {t('contact_page.success.send_another')}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre" className="text-gray-600">{t('contact_page.form.name')}</Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                        className="bg-white border-gray-200"
                        placeholder={t('contact_page.form.name_placeholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apellido" className="text-gray-600">{t('contact_page.form.surname')}</Label>
                      <Input
                        id="apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleInputChange}
                        required
                        className="bg-white border-gray-200"
                        placeholder={t('contact_page.form.surname_placeholder')}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-600">{t('contact_page.form.email')}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-white border-gray-200"
                        placeholder={t('contact_page.form.email_placeholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono" className="text-gray-600">{t('contact_page.form.phone')}</Label>
                      <div className="flex">
                        <div className="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md">
                          <span className="text-sm text-red-600 font-semibold">{getFlag()}</span>
                        </div>
                        <Input
                          id="telefono"
                          name="telefono"
                          type="tel"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          required
                          className="bg-white border-gray-200 rounded-l-none"
                          placeholder={t('contact_page.form.phone_placeholder')}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensaje" className="text-gray-600">{t('contact_page.form.message')}</Label>
                    <Textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      placeholder={t('contact_page.form.message_placeholder')}
                      className="bg-white border-gray-200"
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
                        {t('contact_page.form.accept_marketing')}{" "}
                        <button
                          type="button"
                          onClick={() => setOpenPrivacyModal(true)}
                          className="text-primary hover:text-gray-600 underline"
                        >
                          {t('contact_page.form.privacy_policy')}
                        </button>.
                      </Label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3"
                  >
                    {isSubmitting ? t('contact_page.form.submitting') : t('contact_page.form.submit')}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <a
                  key={index}
                  href={info.href}
                  target={info.icon === MapPin ? "_blank" : undefined}
                  rel={info.icon === MapPin ? "noopener noreferrer" : undefined}
                  className="group block"
                >
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-full">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground mb-1">
                          {info.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {info.description}
                        </p>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <span className="text-foreground font-semibold text-lg group-hover:text-primary transition-colors">
                            {info.contact}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Address Information */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-foreground">
                {t('contact_page.location.title')}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {t('contact_page.location.address_title')}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {address.street}<br />
                      {address.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {t('contact_page.location.hours_title')}
                    </h3>
                    <div className="space-y-1 text-muted-foreground">
                      <p>{t('contact_page.location.hours.weekday')}</p>
                      <p>{t('contact_page.location.hours.saturday')}</p>
                      <p>{t('contact_page.location.hours.sunday')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="w-full">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <iframe
                  src={address.mapsEmbedUrl}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${t('contact_page.location.title')} - Luxury Car, ${address.city}`}
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
            <DialogTitle className="text-xl font-bold">{t('legal.privacy_policy.title')}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 text-sm text-muted-foreground">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{t('legal.privacy_policy.section_2_1.title')}</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>{t('legal.privacy_policy.section_2_1.company_name')}:</strong> Luxury Car</p>
                <p><strong>{t('legal.privacy_policy.section_2_1.address')}:</strong> {address.full}</p>
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
              <p>{t('legal.privacy_policy.section_2_4.content')}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;