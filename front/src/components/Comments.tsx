import { User } from 'firebase/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FieldValues, useForm } from 'react-hook-form'

import { postComment } from '../helpers/api'
import type { Comment } from '../types'
import { useState } from 'react'

type Props = {
  image: string | undefined
  actualUser: string | undefined | null
  comments: Comment[]
  id: string
}

export default function Comments({ image, actualUser, comments, id }: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()
  const [addPost, setAddPost] = useState<Comment[]>([])

  // console.log({ image })
  const onSubmit = (data: FieldValues) => {
    console.log(data)
    const { comment } = data

    postComment(id, image, actualUser, comment)
      .then(() => {
        setAddPost((befPost) =>
          befPost.concat({
            image: image || '',
            username: actualUser || '',
            comment,
          })
        )
        reset()
      })
      .catch((err) => console.error(err))
  }

  return (
    <div className='mb-4'>
      <div className='w-full px-8 py-3 rounded'>
        {!comments.length && (
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
          <h3>Inicia sesion para comentar</h3>
        )}
        {!!comments.length && (
          <div>
            {comments.map((comment) => (
              <div key={comment.username + 'a'} className='mb-4'>
                <div className='flex items-center gap-2 mb-3 invert-0'>
                  <div className='w-10 h-10 border-white border-2 rounded-[50%] flex justify-center'>
                    <img
                      className='w-9 h-9 rounded-[50%]'
                      src={comment.image}
                    />
                  </div>
                  <p>{comment.username}</p>
                </div>
                <p>{comment.comment}</p>
              </div>
            ))}
          </div>
        )}
        {addPost.map((comment) => (
          <div key={comment.username + 'b'} className='mb-4'>
            <div className='flex items-center gap-2 mb-3 invert-0'>
              <div className='w-10 h-10 border-white border-2 rounded-[50%] flex justify-center'>
                <img className='w-9 h-9 rounded-[50%]' src={comment.image} />
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
