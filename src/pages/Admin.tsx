import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Edit, LogOut, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface News {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string;
  author: string;
  created_at: string;
}

const categories = ["Política", "Economia", "Cultura", "Segurança", "Saúde", "Educação"];

const Admin = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<News[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("Redação Pilar em Foco");

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (!session) {
          navigate("/auth");
        } else {
          setTimeout(() => {
            checkAdminRole(session.user.id);
          }, 0);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      } else {
        checkAdminRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminRole = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    
    setIsAdmin(!!data);
    setLoading(false);
    
    if (data) {
      fetchNews();
    }
  };

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching news:", error);
    } else {
      setNews(data || []);
    }
  };

  useEffect(() => {
    const channel = supabase
      .channel("news-changes")
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingId) {
        const { error } = await supabase
          .from("news")
          .update({ title, excerpt, content, category, image_url: imageUrl, author })
          .eq("id", editingId);

        if (error) throw error;
        toast({ title: "Notícia atualizada com sucesso!" });
      } else {
        const { error } = await supabase
          .from("news")
          .insert([{ title, excerpt, content, category, image_url: imageUrl, author }]);

        if (error) throw error;
        toast({ title: "Notícia publicada com sucesso!" });
      }

      resetForm();
      fetchNews();
    } catch (error: any) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item: News) => {
    setEditingId(item.id);
    setTitle(item.title);
    setExcerpt(item.excerpt);
    setContent(item.content);
    setCategory(item.category);
    setImageUrl(item.image_url);
    setAuthor(item.author);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta notícia?")) return;

    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) {
      toast({ title: "Erro ao excluir", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Notícia excluída com sucesso!" });
      fetchNews();
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setExcerpt("");
    setContent("");
    setCategory("");
    setImageUrl("");
    setAuthor("Redação Pilar em Foco");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">
            Acesso Restrito
          </h1>
          <p className="text-muted-foreground mb-6">
            Você não tem permissão para acessar o painel administrativo. 
            Entre em contato com o administrador para solicitar acesso.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
            <Link to="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Site
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary/50 border-b border-border py-4">
        <div className="container flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold">
              <span className="text-foreground">Pilar</span>{" "}
              <span className="text-accent">Em</span>{" "}
              <span className="text-primary">Foco</span>
              <span className="text-muted-foreground ml-2">| Admin</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Ver Site
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-secondary/30 border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              {editingId ? "Editar Notícia" : "Nova Notícia"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Título da notícia"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Resumo</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Breve resumo da notícia"
                  required
                  className="mt-1"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="content">Conteúdo</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Conteúdo completo da notícia"
                  required
                  className="mt-1"
                  rows={8}
                />
              </div>

              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="imageUrl">URL da Imagem</Label>
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="author">Autor</Label>
                <Input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Nome do autor"
                  className="mt-1"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingId ? "Atualizar" : "Publicar"}
                </Button>
                {editingId && (
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancelar
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* News List */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">
              Notícias Publicadas ({news.length})
            </h2>

            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="bg-secondary/30 border border-border rounded-lg p-4"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-primary font-medium">
                        {item.category}
                      </span>
                      <h3 className="font-medium text-foreground line-clamp-2 text-sm">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(item.created_at).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {news.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhuma notícia publicada ainda.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
