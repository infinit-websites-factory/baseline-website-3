import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import infinitCarsLogo from "@/assets/infinit-cars-logo.png";

const Header = () => {
  return (
    <header className="bg-nav-background text-nav-foreground border-b border-border/10">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img
              src={infinitCarsLogo}
              alt="INFINIT Cars Logo"
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold">INFINIT Cars</h1>
            </div>
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/stock" className="text-nav-foreground hover:text-primary transition-colors">
              Vehículos de ocasión
            </a>
            <a href="/sell" className="text-nav-foreground hover:text-primary transition-colors">
              Vende tu coche
            </a>
            <a href="/financing" className="text-nav-foreground hover:text-primary transition-colors">
              Financiación
            </a>
            <a href="/services" className="text-nav-foreground hover:text-primary transition-colors">
              Servicios
            </a>
            <a href="/contact" className="text-nav-foreground hover:text-primary transition-colors">
              Contacto
            </a>
          </nav>

          {/* CTA Button */}
          <Button variant="premium" className="hidden md:flex items-center gap-2" asChild>
            <a href="tel:690715080">
              <Phone size={16} />
              Llama ahora
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;