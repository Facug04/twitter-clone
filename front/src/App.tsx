import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { onAuthStateChanged, User } from 'firebase/auth'

import Nav from './components/Nav'
import Posts from './components/Posts'
import AddPost from './components/AddPost'
import { auth } from './helpers/firebase'
import Trending from './components/Trending'

export default function App() {
  const [userExist, setUserExist] = useState<undefined | boolean>(undefined)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [filters, setFilter] = useState({ order: 'desc', filter: 'createdAt' })
  const [name, setName] = useState(() => {
    const saveName = window.localStorage.getItem('username')
    if (!saveName) return { username: '', isReady: false }
    return JSON.parse(saveName)
  })

  useEffect(() => {
    if (name.isReady) {
      window.localStorage.setItem('username', JSON.stringify(name))
    }
  }, [name])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
        setUserExist(true)
        setCurrentUser(user)
      } else setUserExist(false)
    })
  }, [])

  const onChangeFilters = (order: string, filter = 'createdAt') => {
    setFilter({ ...filters, order: order, filter: filter })
  }

  return (
    <div className='text-white'>
      <Routes>
        {/* <Route path='/' element={<Games />} /> */}
        <Route
          path='/'
          element={
            <div className='flex max-w-[1220px] mx-auto'>
              <div className='w-[250px]'>
                <Nav
                  name={name}
                  changeName={(newName: string, isReady: boolean) =>
                    setName({ username: newName, isReady })
                  }
                  user={userExist}
                  currentUser={currentUser}
                />
              </div>
              <div className='w-[605px]'>
                <AddPost
                  name={name}
                  user={userExist}
                  currentUser={currentUser}
                />
                <Posts
                  filters={filters}
                  idUser={currentUser?.uid}
                  onChangeFilters={onChangeFilters}
                  username={currentUser?.displayName}
                />
              </div>
              <div className='flex-growWidth pl-8 h-fit sticky top-0'>
                <Trending />
              </div>
            </div>
          }
        />
        {/* <Route path='/game/:id' element={<Detail />} /> */}
        {/* <Route path="*" component={NotFound} /> */}
      </Routes>
    </div>
  )
}
