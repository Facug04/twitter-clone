// import { Link } from 'react-router-dom'
import { formatDistance } from 'date-fns'
import { es } from 'date-fns/locale'

import { Post } from '../types'

export default function Card({
  description,
  likes,
  createdAt,
  username,
  comments,
}: Post) {
  const timeAgo = formatDistance(new Date(createdAt), new Date(), {
    addSuffix: true,
    locale: es,
  })

  return (
    <div className='w-full border border-white p-4 rounded mb-4'>
      <div className='flex items-center gap-2 mb-3'>
        <div className='w-10 h-10 rounded-[50%] border-white border'></div>
        <p>{username}</p>
      </div>
      <div className='px-2'>
        <p className='mb-3'>{description}</p>
        <div className='flex justify-between'>
          <div className='flex'>
            <svg
              className='w-6'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#ffffff'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'></path>
            </svg>
            <span className='text-sm ml-2 mr-4'>{likes}</span>
            <span className='text-sm'>Comentarios</span>
          </div>
          <p className='text-sm'>{timeAgo}</p>
        </div>
      </div>
    </div>
  )
}
