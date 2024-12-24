'use client';
import ComicCard from "@/components/comic/card";
import { ComicsGridSkeleton } from "@/components/comics/skeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useFavoriteComics } from "@/hooks/use-favorite-comics";
import { useToast } from "@/hooks/use-toast";
import { marvelClient } from "@/lib/client/marvel";
import { debounce } from "@/lib/utils";
import { Comic } from "@/types";
import { Heart } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

async function getComics({ limit = 20, offset = 0, search }: { limit: number, offset: number, search?: string }) {
  const response = await marvelClient.get(`/comics`, {
    params: {
      limit,
      offset,
      ...(search && { titleStartsWith: search })
    }
  });
  return response.data.data.results.map((comic: any) => ({
    ...comic,
    key: crypto.randomUUID(),
  }));
}

export default function Home() {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('q')?.toLowerCase();
  const offsetUrlValue = searchParams.get('offset');
  const router = useRouter();
  const [comics, setComics] = useState<Comic[]>([]);
  const [offset, setOffset] = useState(Number(offsetUrlValue ?? 0));
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver>(null);
  const lastComicRef = useRef<HTMLDivElement>(null);
  const { favorites, toggleFavorite } = useFavoriteComics();
  const { toast } = useToast()
  const pathname = usePathname()

  const createQueryStrings = useCallback(
    (items: [name: string, value: string][]) => {
      const params = new URLSearchParams(searchParams.toString())
      for (const [name, value] of items) {
        params.set(name, value)
      }

      return params.toString()
    },
    [searchParams]
  )

  const handleComicClick = (id: string) => {
    router.push(`/comics/${id}`);
  };

  const loadMoreComics = useCallback(debounce(async ({ offset, queryString, searchValue }: { offset: number, queryString?: boolean; searchValue: string }) => {
    if (isLoading || !hasMore && offset !== 0) return;

    setIsLoading(true);
    try {
      const newComics = await getComics({ limit: 20, offset, search: searchValue });
      if (newComics.length === 0) {
        setHasMore(false);
        return;
      }
      setComics(prev => offset === 0 ? newComics : [...prev, ...newComics]);
      setOffset(prev => prev + 20);
      const qs = createQueryStrings([
        ['q', searchValue],
        ['offset', String(offset)]
      ]);

      if (queryString) {
        router.push(`${pathname}?${qs}`, {
          scroll: false
        })
      }
    } catch (error) {
      console.error('Error loading comics:', error);
      toast({
        title: 'Error loading comics',
        description: 'An error occurred while loading comics. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  }, 500), [offset, isLoading, hasMore, searchValue]);

  useEffect(() => {
    if (searchValue === undefined) {
      return;
    }

    setHasMore(true);
    setOffset(() => 0);
    setComics(() => [])

    loadMoreComics({ offset: 0, searchValue: searchValue ?? "", queryString: searchValue !== '' });
  }, [searchValue]);

  useEffect(() => {
    if (searchValue === undefined) {
      loadMoreComics({ offset: 0, searchValue: searchValue ?? "" })
    }
  }, []);

  function attachObserver(isLast: boolean) {
    return (element: HTMLDivElement | null) => {
      if (isLoading || !hasMore || !element) return;

      console.log('attaching observer', isLast, element)

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMoreComics({ offset, searchValue: searchValue ?? "" });
        }
      });

      observerRef.current.observe(element);

      if (isLast) {
        lastComicRef.current = element;
      }
    };
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {comics.map((comic, index) => (
          <div
            key={comic.key}
            ref={attachObserver(index === comics.length - 1)}
            data-last={index === comics.length - 1}
          >
            <ComicCard
              comic={comic}
              handleComicClick={handleComicClick}
            />
          </div>
        ))}
      </div>
      {isLoading && (
        <ComicsGridSkeleton />
      )}
    </main>
  );
}
