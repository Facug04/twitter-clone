import { GoogleAuthProvider } from 'firebase/auth'

import { singInGoogle } from '../helpers/firebase'

export default function SesionMobile() {
  const handleClick = async () => {
    const googleProvider = new GoogleAuthProvider()
    await singInGoogle(googleProvider)
  }

  return (
    <div className='h-[65px] min-[506px]:hidden bg-black border-[#2f3336] border-t-[1.5px] fixed bottom-0 left-0 w-full z-[200] flex items-center'>
      <div className='text-[15px] font-chirp-bold px-4 grid grid-cols-2 w-full gap-2'>
        <button
          onClick={handleClick}
          className='text-primary py-1.5  border-[#ffffff59] border rounded-3xl'
        >
          Iniciar sesión
        </button>
        <button
          onClick={handleClick}
          className='text-white bg-primary py-1.5 rounded-3xl'
        >
          Regístrate
        </button>
      </div>
    </div>
  )
}
