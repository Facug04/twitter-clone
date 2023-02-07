import axios from 'axios'
import { FieldValues } from 'react-hook-form'

import type { Filter } from '../types'
import type { PaginatedPost } from '../types'

export const getPosts = async (
  page: number,
  filters: Filter
): Promise<PaginatedPost> => {
  const response = await axios.get(
    `https://post-app-h399.onrender.com/post?page=${page}&order=${filters.order}&filter=${filters.filter}`
  )

  const post = response.data

  return post
}

export const postComment = async (
  data: FieldValues
): Promise<PaginatedPost> => {
  const post = await axios.post(`https://post-app-h399.onrender.com/post`, {
    post: data,
  })

  return post.data
}

// export const getGame = (id: string | undefined): Promise<GameType> => {
//   const game = axios
//     .get(`http://localhost:3001/game/${id}`)
//     .then((res) => res.data)
//   return game
// }
