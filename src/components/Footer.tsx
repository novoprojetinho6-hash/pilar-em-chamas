import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold mb-4">
              <span className="text-foreground">Pilar</span>{" "}
              <span className="text-accent">Em</span>{" "}
              <span className="text-primary text-glow">Foco</span>
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-md">
              O portal de notícias mais completo de Pilar do Sul. Cobertura local de qualidade, 
              trazendo informação e transparência para nossa comunidade.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-secondary rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-secondary rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-secondary rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-secondary rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display text-lg font-bold text-foreground mb-4">Categorias</h3>
            <ul className="space-y-2">
              {["Política", "Economia", "Cultura", "Segurança", "Saúde", "Denúncia"].map((cat) => (
                <li key={cat}>
                  <a href={cat === "Denúncia" ? "/denuncia" : "#"} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-bold text-foreground mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span>Pilar do Sul, SP</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>(15) 99999-9999</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>contato@pilaremfoco.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Pilar Em Foco. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
