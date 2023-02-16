import { User } from 'firebase/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FieldValues, useForm } from 'react-hook-form'

import { deleteComment, postComment } from '../helpers/api'
import type { Comment } from '../types'
import { useState } from 'react'

type Props = {
  image: string | undefined
  actualUser: string | undefined | null
  comments: Comment[]
  id: string
  addPost: Comment[]
  changePost: (comment: Comment) => void
  username: string
  initialComments: Comment[]
  changeInitialComments: (idComment: string) => void
}

export default function Comments({
  image,
  actualUser,
  comments,
  id,
  addPost,
  changePost,
  username,
  initialComments,
  changeInitialComments,
}: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()

  const onSubmit = (data: FieldValues) => {
    console.log({ actualUser })
    const { comment } = data

    postComment(id, image, actualUser, comment)
      .then(() => {
        changePost({
          image: image || '',
          username: actualUser || '',
          comment,
          idComment: '',
        })
        reset()
      })
      .catch((err) => console.error(err))
  }

  const removeComment = (idComment: string) => {
    deleteComment(id, idComment)
      .then(() => {
        changeInitialComments(idComment)
      })
      .catch((err) => console.error(err))
  }

  return (
    <div className='mb-4'>
      <div className='w-full px-8 py-3 rounded'>
        {(!comments.length || !addPost.length) && (
          <h3 className='mb-2'>Se el primero en comentar</h3>
        )}
        {actualUser ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='relative w-full mb-2'>
              <input
                placeholder='Comenta...'
                className='px-2 py-2 outline-none border-b-2 border-white bg-[#212121] w-full resize-none break-words'
                draggable='false'
                {...register('comment', {
                  required: true,
                  maxLength: 500,
                  minLength: 1,
                })}
              ></input>
              {errors.comment?.type === 'required' && (
                <p className='absolute text-xs text-red-700'>
                  No puedes dejar el campo vacio
                </p>
              )}
              {errors.comment?.type === 'maxLength' && (
                <p className='absolute text-xs text-red-700'>
                  Maximo 500 caracteres
                </p>
              )}
            </div>
            <div className='flex justify-end'>
              <button className=' bg-white py-1 px-2 text-black rounded-md hover:bg-red-400 duration-200 ease-linear'>
                Comentar
              </button>
            </div>
          </form>
        ) : (
          <h3 className='mb-6'>Inicia sesión para comentar</h3>
        )}
        {!!comments.length && (
          <div>
            {initialComments.map((comment) => (
              <div key={comment.idComment} className='mb-4 relative'>
                <div className='flex items-center gap-2 mb-3 invert-0'>
                  <div className='w-10 h-10 border-white border-2 rounded-[50%] flex justify-center'>
                    <img
                      className='w-[26px] h-[26px] rounded-[50%]'
                      src={comment.image}
                    />
                  </div>
                  <p>{comment.username}</p>
                </div>
                <p>{comment.comment}</p>
                {actualUser === username && (
                  <button
                    className='absolute right-0 top-[9px] text-red-600'
                    onClick={() => removeComment(comment.idComment)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        {addPost.map((comment, index) => (
          <div key={comment.username + index} className='mb-4'>
            <div className='flex items-center gap-2 mb-3 invert-0'>
              <div className='w-10 h-10 border-white border-2 rounded-[50%] flex justify-center'>
                <img
                  className='w-[26px] h-[26px] rounded-[50%]'
                  src={comment.image}
                />
              </div>
              <p>{comment.username}</p>
            </div>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
