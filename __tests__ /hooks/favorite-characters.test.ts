import { renderHook, act } from '@testing-library/react';
import { useFavoritesCharacters } from '@/hooks/use-favorite-characters';

describe('useFavoritesCharacters', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('loads favorites from localStorage', () => {
    const favorites = ['1', '2'];
    window.localStorage.setItem('favoriteCharacters', JSON.stringify(favorites));

    const { result } = renderHook(() => useFavoritesCharacters(false));
    expect(result.current.favorites).toEqual(favorites);
  });

  it('adds and removes favorites', () => {
    const { result } = renderHook(() => useFavoritesCharacters());

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