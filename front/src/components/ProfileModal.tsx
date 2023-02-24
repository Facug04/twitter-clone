import { User, GoogleAuthProvider } from 'firebase/auth'

import { singInGoogle, logOut } from '../helpers/firebase'
import Arrow from './icons/Arrow'

type Props = {
  changeModal: () => void
  manageName: () => void
  user: boolean | undefined
  currentUser: User | null
}

export default function ProfileModal({
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
    <div
      onClick={changeModal}
      className='w-screen h-screen fixed flex top-0 left-0'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='w-[300px] bg-black rounded-2xl py-3 absolute left-1 bottom-24 shadow-profile text-[15px] text-pri font-chirp-heavy'
      >
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
      <div className='absolute bottom-[86px] left-[140px]'>
        <Arrow />
      </div>
    </div>
  )
}
