import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle } from "lucide-react";

interface Advertisement {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  video_url: string | null;
  link: string | null;
  phone: string;
  is_active: boolean;
}

const formatWhatsAppNumber = (number: string): string => {
  const cleaned = number.replace(/\D/g, "");
  if (cleaned.startsWith("55")) return cleaned;
  return "55" + cleaned;
};

const AdvertisementBanner = () => {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchAds();

    const channel = supabase
      .channel("ads-public")
      .on("postgres_changes", { event: "*", schema: "public", table: "advertisements" }, fetchAds)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchAds = async () => {
    const { data } = await supabase
      .from("advertisements")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (data) setAds(data);
  };

  // Rotate ads every 5 seconds
  useEffect(() => {
    if (ads.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [ads.length]);

  const openWhatsApp = (phone: string, title: string) => {
    const formattedNumber = formatWhatsAppNumber(phone);
    const message = encodeURIComponent(`Olá! Vi o anúncio "${title}" no Pilar Em Foco e gostaria de mais informações.`);
    window.open(`https://wa.me/${formattedNumber}?text=${message}`, "_blank");
  };

  if (ads.length === 0) return null;

  const currentAd = ads[currentIndex];

  return (
    <div className="container py-3 border-t border-border/50">
      <div className="relative overflow-hidden rounded-lg border border-primary/30 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {ads.map((ad) => (
            <div key={ad.id} className="w-full flex-shrink-0">
              <div className="flex flex-col md:flex-row items-center gap-4 p-4">
                {/* Media */}
                {ad.image_url && (
                  <img 
                    src={ad.image_url} 
                    alt={ad.title} 
                    className="w-full md:w-32 h-24 md:h-20 object-cover rounded"
                  />
                )}
                {ad.video_url && !ad.image_url && (
                  <video 
                    src={ad.video_url} 
                    className="w-full md:w-32 h-24 md:h-20 object-cover rounded"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                )}

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-display font-bold text-foreground">{ad.title}</h3>
                  {ad.description && (
                    <p className="text-sm text-muted-foreground line-clamp-1">{ad.description}</p>
                  )}
                </div>

                {/* WhatsApp Button */}
                <button
                  onClick={() => openWhatsApp(ad.phone, ad.title)}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Indicators */}
        {ads.length > 1 && (
          <div className="flex justify-center gap-1.5 pb-2">
            {ads.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvertisementBanner;
