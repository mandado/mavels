'use client';
import { CharacterCard } from "@/components/characters/card";
import ComicPageSkeleton from "@/components/comic/skeleton";
import { CreatorCard } from "@/components/creators/card";
import { useFavoritesCharacters } from "@/hooks/use-favorite-characters";
import { getComicCharacters, getComicCreators, getComicDetails } from "@/lib/loaders";
import { Character, Comic, Creator } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from 'react';

function loadAll(id: string) {
  return Promise.all([
    getComicDetails(id),
    getComicCharacters(id),
    getComicCreators(id)
  ])
}

export default function ComicDetailsPage() {
  const params = useParams<{ id: string }>()
  const { favorites, toggleFavorite } = useFavoritesCharacters()
  const [comic, setComic] = useState<Comic>(null!)
  const [characters, setCharacters] = useState<Character[]>([])
  const [creators, setCreators] = useState<Creator[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAll(params.id).then(([comic, characters, creators]) => {
      setComic(comic)
      setCharacters(characters)
      setCreators(creators)
    }).finally(() => setLoading(false));
  }, [])

  return loading ? <ComicPageSkeleton /> : (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">{comic.title}</h1>

      {comic.description && (
        <div className="mb-4 md:mb-6">
          <p className="text-sm md:text-base text-gray-700">{comic.description ?? '-'}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <aside className="relative w-full mx-auto mb-4 md:mb-0">
          <img
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.title}
            className="rounded-lg w-full max-w-md mx-auto md:w-full object-cover shadow-lg"
          />
        </aside>

        <div className="space-y-6">
          {characters.length > 0 && (
            <section>
              <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Personagens</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                {characters.map((character: Character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    isFavorite={favorites.includes(String(character.id))}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </section>
          )}

          {creators.length > 0 && (
            <section>
              <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Criadores</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
                {creators.map((creator: Creator) => (
                  <CreatorCard
                    key={creator.id}
                    creator={creator}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}