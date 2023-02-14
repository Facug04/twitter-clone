import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { onAuthStateChanged, User } from 'firebase/auth'

import Nav from './components/Nav'
import Posts from './components/Posts'
import AddPost from './components/AddPost'
import { auth } from './helpers/firebase'

export default function App() {
  const [userExist, setUserExist] = useState<undefined | boolean>(undefined)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [filters, setFilter] = useState({ order: 'desc', filter: 'createdAt' })

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
      <Nav user={userExist} currentUser={currentUser} />
      <Routes>
        {/* <Route path='/' element={<Games />} /> */}
        <Route
          path='/'
          element={
            <>
              <AddPost user={userExist} currentUser={currentUser} />
              <Posts
                filters={filters}
                idUser={currentUser?.uid}
                onChangeFilters={onChangeFilters}
                username={currentUser?.displayName}
              />
            </>
          }
        />
        {/* <Route path='/game/:id' element={<Detail />} /> */}
        {/* <Route path="*" component={NotFound} /> */}
      </Routes>
    </div>
  )
}
