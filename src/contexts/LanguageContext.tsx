import { createContext, useContext, useState, ReactNode } from "react";
import { translations, TranslationKey } from "@/translations";

export type Language = "es" | "en" | "fr";

interface AddressInfo {
  street: string;
  city: string;
  full: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  getPhoneNumber: () => string;
  getPhoneNumberWithPrefix: () => string;
  getWhatsAppNumber: () => string;
  getAddress: () => AddressInfo;
  getCityName: () => string;
  t: (key: TranslationKey, options?: { returnObjects?: boolean }) => any;
  translateVehicleAttribute: (category: 'fuel' | 'transmission' | 'body_type' | 'color', value: string) => string;
}

const PHONE_NUMBERS = {
  es: "+34689014399",
  en: "+447360497801",
  fr: "+33757941830",
};

const ADDRESSES: Record<Language, AddressInfo> = {
  es: {
    street: "Calle José Abascal 44, 6 izqº",
    city: "28003 Madrid, España",
    full: "Calle José Abascal 44, 6 izqº, 28003 Madrid, España",
    mapsUrl: "https://www.google.com/maps/place/Calle+de+Jos%C3%A9+Abascal,+44,+28003+Madrid,+Spain",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.5778999999997!2d-3.6936!3d40.4378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42287f5f5f5f5f5%3A0x5f5f5f5f5f5f5f5f!2sCalle%20de%20Jos%C3%A9%20Abascal%2C%2044%2C%2028003%20Madrid%2C%20Spain!5e0!3m2!1sen!2ses!4v1234567890123!5m2!1sen!2ses"
  },
  en: {
    street: "Unit GI.G01, 60 Gray's Inn Road",
    city: "WC1X 8LU London, United Kingdom",
    full: "Unit GI.G01, 60 Gray's Inn Road, WC1X 8LU London, United Kingdom",
    mapsUrl: "https://www.google.com/maps/place/60+Gray's+Inn+Rd,+London+WC1X+8LU,+UK",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.2!2d-0.1185!3d51.5246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b2f5f5f5f5f%3A0x5f5f5f5f5f5f5f5f!2s60%20Gray's%20Inn%20Rd%2C%20London%20WC1X%208LU%2C%20UK!5e0!3m2!1sen!2suk!4v1234567890123!5m2!1sen!2suk"
  },
  fr: {
    street: "37 rue du faubourg Poissonnière",
    city: "75009 Paris, France",
    full: "37 rue du faubourg Poissonnière, 75009 Paris, France",
    mapsUrl: "https://www.google.com/maps/place/37+Rue+du+Faubourg+Poissonni%C3%A8re,+75009+Paris,+France",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2!2d2.3488!3d48.8738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e3f5f5f5f5f%3A0x5f5f5f5f5f5f5f5f!2s37%20Rue%20du%20Faubourg%20Poissonni%C3%A8re%2C%2075009%20Paris%2C%20France!5e0!3m2!1sen!2sfr!4v1234567890123!5m2!1sen!2sfr"
  }
};

const formatPhoneNumber = (phone: string, language: Language): string => {
  // Remove the + sign for formatting
  const digits = phone.substring(1);

  switch (language) {
    case "es":
      // Spanish format: +34 689 01 43 99
      return `+34 ${digits.substring(2, 5)} ${digits.substring(5, 7)} ${digits.substring(7, 9)} ${digits.substring(9)}`;
    case "en":
      // UK format: +44 7360 497 801
      return `+44 ${digits.substring(2, 6)} ${digits.substring(6, 9)} ${digits.substring(9)}`;
    case "fr":
      // French format: +33 7 57 94 18 30
      return `+33 ${digits.substring(2, 3)} ${digits.substring(3, 5)} ${digits.substring(5, 7)} ${digits.substring(7, 9)} ${digits.substring(9)}`;
    default:
      return phone;
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get language from localStorage or default to Spanish
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage || "es";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const getPhoneNumber = () => {
    return formatPhoneNumber(PHONE_NUMBERS[language], language);
  };

  const getPhoneNumberWithPrefix = () => {
    return PHONE_NUMBERS[language];
  };

  const getWhatsAppNumber = () => {
    // WhatsApp format without '+' prefix
    return PHONE_NUMBERS[language].substring(1);
  };

  const getAddress = () => {
    return ADDRESSES[language];
  };

  const getCityName = () => {
    const cityNames = {
      es: "Madrid",
      en: "London",
      fr: "Paris"
    };
    return cityNames[language];
  };

  const t = (key: TranslationKey, options?: { returnObjects?: boolean }): any => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    // If returnObjects is true, return the value as-is (could be array or object)
    if (options?.returnObjects) {
      return value;
    }

    return typeof value === 'string' ? value : key;
  };

  const translateVehicleAttribute = (category: 'fuel' | 'transmission' | 'body_type' | 'color', value: string): string => {
    if (!value) return value;

    try {
      const translationKey = `vehicle_attributes.${category}.${value}` as TranslationKey;
      const translated = t(translationKey);

      // If translation key not found, return the original value
      if (translated === translationKey) {
        return value;
      }

      return translated;
    } catch {
      return value;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, getPhoneNumber, getPhoneNumberWithPrefix, getWhatsAppNumber, getAddress, getCityName, t, translateVehicleAttribute }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
