import { useState } from 'react'
import { User } from 'firebase/auth'

import More from './icons/More'
import img from '/user-icon.png'
import ProfileModal from './ProfileModal'

type Props = {
  currentUser: User | null
  name: { username: string; isReady: boolean }
  user: boolean | undefined
  changeName: (newName: string, isReady: boolean) => void
}

export default function NavProfile({
  currentUser,
  name,
  user,
  changeName,
}: Props) {
  const [modal, setModal] = useState(false)
  const submitName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name.username.length <= 15 && name.username.length >= 1) {
      changeName(name.username, true)
      setModal(false)
    }
  }

  return (
    <>
      {modal && name.isReady && (
        <ProfileModal
          changeModal={() => setModal(false)}
          manageName={() => changeName(name.username, false)}
          user={user}
          currentUser={currentUser}
        />
      )}
      <div
        onClick={() => setModal(true)}
        className='max-[1265px]:hidden flex w-fit px-3 gap-1 py-3 items-center hover:bg-profileHover hover:rounded-full duration-100 ease-linear cursor-pointer'
      >
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
          {user ? (
            <div>
              <h3 className='font-chirp-bold text-pri text-[15px]'>
                {currentUser?.displayName}
              </h3>
              <h4 className='text-secondary text-[15px]'>
                {currentUser?.displayName}
              </h4>
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
                className='bg-transparent text-pri font-chirp-bold placeholder:font-chirp-bold mb-1 placeholder:text-[15px] w-[130px] outline-none border-primary border-b-2'
                placeholder='Escribe tu nombre'
              />
              <button className='bg-primary text-pri px-2 rounded-lg font-chirp-bold'>
                Enviar
              </button>
            </form>
          )}
        </div>
        {/* <div
        onClick={() => {
          if (!currentUser) {
            changeName(name.username, false)
          }
        }}
        className={`${!currentUser && 'cursor-pointer'}`}
      > */}
        <More />
        {/* </div> */}
      </div>
    </>
  )
}
