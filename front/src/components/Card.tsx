// import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { formatDistance } from 'date-fns'
import { es } from 'date-fns/locale'

import type { Post, Comment } from '../types'
import { postLike } from '../helpers/api'
import img from '/user-icon.png'
import Like from './icons/Like'
import CommentIcon from './icons/CommentIcon'
import Retwitt from './icons/Retwitt'
import See from './icons/See'
import Share from './icons/Share'
import More from './icons/More'
import Verified from './icons/Verified'
import RedLike from './icons/RedLike'
import LikeModal from './LikeModal'
import CommentModal from './CommentModal'
import { Link } from 'react-router-dom'
import AddCommentModal from './AddCommentModal'
import { timeAgoFormat } from '../helpers/timeAgo'

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
  commentImage,
}: Props) {
  const [like, setLike] = useState(false)
  const [addLike, setAddLike] = useState(likes.length)
  const [showComments, setShowComments] = useState(false)
  const [addPost, setAddPost] = useState<Comment[]>([])
  const [initialComments, setInitialComments] = useState<Comment[]>(comments)
  const [likeModal, setLikeModal] = useState(false)
  const [commentModal, setCommentModal] = useState(false)
  const [addCommentModal, setAddCommentModal] = useState(false)

  useEffect(() => {
    if (likes.some((li) => li === idUser)) {
      setLike(true)
    } else setLike(false)
  }, [idUser])

  const timeAgo = timeAgoFormat(createdAt)

  const summitLike = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault()
    if (idUser) {
      setLike(!like)

      const sumOrRestLike = like ? addLike - 1 : addLike + 1

      setAddLike(sumOrRestLike)

      await postLike(_id, idUser)
    } else setLikeModal(true)
  }

  return (
    <Link to={`${username.split(' ').join('')}/status/${_id}`}>
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
                <p className='font-chirp-bold text-pri'>{username}</p>
                {image && <Verified />}
              </div>
              <p className='text-third'>· {timeAgo}</p>
            </div>
            <div>
              <More />
            </div>
          </div>
          <div>
            <p className='mb-2 text-[#d5d7d8] text-[17px] max-[695px]:text-base'>
              {description}
            </p>
            {commentImage && (
              <img
                className='w-full border-[#2F3336] border rounded-2xl mb-2'
                src={commentImage}
                alt={image}
              />
            )}
            <div className='flex justify-between'>
              <div className='flex gap-8'>
                <div
                  onClick={(e) => {
                    e.preventDefault()
                    if (!idUser) setCommentModal(true)
                    else setAddCommentModal(true)
                  }}
                  className='flex gap-3 items-center group fill-[#71767b] hover:fill-primary duration-200 ease-in cursor-pointer'
                >
                  <div className='w-[34.75px] h-[34.75px] flex items-center justify-center group-hover:bg-imageHover group-hover:fill-primary rounded-[50%] duration-200 ease-in'>
                    <CommentIcon />
                  </div>
                  <p className='text-third text-[13px] group-hover:text-primary duration-200 ease-in'>
                    {initialComments.length + addPost.length}
                  </p>
                </div>
                {commentModal && (
                  <CommentModal changeModal={() => setCommentModal(false)} />
                )}
                {addCommentModal && (
                  <AddCommentModal
                    id={_id}
                    image={image}
                    actualUser={actualUser}
                    username={username}
                    description={description}
                    timeAgo={timeAgo}
                    changeModal={() => setAddCommentModal(false)}
                  />
                )}
                <div className='flex gap-1 items-center'>
                  <div className='w-[34.75px] h-[34.75px] flex items-center justify-center'>
                    <Retwitt />
                  </div>
                  <p className='text-third text-[13px]'>0</p>
                </div>
                <div
                  onClick={(e) => summitLike(e)}
                  className='flex gap-1 group items-center cursor-pointer fill-[#71767b] duration-200 ease-in'
                >
                  <div className='w-[34.75px] h-[34.75px] flex items-center justify-center group-hover:bg-likeHover group-hover:fill-[#f91880] rounded-[50%] duration-200 ease-in'>
                    {like ? <RedLike /> : <Like />}
                  </div>
                  <p
                    className={`text-third text-[13px] group-hover:text-[#f91880] duration-200 ease-in ${
                      like && 'text-[#f91880]'
                    }`}
                  >
                    {addLike}
                  </p>
                </div>
                {likeModal && (
                  <LikeModal changeModal={() => setLikeModal(false)} />
                )}
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
    </Link>
  )
}
