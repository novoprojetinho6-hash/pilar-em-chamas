import { useState, useEffect } from "react";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import CategoryBadge from "@/components/CategoryBadge";
import { TrendingUp, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { allNews as staticNews } from "@/data/news";
import { supabase } from "@/integrations/supabase/client";

const categories = ["Todas", "Política", "Economia", "Cultura", "Segurança", "Saúde", "Educação"];

interface NewsItem {
  id: string | number;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  date: string;
  author?: string;
}

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [allNews, setAllNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const { data: dbNews } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });

      const formattedDbNews: NewsItem[] = (dbNews || []).map((n) => ({
        id: n.id,
        title: n.title,
        excerpt: n.excerpt,
        category: n.category,
        imageUrl: n.image_url,
        date: new Date(n.created_at).toLocaleDateString("pt-BR"),
        author: n.author,
      }));

      const formattedStaticNews: NewsItem[] = staticNews.map((n) => ({
        id: n.id,
        title: n.title,
        excerpt: n.excerpt,
        category: n.category,
        imageUrl: n.imageUrl,
        date: n.date,
        author: n.author,
      }));

      setAllNews([...formattedDbNews, ...formattedStaticNews]);
    };

    fetchNews();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("news-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "news" },
        () => {
          fetchNews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const featuredNews = allNews.slice(0, 2);
  const latestNews = allNews.slice(2);

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
                <NewsCard {...news} id={typeof news.id === "string" ? 0 : news.id} featured />
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
                <NewsCard {...news} id={typeof news.id === "string" ? 0 : news.id} />
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
