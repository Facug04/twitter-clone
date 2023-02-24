import { GoogleAuthProvider } from 'firebase/auth'
import { useEffect } from 'react'

import { singInGoogle } from '../helpers/firebase'
import CommentColor from './icons/CommentColor'

type Props = {
  changeModal: () => void
  username: string
}

export default function CommentModal({ changeModal, username }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleClick = async () => {
    const googleProvider = new GoogleAuthProvider()
    await singInGoogle(googleProvider)
    changeModal()
    // window.location.reload()
  }

  return (
    <div
      onClick={(e) => {
        e.preventDefault()
        changeModal()
      }}
      className='w-screen h-screen fixed flex justify-center items-center top-0 left-0 bg-[#5b708366] z-[300] cursor-default'
    >
      <div
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        className='max-[600px]:w-full min-[600px]:max-h-[509px] h-full  min-[600px]:w-[600px] bg-black min-[600px]:rounded-2xl'
      >
        <div className='h-[53px] px-1 flex items-center'>
          <button
            onClick={changeModal}
            className='py-1 px-3 text-2xl rounded-[50%] hover:bg-[#eff3f41a] duration-200 ease-linear text-[#EFF3F4]'
          >
            &times;
          </button>
        </div>
        <div className='px-6 min-[420px]:px-4'>
          <div className='h-12 my-4 flex items-center justify-center'>
            <CommentColor />
          </div>
          <div className='max-w-[400px] mx-auto my-8'>
            <p className='text-pri text-[27px] font-chirp-heavy mb-2'>
              Responde para unirte a la conversación.
            </p>
            <p className='text-[#71767b] text-base'>
              Una vez que te unas a Twitter, podrás responder a los Tweets de
              {' ' + username}.
            </p>
          </div>
        </div>
        <div className='max-[420px]:px-6 max-w-[400px] mx-auto flex flex-col gap-4 font-chirp-bold text-lg'>
          <button
            onClick={handleClick}
            className='h-[50px] bg-primary rounded-3xl text-white'
          >
            Iniciar Sesión
          </button>
          <button
            onClick={handleClick}
            className='text-primary h-[50px] border-[#536471] border rounded-3xl'
          >
            Registrate
          </button>
        </div>
      </div>
    </div>
  )
}
