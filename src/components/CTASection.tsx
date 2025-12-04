import { Bell, Mail } from "lucide-react";
import { Button } from "./ui/button";

const CTASection = () => {
  return (
    <section className="py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-card border border-border p-8 md:p-12 text-center">
          {/* Glow effects */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-primary text-sm font-medium mb-6">
              <Bell className="h-4 w-4" />
              <span>Fique por dentro de tudo!</span>
            </div>
            
            <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-4">
              Receba as <span className="text-primary text-glow">Últimas Notícias</span>
            </h2>
            
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Inscreva-se e receba as principais notícias de Pilar do Sul diretamente no seu e-mail
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="w-full bg-secondary rounded-lg py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button variant="cta" size="lg">
                Inscrever
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
