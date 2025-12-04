import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users } from "lucide-react";

const vereadores = [
  { name: "Em breve", party: "Informações serão adicionadas", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" },
];

const Vereadores = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="text-primary text-glow">Vereadores</span> de Pilar do Sul
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Conheça os vereadores que representam a população de Pilar do Sul na Câmara Municipal.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-secondary/50 border border-border rounded-xl p-12 text-center">
            <Users className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Em Construção
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Estamos trabalhando para trazer informações detalhadas sobre todos os 
              vereadores de Pilar do Sul. Em breve você poderá conhecer os representantes 
              da nossa cidade.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Vereadores;
