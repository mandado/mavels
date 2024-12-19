'use client';
import { marvelClient } from "@/lib/client/marvel";
import Image from "next/image";
import comics from '../mocks/comics'
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import mockComics from '../mocks/comics'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const filteredComics = mockComics.data.results.filter((comic) =>
    comic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-marvel-light">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <h1 className="text-2xl font-bold text-marvel-dark">Marvel Comics</h1>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search comics..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="hover-card"
              onClick={() => console.log("Show favorites")}
            >
              Favorites ({favorites.length})
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredComics.map((comic) => (
            <Card key={comic.id} className="overflow-hidden hover-card">
              <div className="relative aspect-[2/3]">
                <img
                  src={comic.thumbnail.path}
                  alt={comic.title}
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => toggleFavorite(comic.id)}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      favorites.includes(comic.id)
                        ? "fill-marvel-red text-marvel-red"
                        : "text-gray-600"
                    }`}
                  />
                </Button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{comic.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {comic.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
