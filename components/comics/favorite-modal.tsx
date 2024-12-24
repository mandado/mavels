'use client';
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ComicCard } from "./card";
import { useState } from "react";
import { useFavoriteComics } from "@/hooks/use-favorite-comics";
import Loading from "../loading";
import LoadingContent from "../loading";

export const ComicsFavoriteModal: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const { favorites, toggleFavorite, loading, comics } = useFavoriteComics(showModal);

  const totalPages = Math.ceil(comics.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentComics = comics.slice(startIndex, endIndex);

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
        Favorites comics ({favorites.length})
      </Button>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-screen-md">
          <DialogHeader>
            <DialogTitle>Favorite Comics</DialogTitle>
          </DialogHeader>

          <LoadingContent loading={loading}>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentComics.map((comic, index) => (
                <div key={index}>
                  <ComicCard
                    comic={comic}
                    isFavorite={favorites.includes(String(comic.id))}
                    onToggleFavorite={() => toggleFavorite(String(comic.id))}
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