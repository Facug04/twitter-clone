import { GoogleAuthProvider, User } from 'firebase/auth'
import { Link } from 'react-router-dom'

import { singInGoogle, logOut } from '../helpers/firebase'
import Explore from './icons/Explore'
import Home from './icons/Home'
import Lists from './icons/Lists'
import Loader from './icons/Loader'
import Messages from './icons/Messages'
import More from './icons/More'
import Notifications from './icons/Notifications'
import Options from './icons/Options'
import Profile from './icons/Profile'
import Saved from './icons/Saved'
import Twitter from './icons/Twitter'
import img from '/user-icon.png'

type Props = {
  user: boolean | undefined
  currentUser: User | null
  name: { username: string; isReady: boolean }
  changeName: (newName: string, isReady: boolean) => void
}

export default function Nav({ user, currentUser, name, changeName }: Props) {
  const handleClick = async () => {
    const googleProvider = new GoogleAuthProvider()
    await singInGoogle(googleProvider)
  }

  const handleSesion = async () => {
    await logOut()
    window.location.reload()
  }

  const submitName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    changeName(name.username, true)
  }

  return (
    <header className='fixed w-[250px] flex flex-col justify-between h-full py-3 overflow-y-auto'>
      <nav className='text-[#e7e9ea] w-[215px] text-normal flex flex-col gap-5'>
        <div>
          <Link to='/'>
            <Twitter />
          </Link>
        </div>
        <div className='flex gap-5 items-center'>
          <Home />
          <h2 className='font-chirp-bold '>Inicio</h2>
        </div>
        <div className='flex gap-5 items-center'>
          <Explore />
          <h2>Explorar</h2>
        </div>
        <div className='flex gap-5 items-center'>
          <Notifications />
          <h2>Notificaciones</h2>
        </div>
        <div className='flex gap-5 items-center'>
          <Messages />
          <h2>Mensajes</h2>
        </div>
        <div className='flex gap-5 items-center'>
          <Saved />
          <h2>Guardados</h2>
        </div>
        <div className='flex gap-5 items-center'>
          <Lists />
          <h2>Listas</h2>
        </div>
        <div className='flex gap-5 items-center'>
          <Profile />
          <h2>Perfil</h2>
        </div>
        <div className='flex gap-5 items-center'>
          <Options />
          <h2>Más opciones</h2>
        </div>
        <div>
          <button className='bg-primary text-lg font-chirp-bold py-3 px-3 text-pri rounded-3xl w-full hover: duration-200 ease-linear'>
            Twittear
          </button>
        </div>
        {/* {typeof user === 'undefined' ? (
          <div>
            <Loader h='h-8' w='w-8' color='fill-white' />
          </div>
        ) : user ? (
          <div className='flex gap-2'>
            <div className='w-10 cursor-pointer'>
              <img
                className='rounded-[50%]'
                src={currentUser?.photoURL || img}
                alt='profile-pic'
              />
            </div>
            <button onClick={handleSesion}>Cerrar sesion</button>
          </div>
        ) : (
          <div
            onClick={handleClick}
            className='flex gap-2 px-2 py-[6px] border-2 rounded-lg bg-white cursor-pointer'
          >
            <p className='text-black font-extrabold'>Iniciar sesión</p>
            <svg width='22px' height='22px' viewBox='0 0 256 262'>
              <g>
                <path
                  d='M255.878,133.451 C255.878,122.717 255.007,114.884 253.122,106.761 L130.55,106.761 L130.55,155.209 L202.497,155.209 C201.047,167.249 193.214,185.381 175.807,197.565 L175.563,199.187 L214.318,229.21 L217.003,229.478 C241.662,206.704 255.878,173.196 255.878,133.451'
                  fill='#4285F4'
                ></path>
                <path
                  d='M130.55,261.1 C165.798,261.1 195.389,249.495 217.003,229.478 L175.807,197.565 C164.783,205.253 149.987,210.62 130.55,210.62 C96.027,210.62 66.726,187.847 56.281,156.37 L54.75,156.5 L14.452,187.687 L13.925,189.152 C35.393,231.798 79.49,261.1 130.55,261.1'
                  fill='#34A853'
                ></path>
                <path
                  d='M56.281,156.37 C53.525,148.247 51.93,139.543 51.93,130.55 C51.93,121.556 53.525,112.853 56.136,104.73 L56.063,103 L15.26,71.312 L13.925,71.947 C5.077,89.644 0,109.517 0,130.55 C0,151.583 5.077,171.455 13.925,189.152 L56.281,156.37'
                  fill='#FBBC05'
                ></path>
                <path
                  d='M130.55,50.479 C155.064,50.479 171.6,61.068 181.029,69.917 L217.873,33.943 C195.245,12.91 165.798,0 130.55,0 C79.49,0 35.393,29.301 13.925,71.947 L56.136,104.73 C66.726,73.253 96.027,50.479 130.55,50.479'
                  fill='#EB4335'
                ></path>
              </g>
            </svg>
          </div>
        )} */}
      </nav>
      <div className='flex w-fit px-3 gap-5 py-3 items-center hover:bg-profileHover hover:rounded-full duration-100 ease-linear'>
        <div className='flex gap-2 items-center'>
          <div className='w-10 h-10 items-center flex justify-center'>
            {currentUser?.photoURL ? (
              <img
                className='w-10 h-10 rounded-[50%]'
                src={currentUser?.photoURL}
              />
            ) : (
              <img className='w-8 h-8' src={img} />
            )}
          </div>
          {currentUser ? (
            <div>
              <h3 className='font-chirp-bold text-pri text-[15px]'>
                Facundo Gonzalez
              </h3>
              <h4 className='text-secondary text-[15px]'>@Facug03</h4>
            </div>
          ) : name.isReady ? (
            <div>
              <h3 className='font-chirp-bold text-pri text-[15px]'>
                {name.username}
              </h3>
              <h4 className='text-secondary text-[15px]'>@{name.username}</h4>
            </div>
          ) : (
            <form onSubmit={submitName}>
              <input
                value={name.username}
                name='username'
                onChange={(e) => {
                  changeName(e.target.value, false)
                }}
                className='bg-transparent font-chirp-bold placeholder:font-chirp-bold mb-1 placeholder:text-[15px] w-[130px] outline-none border-primary border-b-2'
                placeholder='Escribe tu nombre'
              />
              <button className='bg-primary px-2 rounded-lg font-chirp-bold'>
                Enviar
              </button>
            </form>
          )}
        </div>
        <div
          onClick={() => {
            if (!currentUser) {
              changeName(name.username, false)
            }
          }}
          className={`${!currentUser && 'cursor-pointer'}`}
        >
          <More />
        </div>
      </div>
    </header>
  )
}
