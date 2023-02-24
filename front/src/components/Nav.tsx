import { GoogleAuthProvider, User } from 'firebase/auth'
import { Link } from 'react-router-dom'

import Explore from './icons/Explore'
import Home from './icons/Home'
import Lists from './icons/Lists'
import Messages from './icons/Messages'
import Notifications from './icons/Notifications'
import Options from './icons/Options'
import Profile from './icons/Profile'
import Saved from './icons/Saved'
import Twittear from './icons/Twittear'
import Twitter from './icons/Twitter'
import NavProfile from './NavProfile'

type Props = {
  user: boolean | undefined
  currentUser: User | null
  name: { username: string; isReady: boolean }
  changeName: (newName: string, isReady: boolean) => void
}

export default function Nav({ user, currentUser, name, changeName }: Props) {
  console.log(user)

  return (
    <header className='fixed max-[505px]:bg-black max-[505px]:bottom-0 max-[505px]:border-[#2f3336] max-[505px]:border-t-[1.5px] max-[505px]:w-full  min-[1266px]:w-[250px] flex flex-col justify-between h-full max-[505px]:h-[50px] py-3 overflow-y-auto z-[100]'>
      <nav className='text-[#e7e9ea] w-[215px] max-[505px]:w-full max-[505px]:justify-evenly max-[505px]:flex-row text-normal flex flex-col gap-5 max-[1265px]:w-[76px] max-[600px]:w-[60px] max-[1035px]:w-[50px] max-[985px]:w-[88px] max-[1265px]:items-center max-[1265px]:gap-8'>
        <div className='max-[505px]:hidden fill-[#d6d9db]'>
          <Link to='/'>
            <Twitter />
          </Link>
        </div>
        <div className='flex gap-5 items-center'>
          <Home />
          <h2 className='font-chirp-bold max-[1265px]:hidden'>Inicio</h2>
        </div>
        <div className='flex gap-5 items-center max-[505px]:hidden'>
          <Explore />
          <h2 className='max-[1265px]:hidden'>Explorar</h2>
        </div>
        <div className='flex gap-5 items-center'>
          <Notifications />
          <h2 className='max-[1265px]:hidden'>Notificaciones</h2>
        </div>
        <div className='flex gap-5 items-center'>
          <Messages />
          <h2 className='max-[1265px]:hidden'>Mensajes</h2>
        </div>
        <div className='flex gap-5 items-center max-[505px]:hidden'>
          <Saved />
          <h2 className='max-[1265px]:hidden'>Guardados</h2>
        </div>
        <div className='flex gap-5 items-center max-[505px]:hidden'>
          <Lists />
          <h2 className='max-[1265px]:hidden'>Listas</h2>
        </div>
        <div className='flex gap-5 items-center'>
          <Profile />
          <h2 className='max-[1265px]:hidden'>Perfil</h2>
        </div>
        <div className='flex gap-5 items-center max-[505px]:hidden'>
          <Options />
          <h2 className='max-[1265px]:hidden'>Más opciones</h2>
        </div>
        <div className='max-[1265px]:w-[50px] max-[505px]:hidden max-[1265px]:h-[50px] max-[1265px]:flex max-[1265px]:items-center max-[1265px]:justify-center max-[1265px]:bg-primary max-[1265px]:rounded-[50%]'>
          <div className='min-[1266px]:hidden'>
            <Twittear />
          </div>
          <button className='bg-primary text-lg font-chirp-bold py-3 px-3 text-pri rounded-3xl w-full hover: duration-200 ease-linear max-[1265px]:hidden'>
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

      <NavProfile
        currentUser={currentUser}
        name={name}
        user={user}
        changeName={changeName}
      />
    </header>
  )
}
