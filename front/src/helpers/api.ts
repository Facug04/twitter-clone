import axios from 'axios'
import { FieldValues } from 'react-hook-form'

import type { Post, Filter, PaginatedPost } from '../types'

export type commentPost = {
  username: string | null | undefined
  comment: string
  userImage: string | null | undefined
  id: string
}

export const getPosts = async (
  page: number,
  filters: Filter
): Promise<PaginatedPost> => {
  const response = await axios.get(
    `https://twitter-clone-production-c817.up.railway.app/post?page=${page}&order=${filters.order}&filter=${filters.filter}`
  )

  const post = response.data

  return post
}

export const getComment = async (id: string | undefined): Promise<Post> => {
  const response = await axios.get(
    `https://twitter-clone-production-c817.up.railway.app/post/${id}`
  )

  const post = response.data

  return post
}

export const post = async (data: FieldValues): Promise<PaginatedPost> => {
  const post = await axios.post(
    `https://twitter-clone-production-c817.up.railway.app/post`,
    {
      post: data,
    }
  )

  return post.data
}

export const postLike = async (id: string, idUser: string) => {
  await axios.post(
    `https://twitter-clone-production-c817.up.railway.app/post/like`,
    {
      id,
      idUser,
    }
  )
}

export const postComment = async ({
  id,
  userImage,
  username,
  comment,
}: commentPost) => {
  await axios.post(
    `https://twitter-clone-production-c817.up.railway.app/post/comment`,
    {
      id,
      userImage,
      username,
      comment,
    }
  )
}

export const deleteComment = async (id: string, idComment: string) => {
  await axios.post(
    `https://twitter-clone-production-c817.up.railway.app/post/delete`,
    {
      id,
      idComment,
    }
  )
}

// export const getGame = (id: string | undefined): Promise<GameType> => {
//   const game = axios
//     .get(https://post-app-h399.onrender.com`)
//     .then((res) => res.data)
//   return game
// }
