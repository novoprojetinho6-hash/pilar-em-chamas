import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, Phone } from "lucide-react";
import { Button } from "./ui/button";

const categories = [
  { name: "Início", path: "/" },
  { name: "Política", path: "/#politica" },
  { name: "Economia", path: "/#economia" },
  { name: "Cultura", path: "/#cultura" },
  { name: "Segurança", path: "/#seguranca" },
  { name: "Saúde", path: "/#saude" },
  { name: "Educação", path: "/#educacao" },
  { name: "Denúncia", path: "/denuncia", highlight: true },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      {/* Top bar with date */}
      <div className="container py-3 flex items-center justify-between">
        <span className="text-sm text-muted-foreground capitalize">
          {currentDate}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Buscar"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Search bar */}
      {isSearchOpen && (
        <div className="container py-3 border-t border-border animate-fade-in">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Buscar notícias..."
              className="w-full bg-secondary rounded-lg py-3 px-4 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      )}

      {/* Logo section */}
      <div className="container py-6 text-center border-t border-border/50">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="text-foreground">Pilar</span>{" "}
          <span className="text-accent text-glow-red">Em</span>{" "}
          <span className="text-primary text-glow">Foco</span>
        </h1>
        <p className="mt-2 text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground font-display">
          Portal de Notícias de Pilar do Sul
        </p>
      </div>

      {/* Navigation */}
      <nav className="border-t border-border bg-secondary/50">
        <div className="container">
          {/* Desktop nav */}
          <ul className="hidden md:flex items-center justify-center gap-1">
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  to={category.path}
                  className={`block px-4 py-3 text-sm font-medium transition-colors uppercase tracking-wide ${
                    category.highlight
                      ? "text-accent hover:text-accent/80 hover:bg-accent/10 flex items-center gap-2"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  {category.highlight && <Phone className="h-4 w-4" />}
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile nav */}
          {isMenuOpen && (
            <ul className="md:hidden py-2 animate-fade-in">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.path}
                    className={`block px-4 py-3 text-sm font-medium transition-colors uppercase tracking-wide ${
                      category.highlight
                        ? "text-accent hover:text-accent/80 hover:bg-accent/10 flex items-center gap-2"
                        : "text-foreground/80 hover:text-primary hover:bg-primary/10"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.highlight && <Phone className="h-4 w-4" />}
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
