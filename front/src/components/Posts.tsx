import InfiteScroll from 'react-infinite-scroll-component'
import { useInfiniteQuery } from '@tanstack/react-query'

import { getPosts } from '../helpers/api'
import type { Filter, PaginatedPost } from '../types'
import Card from './Card'
import Loader from './icons/Loader'

type Props = {
  filters: Filter
  onChangeFilters: (order: string, filter?: string) => void
  idUser: string | undefined
  username: string | undefined | null
  userImage: string | undefined | null
}

export default function Posts({
  filters,
  onChangeFilters,
  idUser,
  username,
  userImage,
}: Props) {
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
      <div className='py-5 pb-10 px-20 border-[#2f3336] border-x-[1.5px] h-full'>
        <Loader h='h-7' w='w-7' color='fill-primary' />
      </div>
    )
  }

  if (isError) {
    return (
      <div className='mt-3'>
        <h2 className='text-white text-center text-xl'>An error has ocurred</h2>
      </div>
    )
  }

  const posts = data?.pages.flatMap((page: any) => page.docs)

  return (
    <main className='border-[#2f3336] border-x-[1.5px] max-[505px]:mb-[50px]'>
      <select
        defaultValue={filters.filter === 'likes' ? 'likes' : filters.order}
        onChange={(e) => selectFilter(e)}
        className='text-xl w-full bg-transparent cursor-pointer py-2 px-4 border-[#2f3336] border-b-[1.5px] text-pri'
      >
        <option value='desc'>Mas recientes</option>
        <option value='asc'>Mas antiguos</option>
        <option value='likes'>Populares</option>
      </select>
      <InfiteScroll
        dataLength={posts.length}
        hasMore={hasNextPage || false}
        next={() => fetchNextPage()}
        loader={
          <div className='py-4'>
            <Loader h='h-7' w='w-7' color='fill-primary' />
          </div>
        }
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
            commentImage={post.commentImage}
            actualUser={username}
            userImage={userImage}
          />
        ))}
      </InfiteScroll>
    </main>
  )
}
