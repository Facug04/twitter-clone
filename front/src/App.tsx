import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { onAuthStateChanged, User } from 'firebase/auth'

import Nav from './components/Nav'
import Posts from './components/Posts'
import AddPost from './components/AddPost'
import { auth } from './helpers/firebase'
import Trending from './components/Trending'
import Comments from './components/Comments'
import ScrollToTop from './components/ScrollToTop'
import Username from './components/Username'

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
    <div className='flex min-[1266px]:w-[1220px] min-[1266px]:mx-auto max-[1265px]:justify-center w-full max-[695px]:justify-start max-[505px]:flex-col'>
      <ScrollToTop />
      <div className='min-[1266px]:w-[250px] max-[1265px]:w-[88px]  max-[505px]:w-full max-[1035px]:w-[50px] max-[600px]:w-[60px] max-[985px]:w-[88px] max-[1265px]:flex max-[1265px]:justify-end max-[1035px]:justify-center'>
        <Nav
          name={name}
          changeName={(newName: string, isReady: boolean) =>
            setName({ username: newName, isReady })
          }
          user={userExist}
          currentUser={currentUser}
        />
      </div>
      <div className='min-[1035px]:w-[990px] flex max-[695px]:flex-1'>
        <Routes>
          {/* <Route path='/' element={<Games />} /> */}
          <Route
            path='/'
            element={
              <div className='max-[695px]:w-full min-[1266px]:w-[605px] max-[1265px]:w-[598px]'>
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
                <Username
                  currentUser={currentUser}
                  name={name}
                  user={userExist}
                  changeName={(newName: string, isReady: boolean) =>
                    setName({ username: newName, isReady })
                  }
                />
              </div>
            }
          />
          <Route
            path=':name/status/:id'
            element={
              <div className='max-[695px]:w-full min-[1266px]:w-[605px] max-[1265px]:w-[598px]'>
                <Comments
                  idUser={currentUser?.uid}
                  actualUser={currentUser?.displayName}
                  image={currentUser?.photoURL}
                />
                <Username
                  currentUser={currentUser}
                  name={name}
                  user={userExist}
                  changeName={(newName: string, isReady: boolean) =>
                    setName({ username: newName, isReady })
                  }
                />
              </div>
            }
          />
          {/* <Route path='/game/:id' element={<Detail />} /> */}
          {/* <Route path="*" component={NotFound} /> */}
        </Routes>
        <div className='min-[1077px]:flex-growWidth pl-8 h-fit sticky top-0 max-[1078px]:pl-5 max-[985px]:hidden'>
          <Trending />
        </div>
      </div>
    </div>
  )
}
