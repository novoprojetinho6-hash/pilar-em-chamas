import { Clock } from "lucide-react";

interface NewsCardProps {
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  date: string;
  featured?: boolean;
}

const NewsCard = ({ title, excerpt, category, imageUrl, date, featured = false }: NewsCardProps) => {
  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-lg bg-gradient-card shadow-card hover-lift cursor-pointer">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-bold uppercase rounded mb-3">
            {category}
          </span>
          <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{excerpt}</p>
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <Clock className="h-3 w-3" />
            <span>{date}</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex gap-4 p-4 rounded-lg bg-gradient-card shadow-card hover-lift cursor-pointer">
      <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col justify-center">
        <span className="inline-block w-fit px-2 py-0.5 bg-primary/20 text-primary text-xs font-bold uppercase rounded mb-2">
          {category}
        </span>
        <h3 className="font-display text-base md:text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-muted-foreground text-xs mt-2">
          <Clock className="h-3 w-3" />
          <span>{date}</span>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
