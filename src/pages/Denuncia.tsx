import { Phone, Shield, AlertTriangle, Stethoscope, Dog, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const emergencyContacts = [
  {
    title: "Denúncia Anônima",
    number: "(15) 98167-8810",
    icon: AlertTriangle,
    description: "Faça sua denúncia de forma anônima e segura",
    highlight: true,
  },
  {
    title: "Polícia Militar",
    number: "190",
    icon: Shield,
    description: "Emergências policiais",
    highlight: false,
  },
  {
    title: "GCM - Guarda Civil Municipal",
    number: "(15) 99732-8154",
    icon: Users,
    description: "Segurança municipal",
    highlight: false,
  },
  {
    title: "SAMU",
    number: "192",
    icon: Stethoscope,
    description: "Serviço de Atendimento Móvel de Urgência",
    highlight: false,
  },
  {
    title: "Polícia Civil",
    number: "197",
    icon: Shield,
    description: "Registro de ocorrências e investigações",
    highlight: false,
  },
  {
    title: "Zoonoses",
    number: "(15) 98155-6703",
    icon: Dog,
    description: "Controle de zoonoses e animais",
    highlight: false,
  },
  {
    title: "Disque Denúncia - Mulher",
    number: "180",
    icon: Phone,
    description: "Central de Atendimento à Mulher",
    highlight: false,
  },
];

const Denuncia = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="text-primary text-glow">Denúncias</span> e Emergências
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Números importantes para denúncias e emergências em Pilar do Sul.
            Em caso de emergência, ligue imediatamente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {emergencyContacts.map((contact) => {
            const Icon = contact.icon;
            return (
              <div
                key={contact.title}
                className={`p-6 rounded-xl border transition-all hover:scale-105 ${
                  contact.highlight
                    ? "bg-accent/20 border-accent shadow-glow"
                    : "bg-gradient-card border-border hover:border-primary/50"
                }`}
              >
                <div className={`inline-flex p-3 rounded-lg mb-4 ${
                  contact.highlight ? "bg-accent/30" : "bg-primary/20"
                }`}>
                  <Icon className={`h-6 w-6 ${contact.highlight ? "text-accent" : "text-primary"}`} />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {contact.title}
                </h3>
                <a
                  href={`tel:${contact.number.replace(/\D/g, "")}`}
                  className={`block text-2xl font-bold mb-2 hover:underline ${
                    contact.highlight ? "text-accent" : "text-primary"
                  }`}
                >
                  {contact.number}
                </a>
                <p className="text-sm text-muted-foreground">{contact.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center p-6 bg-secondary/50 rounded-xl max-w-2xl mx-auto">
          <AlertTriangle className="h-8 w-8 text-accent mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold text-foreground mb-2">
            Importante
          </h2>
          <p className="text-muted-foreground">
            Utilize os números acima apenas para situações reais. Trotes são crimes
            e prejudicam quem realmente precisa de ajuda.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Denuncia;
