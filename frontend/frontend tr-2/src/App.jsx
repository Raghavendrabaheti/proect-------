import React from 'react'
import Signup from './pages/Signup'
import { Routes,Route } from 'react-router-dom'
import { Toaster } from 'sonner'; 
import { useSelector } from 'react-redux';
const App = () => {
  // const { count } = useSelector((state) => {
  //   console.log(state.count);
  //   state.count
  // });

  return (
    <div>
      {/* <p>count:{count}</p> */}
      <button>Increament</button>
      <button>Decreament</button>
      <Routes>
        <Route path='/register' element={<Signup />} />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;