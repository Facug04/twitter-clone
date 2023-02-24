import { User } from 'firebase/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import axios from 'axios'

import { post } from '../helpers/api'
import Loader from './icons/Loader'
import Images from './icons/Images'
import Gift from './icons/Gift'
import Survey from './icons/Survey'
import Emoji from './icons/Emoji'
import Program from './icons/Program'
import Ubication from './icons/Ubication'
import Twitter from './icons/Twitter'

type Props = {
  user: boolean | undefined
  currentUser: User | null
  name: { username: string; isReady: boolean }
}

export default function AddPost({ user, currentUser, name }: Props) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
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
  } = useMutation(post, {
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
        commentImage: uploadImage(),
      }
      mutate(newPost, {
        onSuccess: () => {
          reset()
        },
      })
    } else if (name.isReady) {
      const newPost = {
        ...data,
        username: name.username,
        commentImage: uploadImage(),
      }
      mutate(newPost, {
        onSuccess: () => {
          reset()
        },
      })
    }
  }

  if (user === undefined) return <div></div>

  const uploadImage = () => {
    const id = crypto.randomUUID()
    if (selectedImage) {
      const formData = new FormData()

      formData.append('file', selectedImage)
      formData.append('upload_preset', 'fkdsburx')
      console.log(formData)
      axios
        .post(
          `https://api.cloudinary.com/v1_1/dlkdvbani/image/upload?public_id=${id}`,
          formData
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
      return `https://res.cloudinary.com/dlkdvbani/image/upload/v1676557124/${id}.png`
    } else ''
  }

  return (
    <div className='pt-3 border-[#2f3336] border-x-[1.5px]'>
      <div className='px-4'>
        <h2 className='text-normal font-chirp-bold text-pri mb-7 max-[500px]:hidden'>
          Inicio
        </h2>
        <div className='fill-primary flex justify-center mb-6'>
          <Twitter size={25} />
        </div>
        <div className='text-base flex justify-around'>
          <div>
            <h3 className='mb-2 text-center font-chirp-bold text-pri'>
              Para ti
            </h3>
            <div className='h-1 rounded bg-primary w-14' />
          </div>
          <div>
            <h3 className='text-secondary'>Siguiendo</h3>
          </div>
        </div>
      </div>
      <div className='border-[#2f3336] pb-2 pt-5 px-4 border-y-[1.5px]'>
        {/* <h2 className='mb-3'>¿Qué estas pensando?</h2> */}
        <form
          className='pl-[62px] break-words whitespace-pre-wrap'
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* {!user && (
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
          )} */}
          <textarea
            placeholder='¿Qué está pasando?'
            className='outline-none w-full h-[52px] resize-none text-pri text-normal bg-black placeholder:text-normal placeholder:text-secondary'
            {...register('description', {
              required: true,
              maxLength: 300,
            })}
          ></textarea>
          {selectedImage && (
            <div className='mb-2 relative'>
              <span
                onClick={() => setSelectedImage(null)}
                className='absolute cursor-pointer leading-5 text-[17px] top-[5px] left-[5px] backdrop-blur-sm py-[5px] px-[10.5px] bg-[#0f1419bf] rounded-[50%]'
              >
                &times;
              </span>
              <img
                className='rounded-2xl w-full'
                src={URL.createObjectURL(selectedImage)}
                alt='upload image'
              />
            </div>
          )}
          {errors.description?.type === 'required' && (
            <p className='absolute text-xs text-red-700'>Obligatorio</p>
          )}
          {errors.description?.type === 'maxLength' && (
            <p className='absolute text-xs text-red-700'>
              Maximo 300 caracteres
            </p>
          )}
          <div className='flex justify-between items-center'>
            <div className='flex gap-1'>
              <div className='hover:bg-imageHover rounded-[50%] w-[34px] h-[34px] flex items-center justify-center'>
                <label htmlFor='submit' className='cursor-pointer'>
                  <Images />
                </label>
                <input
                  className='hidden'
                  id='submit'
                  type='file'
                  onChange={(e) => {
                    if (e.target.files?.length) {
                      setSelectedImage(e.target.files[0])
                    }
                  }}
                />
              </div>
              <div className='flex items-center justify-center w-[34px] h-[34px]'>
                <Gift />
              </div>
              <div className='flex items-center justify-center w-[34px] h-[34px]'>
                <Survey />
              </div>
              <div className='flex items-center justify-center w-[34px] h-[34px]'>
                <Emoji />
              </div>
              <div className='flex items-center justify-center w-[34px] h-[34px]'>
                <Program />
              </div>
              <div className='flex items-center justify-center w-[34px] h-[34px]'>
                <Ubication />
              </div>
            </div>
            <div>
              <button className=' bg-[#0e4e78] text-base font-chirp-bold py-[6px] px-3 text-[#808080] rounded-[18px] w-[95px] hover: duration-200 ease-linear'>
                {isLoading ? (
                  <Loader h='h-6' w='w-6' color='fill-white' />
                ) : (
                  'Twittear'
                )}
              </button>
            </div>
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
