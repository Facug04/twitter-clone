import { useState } from 'react'
import { User } from 'firebase/auth'

import More from './icons/More'
import img from '/user-icon.png'
import SesionMobile from './SesionMobile'

type Props = {
  currentUser: User | null
  name: { username: string; isReady: boolean }
  user: boolean | undefined
  changeName: (newName: string, isReady: boolean) => void
}

export default function Username({
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
    <div className='fixed mb-14 min-[505px]:mb-2 min-[1265px]:hidden flex justify-end bottom-0 z-[200] max-[505px]:w-full max-[600px]:w-[calc(100%-60px)] max-[695px]:w-[calc(100%-88px)]  min-[1266px]:w-[605px] max-[1265px]:w-[598px]'>
      <div
        onClick={() => setModal(true)}
        className={`flex max-[695px]:mr-2 relative bg-black border-[#2f3336] border-[1.5px] w-fit px-3 gap-5 py-3 items-center ${
          !modal && 'hover:bg-[#e7e9ea1a]'
        } rounded-full duration-100 ease-linear cursor-pointer`}
      >
        {modal && name.isReady && (
          <SesionMobile
            changeModal={() => setModal(false)}
            manageName={() => changeName(name.username, false)}
            user={user}
            currentUser={currentUser}
          />
        )}
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
    </div>
  )
}
