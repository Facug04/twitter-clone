import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import {
  deleteComment,
  getComment,
  postComment,
  postLike,
} from '../helpers/api'

import { useEffect, useState } from 'react'
import img from '/user-icon.png'
import LeftArrow from './icons/LeftArrow'
import Verified from './icons/Verified'
import More from './icons/More'
import CommentIcon from './icons/CommentIcon'
import Retwitt from './icons/Retwitt'
import Like from './icons/Like'
import Share from './icons/Share'
import RedLike from './icons/RedLike'
import LikeModal from './LikeModal'
import CommentModal from './CommentModal'
import AddCommentModal from './AddCommentModal'
import { timeAgoFormat } from '../helpers/timeAgo'

import Emoji from './icons/Emoji'
import Gift from './icons/Gift'
import Images from './icons/Images'
import Ubication from './icons/Ubication'
import Comment from './Comment'

type Props = {
  // image: string | undefined
  actualUser: string | undefined | null
  idUser: string | undefined
  image: string | null | undefined
  // comments: Comment[]
  // id: string
  // addPost: Comment[]
  // changePost: (comment: Comment) => void
  // username: string
  // initialComments: Comment[]
  // changeInitialComments: (idComment: string) => void
}

export default function Comments({
  actualUser,
  idUser,
  image,
}: // image,
// actualUser,
// comments,
// id,
// addPost,
// changePost,
// username,
// initialComments,
// changeInitialComments,
Props) {
  const { id } = useParams()
  const {
    data: comment,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['comment', id],
    queryFn: () => getComment(id),
    refetchInterval: 0,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
    staleTime: 0,
    cacheTime: 15000,
  })

  const [like, setLike] = useState(false)
  const [addLike, setAddLike] = useState(0)
  const [likeModal, setLikeModal] = useState(false)
  const [commentModal, setCommentModal] = useState(false)
  const [addCommentModal, setAddCommentModal] = useState(false)
  const [addComment, setAddComment] = useState('')

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()

  useEffect(() => {
    if (isSuccess) {
      setAddLike(comment.likes.length)
    }
  }, [isSuccess])

  useEffect(() => {
    if (comment?.likes.some((li) => li === idUser)) {
      setLike(true)
    } else setLike(false)
  }, [idUser])

  if (isLoading) return <h3 className='text-white'>Cargando</h3>

  if (isError) return <h3>Ha ocurrido un error</h3>

  const timeAgo = timeAgoFormat(comment.createdAt)
  const hour = format(new Date(comment.createdAt), 'HH:mm aaaa')
  const date = format(new Date(comment.createdAt), 'd MMM. yyyy', {
    locale: es,
  })

  const onSubmit = () => {
    if (addComment.length > 1 && addComment.length < 300) {
      postComment(comment._id, image, actualUser, addComment)
        .then(() => {
          // changeModal()
        })
        .catch((err) => console.error(err))
    }
  }

  const summitLike = async () => {
    if (idUser) {
      setLike(!like)

      const sumOrRestLike = like ? addLike - 1 : addLike + 1

      setAddLike(sumOrRestLike)

      await postLike(comment._id, idUser)
    } else setLikeModal(true)
  }
  // const onSubmit = (data: FieldValues) => {
  //   console.log({ actualUser })
  //   const { comment } = data

  //   postComment(id, image, actualUser, comment)
  //     .then(() => {
  //       changePost({
  //         image: image || '',
  //         username: actualUser || '',
  //         comment,
  //         idComment: '',
  //       })
  //       reset()
  //     })
  //     .catch((err) => console.error(err))
  // }

  // const removeComment = (idComment: string) => {
  //   deleteComment(id, idComment)
  //     .then(() => {
  //       changeInitialComments(idComment)
  //     })
  //     .catch((err) => console.error(err))
  // }

  return (
    <div className='border-[#2f3336] border-x-[1.5px] h-full'>
      <div className='pr-4 pl-2.5 h-[53px] flex items-center gap-7 mb-3'>
        <Link to='/'>
          <div className='h-[34px] w-[34px] flex justify-center items-center text-2xl rounded-[50%] hover:bg-[#eff3f41a] duration-200 ease-linear'>
            <LeftArrow />
          </div>
        </Link>
        <h3 className='text-normal text-pri font-chirp-bold'>Tweet</h3>
      </div>
      <div className='px-4 flex gap-3'>
        <div>
          {comment?.image ? (
            <img className='h-12 w-12 rounded-[50%]' src={comment?.image} />
          ) : (
            <img className='h-12 w-12 rounded-[50%]' src={img} />
          )}
        </div>
        <div className='flex items-center justify-between text-base flex-1 mb-2'>
          <div>
            <div className='flex gap-1 items-center'>
              <p className='font-chirp-bold text-pri'>{comment?.username}</p>
              {comment?.image && <Verified />}
            </div>
            <p className='text-[15px] text-[#71767B]'>@{comment?.username}</p>
          </div>
          <div>
            <More />
          </div>
        </div>
      </div>
      <p className='px-4 text-pri text-lg mb-2'>{comment?.description}</p>
      <div className='px-4'>
        {comment.commentImage && (
          <img
            className='w-full border-[#2F3336] border rounded-2xl mb-2'
            src={comment.commentImage}
            alt='image'
          />
        )}
      </div>
      <div className='px-4 my-4'>
        <p className='text-base text-[#71767B]'>
          {hour} · {date} ·{' '}
          <span className='text-pri text-[15px] font-chirp-bold'>
            {Math.floor(Math.random() * 501)} mil
          </span>{' '}
          <span className='text-[14.5px]'>Reproducciones</span>
        </p>
      </div>
      <div className='px-4 text-[14.5px]'>
        <div className='py-4 border-[#2f3336] border-y-[1.5px]'>
          <div className='px-1 flex gap-4 '>
            <div>
              <p className=' text-[#71767B]'>
                <span className='text-pri  font-chirp-bold'>0</span> Retweets
              </p>
            </div>
            <div>
              <p className=' text-[#71767B]'>
                <span className='text-pri font-chirp-bold'>0</span> Tweets
                citados
              </p>
            </div>
            <div>
              <p className=' text-[#71767B]'>
                <span className='text-pri font-chirp-bold'>{addLike}</span> Me
                gusta
              </p>
            </div>
          </div>
        </div>

        <div className='h-12 flex justify-around items-center border-[#2f3336] border-b-[1.5px]'>
          <div
            onClick={(e) => {
              e.preventDefault()
              if (!idUser) setCommentModal(true)
              else setAddCommentModal(true)
            }}
            className='w-[38.5px] h-[38.5px] justify-center flex items-center  hover:bg-imageHover fill-[#71767b] hover:fill-primary rounded-[50%] duration-200 ease-in cursor-pointer'
          >
            <CommentIcon size={22.5} />
          </div>
          {commentModal && (
            <CommentModal
              username={comment.username}
              changeModal={() => setCommentModal(false)}
            />
          )}
          {addCommentModal && (
            <AddCommentModal
              id={comment._id}
              image={comment.image}
              actualUser={actualUser}
              username={comment.username}
              description={comment.description}
              timeAgo={timeAgo}
              changeModal={() => setAddCommentModal(false)}
            />
          )}

          <div className='flex items-center w-[38.5px] h-[38.5px]'>
            <Retwitt size={22.5} />
          </div>
          <div
            onClick={summitLike}
            className='flex w-[38.5px] h-[38.5px] justify-center hover:fill-[#f91880] hover:bg-likeHover rounded-[50%] items-center cursor-pointer fill-[#71767b] duration-200 ease-in'
          >
            {like ? <RedLike /> : <Like size={22.5} />}
          </div>
          {likeModal && (
            <LikeModal
              username={comment.username}
              changeModal={() => setLikeModal(false)}
            />
          )}
          <div className='w-[38.5px] h-[38.5px] flex items-center justify-center'>
            <Share size={22.5} />
          </div>
        </div>
      </div>
      {!!image && (
        <div className='px-4 py-3 border-[#2f3336] border-b-[1.5px]'>
          <p className='text-[#71767B] text-base ml-[60px]'>
            Respondiendo a
            <span className='text-primary'> @{comment.username}</span>
          </p>
          <div className='flex gap-3'>
            <img className='w-12 h-12 rounded-[50%]' src={image} />

            <div className='flex-1'>
              <div className='py-3 mb-3'>
                <textarea
                  value={addComment}
                  name='comment'
                  onChange={(e) => {
                    setAddComment(e.target.value)
                  }}
                  placeholder='Twittea tu respuesta'
                  className='h-7 text-pri text-normal outline-none resize-none bg-transparent  w-full placeholder:text-normal placeholder:text-secondary'
                />
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex gap-1'>
                  <div className='hover:bg-imageHover rounded-[50%] w-[34px] h-[34px] flex items-center justify-center'>
                    <Images />
                  </div>
                  <div className='flex items-center justify-center w-[34px] h-[34px]'>
                    <Gift />
                  </div>
                  <div className='flex items-center justify-center w-[34px] h-[34px]'>
                    <Emoji />
                  </div>
                  <div className='flex items-center justify-center w-[34px] h-[34px]'>
                    <Ubication />
                  </div>
                </div>
                <button
                  onClick={onSubmit}
                  className=' bg-[#0e4e78] text-base font-chirp-bold py-[6px] px-3 text-[#808080] rounded-[18px] hover: duration-200 ease-linear'
                >
                  Responder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {!!comment.comments.length && (
        <div>
          {comment.comments.map((com, index) => (
            <Comment
              userComment={comment.username}
              description={com.comment}
              createdAt={com.createdAt}
              image={com.image}
              username={com.username}
              key={com.username + index}
            />
          ))}
        </div>
      )}
    </div>
  )
}
