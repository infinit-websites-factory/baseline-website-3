import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import infinitCarsLogo from "@/assets/logo-INFINIT-black-background.png";
import LanguageSelector from "./LanguageSelector";

const Footer = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const { getPhoneNumber, getAddress, getCityName, t } = useLanguage();
  const address = getAddress();
  const cityName = getCityName();

  const legalContent = {
    privacy: {
      title: t('legal.privacy_policy.title'),
      content: (
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
      )
    },
    legal: {
      title: t('legal.legal_notice.title'),
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t('legal.legal_notice.section_1_1.title')}</h3>
          <p>{t('legal.legal_notice.section_1_1.content')}</p>
          <div className="bg-muted/50 p-4 rounded-lg">
            <p><strong>{t('legal.legal_notice.section_1_1.owner')}:</strong> INFINIT Cars</p>
            <p><strong>{t('legal.legal_notice.section_1_1.address')}:</strong> {address.full}</p>
            <p><strong>{t('legal.legal_notice.section_1_1.phone')}:</strong> {getPhoneNumber()}</p>
            <p><strong>{t('legal.legal_notice.section_1_1.email')}:</strong> contact@infinit.com</p>
          </div>

          <h3 className="text-lg font-semibold">{t('legal.legal_notice.section_1_2.title')}</h3>
          <p>{t('legal.legal_notice.section_1_2.content')}</p>
          <ul className="list-disc pl-6 space-y-1">
            {t('legal.legal_notice.section_1_2.items', { returnObjects: true }).map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold">{t('legal.legal_notice.section_1_3.title')}</h3>
          <p>{t('legal.legal_notice.section_1_3.content')}</p>

          <h3 className="text-lg font-semibold">{t('legal.legal_notice.section_1_4.title')}</h3>
          <p>{t('legal.legal_notice.section_1_4.content')}</p>

          <h3 className="text-lg font-semibold">{t('legal.legal_notice.section_1_5.title')}</h3>
          <p>{t('legal.legal_notice.section_1_5.content_prefix')} {cityName}{t('legal.legal_notice.section_1_5.content_suffix')}</p>
        </div>
      )
    },
    terms: {
      title: t('legal.terms_conditions.title'),
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t('legal.terms_conditions.section_4_1.title')}</h3>
          <p>{t('legal.terms_conditions.section_4_1.intro')}</p>
          <ul className="list-disc pl-6 space-y-1">
            {t('legal.terms_conditions.section_4_1.items', { returnObjects: true }).map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold">{t('legal.terms_conditions.section_4_2.title')}</h3>
          <ul className="list-disc pl-6 space-y-1">
            {t('legal.terms_conditions.section_4_2.items', { returnObjects: true }).map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold">{t('legal.terms_conditions.section_4_3.title')}</h3>
          <p>{t('legal.terms_conditions.section_4_3.content')}</p>

          <h3 className="text-lg font-semibold">{t('legal.terms_conditions.section_4_4.title')}</h3>
          <p>{t('legal.terms_conditions.section_4_4.content')}</p>

          <h3 className="text-lg font-semibold">{t('legal.terms_conditions.section_4_5.title')}</h3>
          <p>{t('legal.terms_conditions.section_4_5.content')}</p>

          <h3 className="text-lg font-semibold">{t('legal.terms_conditions.section_4_6.title')}</h3>
          <p>{t('legal.terms_conditions.section_4_6.content_prefix')} {cityName}{t('legal.terms_conditions.section_4_6.content_suffix')}</p>
        </div>
      )
    },
    cookies: {
      title: t('legal.cookies.title'),
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t('legal.cookies.section_3_1.title')}</h3>
          <p>{t('legal.cookies.section_3_1.content')}</p>

          <h3 className="text-lg font-semibold">{t('legal.cookies.section_3_2.title')}</h3>
          <ul className="list-disc pl-6 space-y-1">
            {t('legal.cookies.section_3_2.items', { returnObjects: true }).map((item: { type: string; description: string }, index: number) => (
              <li key={index}><strong>{item.type}</strong> {item.description}</li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold">{t('legal.cookies.section_3_3.title')}</h3>
          <p>{t('legal.cookies.section_3_3.content')}</p>
        </div>
      )
    }
  };

  return (
    <footer className="bg-[#111] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img
                src={infinitCarsLogo}
                alt="INFINIT Cars Logo"
                className="h-10 object-contain"
              />
            </div>
            <p className="text-white/70 mb-4">
              {t('footer.company_description')} {cityName}.
            </p>
            <LanguageSelector />
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.contact_title')}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-white" />
                <span className="text-white/70">{getPhoneNumber()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-white" />
                <span className="text-white/70">contact@infinit.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="text-white flex-shrink-0 mt-0.5" />
                <span className="text-white/70">{address.full}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.services_title')}</h3>
            <ul className="space-y-2 text-white/70">
              <li>{t('footer.services_list.vehicle_sales')}</li>
              <li>{t('footer.services_list.vehicle_purchase')}</li>
              <li>{t('footer.services_list.financing')}</li>
              <li>{t('footer.services_list.insurance')}</li>
              <li>{t('footer.services_list.extended_warranty')}</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.hours_title')}</h3>
            <div className="space-y-2 text-white/70">
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-white" />
                <span>{t('footer.hours.weekday')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-white" />
                <span>{t('footer.hours.saturday')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-white" />
                <span>{t('footer.hours.sunday')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70">
              {t('footer.copyright')} <a href="https://infinit.com/" target="_blank" rel="noopener noreferrer" className="underline">INFINIT</a>
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-4 text-sm text-white/70">
              <button
                onClick={() => setOpenModal('legal')}
                className="hover:text-gray-400 transition-colors"
              >
                {t('footer.legal.legal_notice')}
              </button>
              <span>•</span>
              <button
                onClick={() => setOpenModal('privacy')}
                className="hover:text-gray-400 transition-colors"
              >
                {t('footer.legal.privacy_policy')}
              </button>
              <span>•</span>
              <button
                onClick={() => setOpenModal('terms')}
                className="hover:text-gray-400 transition-colors"
              >
                {t('footer.legal.terms_conditions')}
              </button>
              <span>•</span>
              <button
                onClick={() => setOpenModal('cookies')}
                className="hover:text-gray-400 transition-colors"
              >
                {t('footer.legal.cookies')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Modals */}
      {Object.entries(legalContent).map(([key, content]) => (
        <Dialog
          key={key}
          open={openModal === key}
          onOpenChange={() => setOpenModal(null)}
        >
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">{content.title}</DialogTitle>
            </DialogHeader>
            <div className="mt-4 text-sm text-muted-foreground">
              {content.content}
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </footer>
  );
};

export default Footer;
