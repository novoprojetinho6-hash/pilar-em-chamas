import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Edit, LogOut, ArrowLeft, Upload, Image, Video, Newspaper, Megaphone } from "lucide-react";
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

interface Advertisement {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  video_url: string | null;
  link: string | null;
  phone: string;
  is_active: boolean;
  created_at: string;
}

const categories = ["Política", "Economia", "Cultura", "Segurança", "Saúde", "Educação"];

const Adm = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<News[]>([]);
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // News form state
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsExcerpt, setNewsExcerpt] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [newsCategory, setNewsCategory] = useState("");
  const [newsImageUrl, setNewsImageUrl] = useState("");
  const [newsAuthor, setNewsAuthor] = useState("Redação Pilar em Foco");

  // Ad form state
  const [editingAdId, setEditingAdId] = useState<string | null>(null);
  const [adTitle, setAdTitle] = useState("");
  const [adDescription, setAdDescription] = useState("");
  const [adImageUrl, setAdImageUrl] = useState("");
  const [adVideoUrl, setAdVideoUrl] = useState("");
  const [adLink, setAdLink] = useState("");
  const [adPhone, setAdPhone] = useState("");
  const [adIsActive, setAdIsActive] = useState(true);

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
      fetchAds();
    }
  };

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setNews(data || []);
  };

  const fetchAds = async () => {
    const { data, error } = await supabase
      .from("advertisements")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setAds(data || []);
  };

  useEffect(() => {
    const newsChannel = supabase
      .channel("news-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "news" }, fetchNews)
      .subscribe();

    const adsChannel = supabase
      .channel("ads-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "advertisements" }, fetchAds)
      .subscribe();

    return () => {
      supabase.removeChannel(newsChannel);
      supabase.removeChannel(adsChannel);
    };
  }, []);

  const uploadFile = async (file: File, type: 'image' | 'video'): Promise<string | null> => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${type}s/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('media').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error: any) {
      toast({ title: "Erro no upload", description: error.message, variant: "destructive" });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'news' | 'ad') => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const url = await uploadFile(file, 'image');
    if (url) {
      if (target === 'news') setNewsImageUrl(url);
      else setAdImageUrl(url);
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const url = await uploadFile(file, 'video');
    if (url) setAdVideoUrl(url);
  };

  // News handlers
  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingNewsId) {
        const { error } = await supabase
          .from("news")
          .update({ 
            title: newsTitle, 
            excerpt: newsExcerpt, 
            content: newsContent, 
            category: newsCategory, 
            image_url: newsImageUrl, 
            author: newsAuthor 
          })
          .eq("id", editingNewsId);

        if (error) throw error;
        toast({ title: "Notícia atualizada com sucesso!" });
      } else {
        const { error } = await supabase
          .from("news")
          .insert([{ 
            title: newsTitle, 
            excerpt: newsExcerpt, 
            content: newsContent, 
            category: newsCategory, 
            image_url: newsImageUrl, 
            author: newsAuthor 
          }]);

        if (error) throw error;
        toast({ title: "Notícia publicada com sucesso!" });
      }

      resetNewsForm();
    } catch (error: any) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditNews = (item: News) => {
    setEditingNewsId(item.id);
    setNewsTitle(item.title);
    setNewsExcerpt(item.excerpt);
    setNewsContent(item.content);
    setNewsCategory(item.category);
    setNewsImageUrl(item.image_url);
    setNewsAuthor(item.author);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta notícia?")) return;

    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) {
      toast({ title: "Erro ao excluir", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Notícia excluída!" });
    }
  };

  const resetNewsForm = () => {
    setEditingNewsId(null);
    setNewsTitle("");
    setNewsExcerpt("");
    setNewsContent("");
    setNewsCategory("");
    setNewsImageUrl("");
    setNewsAuthor("Redação Pilar em Foco");
  };

  // Ad handlers
  const handleAdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const adData = {
        title: adTitle,
        description: adDescription || null,
        image_url: adImageUrl || null,
        video_url: adVideoUrl || null,
        link: adLink || null,
        phone: adPhone,
        is_active: adIsActive
      };

      if (editingAdId) {
        const { error } = await supabase
          .from("advertisements")
          .update(adData)
          .eq("id", editingAdId);

        if (error) throw error;
        toast({ title: "Anúncio atualizado!" });
      } else {
        const { error } = await supabase
          .from("advertisements")
          .insert([adData]);

        if (error) throw error;
        toast({ title: "Anúncio publicado!" });
      }

      resetAdForm();
    } catch (error: any) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditAd = (item: Advertisement) => {
    setEditingAdId(item.id);
    setAdTitle(item.title);
    setAdDescription(item.description || "");
    setAdImageUrl(item.image_url || "");
    setAdVideoUrl(item.video_url || "");
    setAdLink(item.link || "");
    setAdPhone(item.phone);
    setAdIsActive(item.is_active);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteAd = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este anúncio?")) return;

    const { error } = await supabase.from("advertisements").delete().eq("id", id);
    if (error) {
      toast({ title: "Erro ao excluir", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Anúncio excluído!" });
    }
  };

  const resetAdForm = () => {
    setEditingAdId(null);
    setAdTitle("");
    setAdDescription("");
    setAdImageUrl("");
    setAdVideoUrl("");
    setAdLink("");
    setAdPhone("");
    setAdIsActive(true);
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
              <span className="text-muted-foreground ml-2">| Painel Admin</span>
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
        <Tabs defaultValue="news" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="news" className="flex items-center gap-2">
              <Newspaper className="h-4 w-4" />
              Notícias
            </TabsTrigger>
            <TabsTrigger value="ads" className="flex items-center gap-2">
              <Megaphone className="h-4 w-4" />
              Anúncios
            </TabsTrigger>
          </TabsList>

          {/* News Tab */}
          <TabsContent value="news">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-secondary/30 border border-border rounded-xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  {editingNewsId ? "Editar Notícia" : "Nova Notícia"}
                </h2>

                <form onSubmit={handleNewsSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="newsTitle">Título</Label>
                    <Input
                      id="newsTitle"
                      value={newsTitle}
                      onChange={(e) => setNewsTitle(e.target.value)}
                      placeholder="Título da notícia"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="newsExcerpt">Resumo</Label>
                    <Textarea
                      id="newsExcerpt"
                      value={newsExcerpt}
                      onChange={(e) => setNewsExcerpt(e.target.value)}
                      placeholder="Breve resumo da notícia"
                      required
                      className="mt-1"
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor="newsContent">Conteúdo</Label>
                    <Textarea
                      id="newsContent"
                      value={newsContent}
                      onChange={(e) => setNewsContent(e.target.value)}
                      placeholder="Conteúdo completo da notícia"
                      required
                      className="mt-1"
                      rows={6}
                    />
                  </div>

                  <div>
                    <Label htmlFor="newsCategory">Categoria</Label>
                    <Select value={newsCategory} onValueChange={setNewsCategory} required>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Imagem</Label>
                    <div className="mt-1 space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={newsImageUrl}
                          onChange={(e) => setNewsImageUrl(e.target.value)}
                          placeholder="URL da imagem ou faça upload"
                          className="flex-1"
                        />
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(e, 'news')}
                          />
                          <Button type="button" variant="outline" disabled={uploading} asChild>
                            <span>
                              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                            </span>
                          </Button>
                        </label>
                      </div>
                      {newsImageUrl && (
                        <img src={newsImageUrl} alt="Preview" className="h-32 object-cover rounded" />
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="newsAuthor">Autor</Label>
                    <Input
                      id="newsAuthor"
                      value={newsAuthor}
                      onChange={(e) => setNewsAuthor(e.target.value)}
                      placeholder="Nome do autor"
                      className="mt-1"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1" disabled={isSubmitting}>
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {editingNewsId ? "Atualizar" : "Publicar"}
                    </Button>
                    {editingNewsId && (
                      <Button type="button" variant="outline" onClick={resetNewsForm}>
                        Cancelar
                      </Button>
                    )}
                  </div>
                </form>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Notícias ({news.length})
                </h2>
                <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
                  {news.map((item) => (
                    <div key={item.id} className="bg-secondary/30 border border-border rounded-lg p-4">
                      <div className="flex gap-4">
                        <img src={item.image_url} alt={item.title} className="w-20 h-20 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs text-primary font-medium">{item.category}</span>
                          <h3 className="font-medium text-foreground line-clamp-2 text-sm">{item.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(item.created_at).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEditNews(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteNews(item.id)} className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {news.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">Nenhuma notícia publicada.</div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Ads Tab */}
          <TabsContent value="ads">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-secondary/30 border border-border rounded-xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  {editingAdId ? "Editar Anúncio" : "Novo Anúncio"}
                </h2>

                <form onSubmit={handleAdSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="adTitle">Título do Anúncio *</Label>
                    <Input
                      id="adTitle"
                      value={adTitle}
                      onChange={(e) => setAdTitle(e.target.value)}
                      placeholder="Nome do anunciante ou título"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="adDescription">Descrição</Label>
                    <Textarea
                      id="adDescription"
                      value={adDescription}
                      onChange={(e) => setAdDescription(e.target.value)}
                      placeholder="Descrição do anúncio"
                      className="mt-1"
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor="adPhone">WhatsApp do Anunciante *</Label>
                    <Input
                      id="adPhone"
                      value={adPhone}
                      onChange={(e) => setAdPhone(e.target.value)}
                      placeholder="15 99999-9999"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="adLink">Link (opcional)</Label>
                    <Input
                      id="adLink"
                      value={adLink}
                      onChange={(e) => setAdLink(e.target.value)}
                      placeholder="https://site-do-anunciante.com"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="flex items-center gap-2">
                      <Image className="h-4 w-4" />
                      Imagem
                    </Label>
                    <div className="mt-1 space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={adImageUrl}
                          onChange={(e) => setAdImageUrl(e.target.value)}
                          placeholder="URL ou faça upload"
                          className="flex-1"
                        />
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(e, 'ad')}
                          />
                          <Button type="button" variant="outline" disabled={uploading} asChild>
                            <span>
                              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                            </span>
                          </Button>
                        </label>
                      </div>
                      {adImageUrl && (
                        <img src={adImageUrl} alt="Preview" className="h-32 object-cover rounded" />
                      )}
                    </div>
                  </div>

                  <div>
                    <Label className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Vídeo
                    </Label>
                    <div className="mt-1 space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={adVideoUrl}
                          onChange={(e) => setAdVideoUrl(e.target.value)}
                          placeholder="URL ou faça upload"
                          className="flex-1"
                        />
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={handleVideoUpload}
                          />
                          <Button type="button" variant="outline" disabled={uploading} asChild>
                            <span>
                              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                            </span>
                          </Button>
                        </label>
                      </div>
                      {adVideoUrl && (
                        <video src={adVideoUrl} className="h-32 rounded" controls />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Switch
                      id="adActive"
                      checked={adIsActive}
                      onCheckedChange={setAdIsActive}
                    />
                    <Label htmlFor="adActive">Anúncio ativo</Label>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1" disabled={isSubmitting}>
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {editingAdId ? "Atualizar" : "Publicar"}
                    </Button>
                    {editingAdId && (
                      <Button type="button" variant="outline" onClick={resetAdForm}>
                        Cancelar
                      </Button>
                    )}
                  </div>
                </form>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Anúncios ({ads.length})
                </h2>
                <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
                  {ads.map((item) => (
                    <div key={item.id} className={`bg-secondary/30 border rounded-lg p-4 ${item.is_active ? 'border-primary/50' : 'border-border opacity-60'}`}>
                      <div className="flex gap-4">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.title} className="w-20 h-20 object-cover rounded" />
                        ) : item.video_url ? (
                          <video src={item.video_url} className="w-20 h-20 object-cover rounded" />
                        ) : (
                          <div className="w-20 h-20 bg-muted rounded flex items-center justify-center">
                            <Megaphone className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-foreground text-sm">{item.title}</h3>
                            {!item.is_active && <span className="text-xs bg-muted px-1.5 py-0.5 rounded">Inativo</span>}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{item.phone}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(item.created_at).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEditAd(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteAd(item.id)} className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {ads.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">Nenhum anúncio publicado.</div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Adm;
