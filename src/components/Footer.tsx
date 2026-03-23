import { useState } from "react";
import { Phone, MapPin, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import luxuryCarLogo from "@/assets/logoo.webp";

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
      )
    },
    legal: {
      title: t('legal.legal_notice.title'),
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t('legal.legal_notice.section_1_1.title')}</h3>
          <p>{t('legal.legal_notice.section_1_1.content')}</p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p><strong>{t('legal.legal_notice.section_1_1.owner')}:</strong> Luxury Car</p>
            <p><strong>{t('legal.legal_notice.section_1_1.address')}:</strong> {address.full}</p>
            <p><strong>{t('legal.legal_notice.section_1_1.phone')}:</strong> {getPhoneNumber()}</p>
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
          <p>{t('legal.cookies.section_3_2.content')}</p>
          <h3 className="text-lg font-semibold">{t('legal.cookies.section_3_3.title')}</h3>
          <p>{t('legal.cookies.section_3_3.content')}</p>
        </div>
      )
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-14">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img src={luxuryCarLogo} alt="Luxury Car Logo" className="h-10 object-contain" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.company_description')} {cityName}.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white uppercase tracking-wide">{t('footer.contact_title')}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone size={14} className="text-primary" />
                <span className="text-gray-400 text-sm">{getPhoneNumber()}</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={14} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">{address.full}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white uppercase tracking-wide">{t('footer.services_title')}</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>{t('footer.services_list.vehicle_sales')}</li>
              <li>{t('footer.services_list.vehicle_purchase')}</li>
              <li>{t('footer.services_list.financing')}</li>
              <li>{t('footer.services_list.delivery')}</li>
              <li>{t('footer.services_list.vip_service')}</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white uppercase tracking-wide">{t('footer.hours_title')}</h3>
            <div className="space-y-2 text-gray-400 text-sm">
              <div className="flex items-center space-x-2">
                <Clock size={14} className="text-primary" />
                <span>{t('footer.hours.weekday')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={14} className="text-primary" />
                <span>{t('footer.hours.sunday')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              {t('footer.copyright')}{' '}<a href="https://infinit.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300 transition-colors">INFINIT</a>
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <button onClick={() => setOpenModal('legal')} className="hover:text-gray-300 transition-colors">{t('footer.legal.legal_notice')}</button>
              <span>·</span>
              <button onClick={() => setOpenModal('privacy')} className="hover:text-gray-300 transition-colors">{t('footer.legal.privacy_policy')}</button>
              <span>·</span>
              <button onClick={() => setOpenModal('terms')} className="hover:text-gray-300 transition-colors">{t('footer.legal.terms_conditions')}</button>
              <span>·</span>
              <button onClick={() => setOpenModal('cookies')} className="hover:text-gray-300 transition-colors">{t('footer.legal.cookies')}</button>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Modals */}
      {Object.entries(legalContent).map(([key, content]) => (
        <Dialog key={key} open={openModal === key} onOpenChange={() => setOpenModal(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">{content.title}</DialogTitle>
            </DialogHeader>
            <div className="mt-4 text-sm text-muted-foreground">{content.content}</div>
          </DialogContent>
        </Dialog>
      ))}
    </footer>
  );
};

export default Footer;
