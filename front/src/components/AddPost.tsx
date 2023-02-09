import { User } from 'firebase/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FieldValues, useForm } from 'react-hook-form'

import { postComment } from '../helpers/api'
import Loader from './icons/Loader'

type Props = {
  user: boolean | undefined
  currentUser: User | null
}

export default function AddPost({ user, currentUser }: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()
  const queryClient = useQueryClient()
  const {
    mutate,
    isLoading,
    isError,
    isSuccess,
    reset: resetQuery,
  } = useMutation(postComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
    },
  })

  const onSubmit = (data: FieldValues) => {
    if (user) {
      const newPost = {
        ...data,
        image: currentUser?.photoURL,
        username: currentUser?.displayName,
      }
      mutate(newPost, {
        onSuccess: () => {
          reset()
        },
      })
    } else {
      mutate(data, {
        onSuccess: () => {
          reset()
        },
      })
    }
  }

  if (user === undefined) return <div></div>
  //   <div className='w-full border border-white p-4 rounded mb-4'>
  //   <div className='flex items-center gap-2 mb-3'>
  //     <div className='w-10 h-10 rounded-[50%] border-white border'></div>
  //     <p>{username}</p>
  //   </div>
  //   <div className='px-2'>
  //     <p className='mb-3'>{description}</p>
  //     <div className='flex justify-between'>
  //       <div className='flex'>
  //         <svg
  //           className='w-6'
  //           viewBox='0 0 24 24'
  //           fill='none'
  //           stroke='#ffffff'
  //           strokeWidth='1.5'
  //           strokeLinecap='round'
  //           strokeLinejoin='round'
  //         >
  //           <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'></path>
  //         </svg>
  //         <span className='text-sm ml-2 mr-4'>Me gusta</span>
  //         <span className='text-sm'>Comentarios</span>
  //       </div>
  //       <p className='text-sm'>{timeAgo}</p>
  //     </div>
  //   </div>
  // </div>
  return (
    <div className='pt-10 px-20 mb-4'>
      <div className='w-full border border-white px-4 py-6 rounded'>
        <h2 className='mb-3'>Agrega un comentario</h2>
        <form onSubmit={handleSubmit(onSubmit)} className=''>
          {!user && (
            <div className='relative w-full mb-6'>
              <input
                placeholder='Nombre'
                className='px-2 py-1 outline-none text-black rounded'
                type='text'
                {...register('username', {
                  required: true,
                })}
              ></input>
              {errors.username?.type === 'required' && (
                <p className='absolute bottom-[-17px] text-xs text-red-700'>
                  Obligatorio
                </p>
              )}
            </div>
          )}
          <div className='relative w-full mb-4'>
            <textarea
              placeholder='Descripcion...'
              className='px-2 py-2 outline-none text-black h-20 w-full resize-none rounded'
              draggable='false'
              {...register('description', {
                required: true,
                maxLength: 3000,
              })}
            ></textarea>
            {errors.description?.type === 'required' && (
              <p className='absolute text-xs text-red-700'>Obligatorio</p>
            )}
            {errors.description?.type === 'maxLength' && (
              <p className='absolute text-xs text-red-700'>
                Maximo 3000 caracteres
              </p>
            )}
          </div>
          <div className='flex justify-end'>
            <button className=' bg-white py-2 px-3 text-black w-[76px] rounded-md hover:bg-red-400 duration-200 ease-linear'>
              {isLoading ? (
                <Loader h='h-6' w='w-6' color='fill-white' />
              ) : (
                'Añadir'
              )}
            </button>
          </div>
        </form>
      </div>
      {isError && (
        <div className='mb-3 border border-red-700 rounded p-4 relative'>
          <p className=' text-red-700'>Ha ocurrido un error</p>
          <button
            onClick={resetQuery}
            className='absolute text-red-700 right-[20px] top-[16px]'
          >
            X
          </button>
        </div>
      )}
      {isSuccess && (
        <div className='mb-3 border border-green-600 rounded p-4 relative'>
          <p className=' text-green-600'>Comentario subido correctamente</p>
          <button
            onClick={resetQuery}
            className='absolute text-green-600 right-[20px] top-[16px]'
          >
            X
          </button>
        </div>
      )}
    </div>
  )
}

{
  /* <div className={style.container_input}>
<input
  required
  className={styl
  type="text"
  {...register("email", {
    required: true,
    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  })}
></input>
<span></span>
<label className={style.labelText}>Correo</label>
{errors.email?.type === "required" && (
  <p className={style.error}>Obligatorio</p>
)}
{errors.email?.type === "pattern" && (
  <div className={style.error}>
    <p>Ingresa un correo válido</p>
    <i class="fa-solid fa-circle-exclamation"></i>
  </div>
)}
</div> */
}
// <div className={style.container_input}>
// <input
//   required
//   className={style.input}
//   // placeholder="Contraseña"
//   type="password"
//   {...register("password", {
//     required: true,
//     pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
//   })}
// ></input>
// <span></span>
// <label className={style.labelText}>Contraseña</label>
// {errors.password?.type === "required" && (
//   <p className={style.error}>Obligatorio</p>
// )}
// {errors.password?.type === "pattern" && (
//   <div className={style.error}>
//     <p>Mínimo 8 caracteres, (letras y números)</p>
//     <i class="fa-solid fa-circle-exclamation"></i>
//   </div>
// )}
// </div>
