import { useState } from "react";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import CategoryBadge from "@/components/CategoryBadge";
import { TrendingUp, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = ["Todas", "Política", "Economia", "Esportes", "Cultura", "Segurança"];

const featuredNews = [
  {
    id: 1,
    title: "Prefeitura anuncia novo investimento em infraestrutura para 2025",
    excerpt: "Obras incluem pavimentação de ruas e melhorias no sistema de saneamento básico da cidade.",
    category: "Política",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=450&fit=crop",
    date: "Há 2 horas",
  },
  {
    id: 2,
    title: "Festival cultural movimenta economia local no fim de semana",
    excerpt: "Evento reuniu milhares de visitantes e impulsionou o comércio da região central.",
    category: "Cultura",
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=450&fit=crop",
    date: "Há 5 horas",
  },
];

const latestNews = [
  {
    id: 3,
    title: "Time local conquista título regional de futebol amador",
    excerpt: "Vitória histórica coloca Pilar do Sul no mapa do esporte regional.",
    category: "Esportes",
    imageUrl: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop",
    date: "Há 1 hora",
  },
  {
    id: 4,
    title: "Nova unidade de saúde será inaugurada no próximo mês",
    excerpt: "UBS vai atender moradores da zona rural com atendimento 24 horas.",
    category: "Saúde",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
    date: "Há 3 horas",
  },
  {
    id: 5,
    title: "Produtores rurais comemoram safra recorde de batata",
    excerpt: "Clima favorável e técnicas modernas garantiram aumento de 30% na produção.",
    category: "Economia",
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82ber38a?w=400&h=300&fit=crop",
    date: "Há 6 horas",
  },
  {
    id: 6,
    title: "Escola municipal conquista prêmio estadual de educação",
    excerpt: "Projeto de alfabetização foi reconhecido como um dos melhores do estado.",
    category: "Educação",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
    date: "Há 8 horas",
  },
  {
    id: 7,
    title: "Operação policial apreende veículos roubados na região",
    excerpt: "Ação integrada recuperou três carros que haviam sido furtados em cidades vizinhas.",
    category: "Segurança",
    imageUrl: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=400&h=300&fit=crop",
    date: "Há 10 horas",
  },
  {
    id: 8,
    title: "Câmara aprova projeto de lei para incentivo a pequenos empreendedores",
    excerpt: "Medida reduz impostos e oferece linhas de crédito especiais para microempresas.",
    category: "Política",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
    date: "Há 12 horas",
  },
];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("Todas");

  const filteredNews = activeCategory === "Todas"
    ? latestNews
    : latestNews.filter((news) => news.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Featured Section */}
        <section className="container py-8">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-accent" />
            <h2 className="font-display text-xl font-bold text-foreground uppercase tracking-wide">
              Em Destaque
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredNews.map((news, index) => (
              <div key={news.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <NewsCard {...news} featured />
              </div>
            ))}
          </div>
        </section>

        {/* Latest News Section */}
        <section className="container py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              <h2 className="font-display text-xl font-bold text-foreground uppercase tracking-wide">
                Últimas Notícias
              </h2>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <CategoryBadge
                  key={cat}
                  category={cat}
                  active={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNews.map((news, index) => (
              <div key={news.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <NewsCard {...news} />
              </div>
            ))}
          </div>

          {filteredNews.length > 0 && (
            <div className="text-center mt-8">
              <Button variant="outline" size="lg" className="group">
                Ver mais notícias
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
