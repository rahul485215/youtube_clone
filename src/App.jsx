import React, { useState } from 'react'
import NavBar from './Components/Navbar/NavBar'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/video/Video'

const App = () => {

  const [sidebar, setSideBar] = useState(true)

  return (
    <div>
      <NavBar setSideBar={setSideBar} />
      <Routes>
       <Route path='/' element={<Home sidebar={sidebar} />} />
       <Route path ='/video/:categoryId/:videoId' element={<Video />} />
      </Routes>
    </div>
  )
}

export default App