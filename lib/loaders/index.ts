import { marvelClient } from "../client/marvel"

export async function getComicDetails(comicId: string) {
  const response = await marvelClient.get(`/comics/${comicId}`)
  return response.data.data.results[0]
}

export async function getComicCharacters(comicId: string) {
  const response = await marvelClient.get(`/comics/${comicId}/characters`)
  return response.data.data.results
}

export async function getComicCreators(comicId: string) {
  const response = await marvelClient.get(`/comics/${comicId}/creators`)
  return response.data.data.results
}