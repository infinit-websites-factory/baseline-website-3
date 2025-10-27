import { Button } from "@/components/ui/button";
import { Phone, Menu, X, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import infinitCarsLogo from "@/assets/logo-INFINIT-black-background.png";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const { getPhoneNumber, getAddress, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
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
    <header className="bg-nav-background text-nav-foreground border-b border-border/10">
      {/* Line 1: Logo, Address, Hours, Call Button */}
      <div className="bg-[#111] text-white border-b border-border/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="hover:opacity-80 transition-opacity">
              <img
                src={infinitCarsLogo}
                alt="INFINIT Cars Logo"
                className="h-12 object-contain"
              />
            </a>

            {/* Address & Hours - Desktop Only */}
            <div className="hidden lg:flex items-center gap-16 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-white mt-0.5 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="font-semibold text-white">{t('header.address')}</span>
                  <span className="text-white/70">{address.street}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={16} className="text-white mt-0.5 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="font-semibold text-white">{t('header.hours')}</span>
                  <span className="text-white/70">{t('footer.hours.weekday')}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone size={16} className="text-white mt-0.5 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="font-semibold text-white">{t('header.phone')}</span>
                  <span className="text-white/70">{getPhoneNumber()}</span>
                </div>
              </div>
            </div>

            {/* Call Button - Desktop */}
            <Button variant="premium" className="hidden md:flex items-center gap-2" asChild>
              <a href={`tel:${getPhoneNumber()}`}>
                <Phone size={16} />
                {t('common.call_now')}
              </a>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:text-gray-300"
              onClick={() => setIsOpen(true)}
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </div>

      {/* Line 2: Navigation Menu */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center space-x-8 py-4">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-nav-foreground hover:text-gray-600 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="bg-white">
          <SheetHeader>
            <SheetTitle className="text-foreground text-left">Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-6 mt-8">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-lg text-foreground hover:text-gray-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button variant="premium" className="w-full items-center gap-2 mt-4" asChild>
              <a href={`tel:${getPhoneNumber()}`}>
                <Phone size={16} />
                {t('common.call_now')}
              </a>
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;