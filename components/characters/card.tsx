import { CharacterFavouriteCardProps } from "@/types";
import { CardContainer } from "../card/container";
import { FavoriteButton } from "../card/favourite-button";
import { CardHeader } from "../card/header";
import { CardImage } from "../card/image";

export function CharacterCard({ character, isFavorite, onToggleFavorite }: CharacterFavouriteCardProps) {
  return (
    <CardContainer className="group p-0 relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
      <CardImage 
        width={250}
        height={250}
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        className="w-full h-[200px] sm:h-[250px] object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <CardHeader
        className="flex flex-col justify-between items-start p-3 sm:p-4 absolute bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent w-full transition-opacity duration-300">
        <p className="font-medium text-sm sm:text-base text-white line-clamp-2">{character.name}</p>
        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={() => onToggleFavorite(String(character.id))}
          className="absolute top-2 right-2 sm:top-3 sm:right-3"
        />
      </CardHeader>
    </CardContainer>
  );
}