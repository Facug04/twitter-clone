import { User, GoogleAuthProvider } from 'firebase/auth'

import { singInGoogle, logOut } from '../helpers/firebase'
import Arrow from './icons/Arrow'

type Props = {
  changeModal: () => void
  manageName: () => void
  user: boolean | undefined
  currentUser: User | null
}

export default function SesionMobile({
  changeModal,
  manageName,
  user,
  currentUser,
}: Props) {
  const handleClick = async () => {
    const googleProvider = new GoogleAuthProvider()
    await singInGoogle(googleProvider)
    changeModal()
  }

  const handleSesion = async () => {
    await logOut()
    changeModal()
    window.location.reload()
  }

  const editName = () => {
    manageName()
    changeModal()
  }

  return (
    <div onClick={changeModal} className='absolute top-[-140px] left-[-95px]'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='w-[250px] relative bg-black rounded-2xl py-4 shadow-profile text-[15px] text-pri font-chirp-heavy'
      >
        <div className='flex items-center justify-center absolute right-[-1px] top-[-3px]'>
          <button
            onClick={changeModal}
            className='py-[3px] px-[10px] text-xl rounded-[50%] hover:bg-[#eff3f41a] duration-200 ease-linear text-[#EFF3F4]'
          >
            &times;
          </button>
        </div>
        {user ? (
          <div
            onClick={handleSesion}
            className='py-3 px-4 hover:bg-[#16181C] cursor-pointer duration-200 ease'
          >
            <p>Cerrar la sesión de @{currentUser?.displayName}</p>
          </div>
        ) : (
          <>
            <div
              onClick={handleClick}
              className='py-3 px-4 hover:bg-[#16181C] cursor-pointer duration-200 ease'
            >
              <p>Iniciar Sesión o Registrarse</p>
            </div>
            <div
              onClick={editName}
              className='py-3 px-4 hover:bg-[#16181C] cursor-pointer duration-200 ease'
            >
              <p>Editar nombre</p>
            </div>
          </>
        )}
      </div>
      <div className='absolute bottom-[-11px] left-[150px]'>
        <Arrow />
      </div>
    </div>
  )
}
