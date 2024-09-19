import React from 'react'
import Signup from './pages/Signup'
import { Routes,Route } from 'react-router-dom'
const App = () => {
  return (
    <Routes>
      <Route path='/register' element={<Signup />} />
    </Routes>
  )
}

export default App