import { renderHook, act } from '@testing-library/react';
import { useFavoriteComics } from '@/hooks/use-favorite-comics';

describe('useFavoriteComics', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('loads favorites from localStorage', () => {
    const favorites = ['1', '2'];
    window.localStorage.setItem('favoriteComics', JSON.stringify(favorites));

    const { result } = renderHook(() => useFavoriteComics(false));
    expect(result.current.favorites).toEqual(favorites);
  });

  it('adds and removes favorites', () => {
    const { result } = renderHook(() => useFavoriteComics());

    act(() => {
      result.current.toggleFavorite('1');
    });
    expect(result.current.favorites).toContain('1');

    act(() => {
      result.current.toggleFavorite('1');
    });
    expect(result.current.favorites).not.toContain('1');
  });
});