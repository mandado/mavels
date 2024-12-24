import { marvelClient } from "@/lib/client/marvel";
import { STORAGE_KEYS } from "@/lib/constants";
import { Comic } from "@/types";
import { useEffect, useState } from "react"

async function getComic(id: string) {
  const response = await marvelClient.get(`/comics/${id}`);
  return response.data.data.results;
}

export function useFavoriteComics(shouldLoadComics: boolean = false) {
  const key = STORAGE_KEYS.favoriteComics;
  const [favorites, setFavorites] = useState<string[]>([])
  const [comics, setComics] = useState<Comic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedFavorites = localStorage.getItem(key)
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])
  
  useEffect(() => {
    if (shouldLoadComics && favorites.length > 0) {
      setLoading(true)
      Promise.all(favorites.map(id => getComic(id)))
        .then((comics) => setComics(comics.flat()))
        .finally(() => setLoading(false))
    }
  }, [shouldLoadComics, favorites])

  const toggleFavorite = (comicId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(comicId)
        ? prev.filter(id => id !== comicId)
        : [...prev, comicId]

      setComics((prev) => {
        if (!shouldLoadComics) {
          return prev
        }

        const newComics = newFavorites.map(id => 
          prev.find(comic => comic.id === Number(id))
        ).filter(Boolean) as Comic[];
        
        return newComics;
      });
        
      localStorage.setItem(key, JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  return { favorites, loading, toggleFavorite, comics }
}