import React from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button';
import { useFavoriteComics } from '@/hooks/use-favorite-comics';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Heart } from 'lucide-react';
import { Comic } from '@/types';

type ComicCardProps = {
  comic: Comic;
  handleComicClick: (id: string) => void;
}

export function ComicCard({
  comic,
  handleComicClick
}: ComicCardProps) {
  const { favorites, toggleFavorite } = useFavoriteComics()
  
  return (
    <Card className="group overflow-hidden relative hover-card h-[300px] sm:h-[350px] md:h-96 transition-all duration-300">
      <div className="relative h-full">
        <figure className="h-full overflow-hidden">
          <img
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.title}
            className="w-full h-full object-cover duration-500 group-hover:scale-110 transition-transform"
          />
        </figure>
        <Button
          name="favorite-button"
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white transition-colors"
          onClick={() => toggleFavorite(String(comic.id))}
        >
          <Heart
            className={`h-4 w-4 sm:h-5 sm:w-5 ${
              favorites.includes(String(comic.id))
                ? "fill-red-500 text-red-500"
                : "text-gray-600"
            }`}
          />
        </Button>
      </div>

      <div className="flex flex-col justify-end items-start p-3 sm:p-4 absolute bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent w-full transition-opacity duration-300">
        <Tooltip>
          <TooltipTrigger>
            <h3 className="font-semibold text-base sm:text-lg md:text-xl mb-2 max-w-64 truncate text-white">
              {comic.title}
            </h3>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">{comic.title}</p>
          </TooltipContent>
        </Tooltip>
        <Button 
          variant="secondary" 
          size="sm"
          className="w-full sm:w-auto"
          onClick={() => handleComicClick(String(comic.id))}
        >
          See Comic
        </Button>
      </div>
    </Card>
  )
}