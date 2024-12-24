import { marvelClient } from "@/lib/client/marvel";
import { STORAGE_KEYS } from "@/lib/constants";
import { Character } from "@/types";
import { useEffect, useState } from "react"

async function getComicCharacters(id: string) {
  const response = await marvelClient.get(`/characters/${id}`);
  return response.data.data.results;
}

export function useFavoritesCharacters(shouldChractersData: boolean = false) {
  const key = STORAGE_KEYS.favoriteCharacters;
  const [favorites, setFavorites] = useState<string[]>([])
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Carrega favoritos do localStorage ao montar o componente
    const savedFavorites = localStorage.getItem(key)
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])
  
  useEffect(() => {
    if (shouldChractersData) {
      setLoading(true)
      Promise.all(favorites.map(id => getComicCharacters(id)))
        .then((characters) => setCharacters(characters.flat()))
        .finally(() => setLoading(false))
    }
  }, [shouldChractersData])

  const toggleFavorite = (characterId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(characterId)
        ? prev.filter(id => id !== characterId)
        : [...prev, characterId]

    setCharacters((prev) => {
      if (!shouldChractersData) {
        return prev
      }

      const newCharacters = newFavorites.map(id => prev.find(character => character.id === Number(id)))
      return newCharacters.filter(Boolean) as Character[];
    });
        
      // Salva no localStorage
      localStorage.setItem(key, JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  return { favorites, loading, toggleFavorite, characters }
}