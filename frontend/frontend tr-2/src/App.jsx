import React from 'react'
import Signup from './pages/Signup'
import { Routes,Route } from 'react-router-dom'
import { Toaster } from 'sonner';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/register' element={<Signup />} />
      </Routes>
      <Toaster position="top-right"/>
    </div>
  )
}

export default App