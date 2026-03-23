import { Button } from "@/components/ui/button";
import { Phone, Menu, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "react-router-dom";
import luxuryCarLogo from "@/assets/logoo.webp";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const Header = () => {
  const { getPhoneNumber, getAddress, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const address = getAddress();

  const navigationLinks = [
    { href: "/", label: t('header.home') },
    { href: "/stock", label: t('header.vehicles') },
    { href: "/sell", label: t('header.sell_your_car') },
    { href: "/financing", label: t('header.financing') },
    { href: "/services", label: t('header.services') },
    { href: "/contact", label: t('header.contact') },
  ];

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm">
      {/* Top bar: contact info */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto max-w-7xl px-4 py-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="hidden md:flex items-center gap-6">
              <a href={`tel:${getPhoneNumber()}`} className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <Phone size={12} />
                <span>{getPhoneNumber()}</span>
              </a>
              <a href={address.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <MapPin size={12} />
                <span>{address.city}</span>
              </a>
              <div className="flex items-center gap-1.5">
                <Clock size={12} />
                <span>{t('footer.hours.weekday')}</span>
              </div>
            </div>
            <a href={`tel:${getPhoneNumber()}`} className="md:hidden flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Phone size={12} />
              <span>{getPhoneNumber()}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main bar: logo + nav + CTA */}
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="hover:opacity-80 transition-opacity pr-3">
            <img
              src={luxuryCarLogo}
              alt="Luxury Car Logo"
              className="h-10 object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-primary bg-primary/5 font-semibold"
                      : "text-gray-600 hover:text-foreground hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-3">
            <Button className="hidden sm:flex items-center gap-2" asChild>
              <a href={`tel:${getPhoneNumber()}`}>
                <Phone size={16} />
                {t('common.call_now')}
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground"
              onClick={() => setIsOpen(true)}
            >
              <Menu size={22} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="bg-white">
          <SheetHeader>
            <SheetTitle className="text-foreground text-left">{t('common.menu')}</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-1 mt-6">
            {navigationLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-base px-3 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "text-primary bg-primary/5 font-semibold"
                      : "text-gray-600 hover:text-foreground hover:bg-gray-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="pt-4">
              <Button className="w-full items-center gap-2" asChild>
                <a href={`tel:${getPhoneNumber()}`}>
                  <Phone size={16} />
                  {t('common.call_now')}
                </a>
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
