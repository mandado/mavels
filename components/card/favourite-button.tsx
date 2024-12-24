import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  className?: string;
}

export function FavoriteButton({ isFavorite, className, onToggle }: FavoriteButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={cn("p-1 hover:bg-gray-200 rounded-full transition-colors", className)}
    >
      <Heart
        size={20}
        className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-200 hover:fill-red-500"}
      />
    </button>
  );
}