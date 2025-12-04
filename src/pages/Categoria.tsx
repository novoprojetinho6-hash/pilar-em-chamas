import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import { supabase } from "@/integrations/supabase/client";
import { allNews as staticNews } from "@/data/news";
import { Loader2 } from "lucide-react";

interface NewsItem {
  id: string | number;
  title: string;
  excerpt: string;
  category: string;
  image_url?: string;
  imageUrl?: string;
  created_at?: string;
  date?: string;
}

const Categoria = () => {
  const { categoria } = useParams<{ categoria: string }>();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryName = categoria?.charAt(0).toUpperCase() + (categoria?.slice(1) || "");

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      
      // Fetch from database
      const { data: dbNews } = await supabase
        .from("news")
        .select("*")
        .eq("category", categoryName)
        .order("created_at", { ascending: false });

      // Filter static news
      const filteredStatic = staticNews
        .filter((n) => n.category === categoryName)
        .map((n) => ({
          ...n,
          id: n.id.toString(),
          image_url: n.imageUrl,
        }));

      // Combine both sources
      const combined = [...(dbNews || []), ...filteredStatic];
      setNews(combined);
      setLoading(false);
    };

    if (categoria) {
      fetchNews();
    }
  }, [categoria, categoryName]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12">
        <div className="mb-8">
          <Link to="/" className="text-primary hover:underline text-sm">
            ← Voltar para Início
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            <span className="text-primary text-glow">{categoryName}</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Todas as notícias de {categoryName} em Pilar do Sul
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : news.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <NewsCard
                key={item.id}
                id={typeof item.id === "string" ? parseInt(item.id) || 0 : item.id}
                title={item.title}
                excerpt={item.excerpt}
                category={item.category}
                imageUrl={item.image_url || item.imageUrl || ""}
                date={item.created_at ? new Date(item.created_at).toLocaleDateString("pt-BR") : item.date || ""}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhuma notícia encontrada para esta categoria.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Categoria;
