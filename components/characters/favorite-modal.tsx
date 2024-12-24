'use client';
import { useFavoritesCharacters } from "@/hooks/use-favorite-characters";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { CharacterCard } from "./card";
import { useState } from "react";
import Loading from "../loading";
import LoadingContent from "../loading";

export const CharactersFavoriteModal: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const { favorites, toggleFavorite, loading, characters } = useFavoritesCharacters(showModal);

  const totalPages = Math.ceil(characters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCharacters = characters.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Button
        variant="outline"
        className="hover-card"
        onClick={() => setShowModal(true)}
      >
        Favorites characters ({favorites.length})
      </Button>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-screen-md">
          <DialogHeader>
            <DialogTitle>Favorites Characters</DialogTitle>
          </DialogHeader>
          <LoadingContent loading={loading}>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentCharacters.map((character, index) => (
                <div key={index}>
                  <CharacterCard
                    character={character}
                    isFavorite={favorites.includes(String(character.id))}
                    onToggleFavorite={() => toggleFavorite(String(character.id))}
                  />
                </div>
              ))}
            </section>
          </LoadingContent>
          <div className="flex justify-center gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="flex items-center px-4">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}