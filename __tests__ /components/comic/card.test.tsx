import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { ComicCard } from '@/components/comic/card'
import { useFavoriteComics } from '@/hooks/use-favorite-comics'
import { Tooltip, TooltipProvider } from '@radix-ui/react-tooltip';
import comics from '@/mocks/comics';
import { Comic } from '@/types';

// Mock the hooks
jest.mock('@/hooks/use-favorite-comics', () => ({
  useFavoriteComics: jest.fn()
}));

const mockUseFavoriteComics = useFavoriteComics as jest.Mock;

describe('ComicCard', () => {
  const mockComic = {
    ...comics.data.results[0],
    key: '1',
  } as unknown as Comic;
  const mockHandleClick = jest.fn();

  beforeEach(() => {
    mockUseFavoriteComics.mockReturnValue({
      favorites: [],
      toggleFavorite: jest.fn()
    });
  });

  it('renders comic card with title and image', () => {
    render(
        <TooltipProvider>
      <ComicCard 
        comic={mockComic}
        handleComicClick={mockHandleClick}
      />
      </TooltipProvider>
    );

    expect(screen.getByText(mockComic.title)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    );
  });

  it('calls handleComicClick when clicked', () => {
    render(
        <TooltipProvider>
      <ComicCard 
        comic={mockComic}
        handleComicClick={mockHandleClick}
      />
      </TooltipProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /See comic/i }));
    expect(mockHandleClick).toHaveBeenCalledWith(mockComic.id.toString());
  });

  it('toggles favorite when heart button is clicked', () => {
    const mockToggle = jest.fn();
    mockUseFavoriteComics.mockReturnValue({
      favorites: [],
      toggleFavorite: mockToggle
    });

    render(
        <TooltipProvider>
      <ComicCard 
        comic={mockComic}
        handleComicClick={mockHandleClick}
      />
      </TooltipProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: '' }));
    expect(mockToggle).toHaveBeenCalledWith(mockComic.id.toString());
  });
});