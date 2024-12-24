import { Key } from "react";

export type Character = {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  key: string;
}

export type CharacterFavouriteCardProps = {
  character: Character;
  isFavorite: boolean;
  onToggleFavorite: (characterId: string) => void;
}

export type ComicFavouriteCardProps = {
  comic: Comic;
  isFavorite: boolean;
  onToggleFavorite: (comicId: string) => void;
}


export type Comic = {
  key: Key | null | undefined;
  id: number
  digitalId: number
  title: string
  issueNumber: number
  variantDescription: string
  description: string
  modified: string
  isbn: string
  upc: string
  diamondCode: string
  ean: string
  issn: string
  format: string
  pageCount: number
  textObjects: Array<any>
  resourceURI: string
  urls: Array<{
    type: string
    url: string
  }>
  series: {
    resourceURI: string
    name: string
  }
  variants: Array<{
    resourceURI: string
    name: string
  }>
  collections: Array<any>
  collectedIssues: Array<any>
  dates: Array<{
    type: string
    date: string
  }>
  prices: Array<{
    type: string
    price: number
  }>
  thumbnail: {
    path: string
    extension: string
  }
  images: Array<any>
  creators: {
    available: number
    collectionURI: string
    items: Array<any>
    returned: number
  }
  characters: {
    available: number
    collectionURI: string
    items: Array<any>
    returned: number
  }
  stories: {
    available: number
    collectionURI: string
    items: Array<any>
    returned: number
  }
  events: {
    available: number
    collectionURI: string
    items: Array<any>
    returned: number
  }
}


export type Creator = {
  id: number
  firstName: string
  middleName: string
  lastName: string
  suffix: string
  fullName: string
  modified: string
  thumbnail: {
    path: string
    extension: string
  }
  resourceURI: string
  comics: {
    available: number
    collectionURI: string
    items: Array<{
      resourceURI: string
      name: string
    }>
    returned: number
  }
  series: {
    available: number
    collectionURI: string
    items: Array<{
      resourceURI: string
      name: string
    }>
    returned: number
  }
  stories: {
    available: number
    collectionURI: string
    items: Array<{
      resourceURI: string
      name: string
      type: string
    }>
    returned: number
  }
  events: {
    available: number
    collectionURI: string
    items: Array<{
      resourceURI: string
      name: string
    }>
    returned: number
  }
  urls: Array<{
    type: string
    url: string
  }>
}
