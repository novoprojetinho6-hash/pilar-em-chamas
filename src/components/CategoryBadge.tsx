import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  active?: boolean;
  onClick?: () => void;
}

const CategoryBadge = ({ category, active = false, onClick }: CategoryBadgeProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wide transition-all duration-300",
        active
          ? "bg-primary text-primary-foreground shadow-glow"
          : "bg-secondary text-muted-foreground hover:bg-primary/20 hover:text-primary"
      )}
    >
      {category}
    </button>
  );
};

export default CategoryBadge;
