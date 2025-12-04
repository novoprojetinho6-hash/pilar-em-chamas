import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Handshake, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Parceiros = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nossos <span className="text-primary text-glow">Parceiros</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Empresas e organizações que apoiam o jornalismo local em Pilar do Sul.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-secondary/50 border border-border rounded-xl p-12 text-center">
            <Handshake className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Seja um Parceiro
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Quer divulgar sua empresa ou negócio para milhares de leitores em 
              Pilar do Sul? Entre em contato conosco e faça parte da nossa rede de parceiros.
            </p>
            <Button variant="cta" size="lg">
              <Mail className="mr-2 h-5 w-5" />
              Entrar em Contato
            </Button>
          </div>

          <div className="mt-12 text-center">
            <h3 className="font-display text-xl font-bold text-foreground mb-6">
              Benefícios de ser Parceiro
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-card border border-border rounded-xl p-6">
                <h4 className="font-bold text-foreground mb-2">Visibilidade</h4>
                <p className="text-sm text-muted-foreground">
                  Sua marca exposta para milhares de leitores diariamente
                </p>
              </div>
              <div className="bg-gradient-card border border-border rounded-xl p-6">
                <h4 className="font-bold text-foreground mb-2">Credibilidade</h4>
                <p className="text-sm text-muted-foreground">
                  Associação com o principal portal de notícias da região
                </p>
              </div>
              <div className="bg-gradient-card border border-border rounded-xl p-6">
                <h4 className="font-bold text-foreground mb-2">Alcance Local</h4>
                <p className="text-sm text-muted-foreground">
                  Foco no público de Pilar do Sul e região
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Parceiros;
