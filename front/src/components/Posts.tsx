// import { Link } from 'react-router-dom'

import InfiteScroll from 'react-infinite-scroll-component'
import { useInfiniteQuery } from '@tanstack/react-query'

import { getPosts } from '../helpers/api'
import type { Filter, PaginatedPost } from '../types'
import Card from './Card'
import Loader from './icons/Loader'

type Props = {
  filters: Filter
  onChangeFilters: (order: string, filter?: string) => void
  idUser: string
}

export default function Posts({ filters, onChangeFilters, idUser }: Props) {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['posts', filters],
      queryFn: ({ pageParam = 1 }) => getPosts(pageParam, filters),
      getNextPageParam: (lastPage: any) => {
        if (!lastPage.hasNextPage) return false
        return lastPage.nextPage
      },
      refetchInterval: 0,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 2,
      staleTime: 0,
    })

  const selectFilter = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    if (target.value === 'likes') {
      onChangeFilters('desc', 'likes')
    } else {
      onChangeFilters(target.value)
    }
  }

  if (isLoading) {
    return (
      <div className='py-5 pb-10 px-20'>
        <Loader h='h-10' w='w-10' color='fill-white' />
      </div>
    )
  }

  if (isError) {
    return <div>An error has ocurred</div>
  }

  const posts = data?.pages.flatMap((page: any) => page.docs)

  return (
    <main className='pb-10 px-20'>
      <select
        defaultValue={filters.filter === 'likes' ? 'likes' : filters.order}
        onChange={(e) => selectFilter(e)}
        className='text-xl w-fit mb-4 bg-transparent cursor-pointer'
      >
        <option value='desc'>Mas recientes</option>
        <option value='asc'>Mas antiguos</option>
        <option value='likes'>Populares</option>
      </select>
      <InfiteScroll
        dataLength={posts.length}
        hasMore={hasNextPage || false}
        next={() => fetchNextPage()}
        loader={'cargando'}
      >
        {posts.map((post) => (
          <Card
            key={post._id}
            _id={post._id}
            idUser={idUser}
            username={post.username}
            image={post?.image}
            description={post.description}
            createdAt={post.createdAt}
            likes={post.likes}
            comments={post.comments}
          />
        ))}
      </InfiteScroll>
    </main>
  )
}
