export type Post = {
  _id: string
  username: string
  image?: string
  description: string
  likes: string[]
  comments: string[]
  createdAt: Date
}

export type PaginatedPost = {
  docs: Post[]
  totalPages: number
  page: number
  nextPage: number
  hasNextPage: boolean
}

export type Filter = {
  order: string
  filter: string
}
