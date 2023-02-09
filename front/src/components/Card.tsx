// import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { formatDistance } from 'date-fns'
import { es } from 'date-fns/locale'

import { Post } from '../types'
import { postLike } from '../helpers/api'
import img from '/user-icon.png'

type Props = Post & {
  idUser: string
}

export default function Card({
  description,
  likes,
  createdAt,
  username,
  image,
  comments,
  _id,
  idUser,
}: Props) {
  const timeAgo = formatDistance(new Date(createdAt), new Date(), {
    addSuffix: true,
    locale: es,
  })
  const [like, setLike] = useState(false)
  const [addLike, setAddLike] = useState(likes.length)

  useEffect(() => {
    console.log({ likes, idUser, state: likes.some((li) => li === idUser) })
    if (likes.some((li) => li === idUser)) {
      setLike(true)
    } else setLike(false)
  }, [idUser])
  const summitLike = async () => {
    if (idUser) {
      setLike(!like)

      const sumOrRestLike = like ? addLike - 1 : addLike + 1

      setAddLike(sumOrRestLike)

      await postLike(_id, idUser)
    }
  }

  return (
    <div className='w-full border border-white p-4 rounded mb-4'>
      <div className='flex items-center gap-2 mb-3 invert-0'>
        <div className='w-10 h-10 border-white border-2 rounded-[50%] flex justify-center'>
          {image ? (
            <img className='w-9 h-9 rounded-[50%]' src={image} />
          ) : (
            <img className='w-9 h-9' src={img} />
          )}
        </div>
        <p>{username}</p>
      </div>
      <div className='px-2'>
        <p className='mb-3'>{description}</p>
        <div className='flex justify-between'>
          <div className='flex'>
            <svg
              onClick={summitLike}
              viewBox='0 0 24 24'
              fill='none'
              stroke='#ffffff'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
              className={`w-6 cursor-pointer ${like && 'fill-red-700'}`}
            >
              <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'></path>
            </svg>
            <span className='text-sm ml-2 mr-4'>{addLike}</span>
            <span className='text-sm'>Comentarios</span>
          </div>
          <p className='text-sm'>{timeAgo}</p>
        </div>
      </div>
    </div>
  )
}
