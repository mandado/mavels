'use client';
import { Search as SearchIcon } from "lucide-react";
import React, { useCallback, useState } from 'react'
import { Input } from '../ui/input'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { debounce } from "@/lib/utils";

export default function Search() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') ?? '')
  const router = useRouter();
  const pathname = usePathname()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const updateSearch = useCallback(debounce((value: string) => {
    router.push(pathname + '?' + createQueryString('q', value))
  }, 500), [createQueryString, pathname, router])

  return (
    <div className="relative w-full md:w-96">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        type="search"
        placeholder="Search comics..."
        className="pl-10 w-full"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          updateSearch(e.target.value)
        }}
      />
    </div>
  )
}
