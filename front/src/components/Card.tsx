// import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { formatDistance } from 'date-fns'
import { es } from 'date-fns/locale'

import type { Post, Comment } from '../types'
import { postLike } from '../helpers/api'
import img from '/user-icon.png'
import Comments from './Comments'
import Like from './icons/Like'
import CommentIcon from './icons/CommentIcon'
import Retwitt from './icons/Retwitt'
import See from './icons/See'
import Share from './icons/Share'
import More from './icons/More'
import Verified from './icons/Verified'
import RedLike from './icons/RedLike'

type Props = Post & {
  idUser: string | undefined
  actualUser: string | undefined | null
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
  actualUser,
}: Props) {
  const timeAgo = formatDistance(new Date(createdAt), new Date(), {
    addSuffix: true,
    locale: es,
  })
  const [like, setLike] = useState(false)
  const [addLike, setAddLike] = useState(likes.length)
  const [showComments, setShowComments] = useState(false)
  const [addPost, setAddPost] = useState<Comment[]>([])
  const [initialComments, setInitialComments] = useState<Comment[]>(comments)

  useEffect(() => {
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
    <>
      <div className='w-full border-[#2f3336] px-4  py-2 border-b-[1.5px] flex gap-3 hover:bg-twittHover duration-200 ease-in-out'>
        <div className='w-12 h-12 items-center flex justify-center'>
          {image ? (
            <img className='w-12 h-12 rounded-[50%]' src={image} />
          ) : (
            <img className='w-10 h-10' src={img} />
          )}
        </div>
        <div className='flex-1'>
          <div className='flex items-center justify-between text-base'>
            <div className='flex gap-2'>
              <div className='flex gap-1 items-center'>
                <p className='font-chirp-bold'>{username}</p>
                {image && <Verified />}
              </div>
              <p className='text-third'>· {timeAgo}</p>
            </div>
            <div>
              <More />
            </div>
          </div>
          <div>
            <p className='mb-2 text-[#d5d7d8] text-[17px]'>{description}</p>
            <div className='flex justify-between'>
              <div className='flex gap-8'>
                {/* <svg
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
              </svg> */}
                <div className='flex gap-3 items-center'>
                  <CommentIcon />
                  <p className='text-third text-[13px]'>
                    {initialComments.length + addPost.length}
                  </p>
                </div>
                <div className='flex gap-1 items-center'>
                  <div className='w-[34.75px] h-[34.75px] flex items-center justify-center'>
                    <Retwitt />
                  </div>
                  <p className='text-third text-[13px]'>0</p>
                </div>
                <div
                  onClick={summitLike}
                  className='flex gap-1 group items-center cursor-pointer fill-[#71767b] duration-200 ease-in'
                >
                  <div className='w-[34.75px] h-[34.75px] flex items-center justify-center group-hover:bg-likeHover group-hover:fill-[#f91880] group-hover:rounded-[50%]'>
                    {like ? <RedLike /> : <Like />}
                  </div>
                  <p
                    className={`text-third text-[13px] group-hover:text-[#f91880] ${
                      like && 'text-[#f91880]'
                    }`}
                  >
                    {addLike}
                  </p>
                </div>
                <div className='flex gap-1 items-center'>
                  <div className='w-[34.75px] h-[34.75px] flex items-center justify-center'>
                    <See />
                  </div>
                  <p className='text-third text-[13px]'>0</p>
                </div>
                <div className='w-[34.75px] h-[34.75px] flex items-center justify-center'>
                  <Share />
                </div>
                {/* <span
                onClick={() => setShowComments(!showComments)}
                className='text-sm relative pl-4 cursor-pointer'
              >
                <div
                  className={`absolute left-[3px] text-base ${
                    showComments ? 'rotate-90 top-[-1.7px]' : 'top-[-2.5px]'
                  }`}
                >
                  &gt;
                </div>{' '}
                Comentarios {initialComments.length + addPost.length}
              </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showComments && (
        <Comments
          id={_id}
          username={username}
          comments={comments}
          actualUser={actualUser}
          image={image}
          addPost={addPost}
          changePost={(comment: Comment) => {
            setAddPost((befPost) => befPost.concat(comment))
          }}
          initialComments={initialComments}
          changeInitialComments={(idComment: string) => {
            const removedComment = initialComments.filter(
              (comment) => comment.idComment !== idComment
            )
            setInitialComments(removedComment)
          }}
        />
      )}
    </>
  )
}
