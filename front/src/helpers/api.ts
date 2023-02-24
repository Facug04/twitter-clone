import axios from 'axios'
import { FieldValues } from 'react-hook-form'

import type { Post, Filter, PaginatedPost } from '../types'

export const getPosts = async (
  page: number,
  filters: Filter
): Promise<PaginatedPost> => {
  const response = await axios.get(
    `http://localhost:3001/post?page=${page}&order=${filters.order}&filter=${filters.filter}`
  )

  const post = response.data

  return post
}

export const getComment = async (id: string | undefined): Promise<Post> => {
  const response = await axios.get(`http://localhost:3001/post/${id}`)

  const post = response.data

  return post
}

export const post = async (data: FieldValues): Promise<PaginatedPost> => {
  const post = await axios.post(`http://localhost:3001/post`, {
    post: data,
  })

  return post.data
}

export const postLike = async (id: string, idUser: string) => {
  await axios.post(`http://localhost:3001/post/like`, {
    id,
    idUser,
  })
}

export const postComment = async (
  id: string,
  image: string | undefined | null,
  username: string | undefined | null,
  comment: string
) => {
  await axios.post(`http://localhost:3001/post/comment`, {
    id,
    image,
    username,
    comment,
  })
}

export const deleteComment = async (id: string, idComment: string) => {
  await axios.post(`http://localhost:3001/post/delete`, {
    id,
    idComment,
  })
}

// export const getGame = (id: string | undefined): Promise<GameType> => {
//   const game = axios
//     .get(`https://post-app-h399.onrender.com/game/${id}`)
//     .then((res) => res.data)
//   return game
// }
