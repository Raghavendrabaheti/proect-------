import React from 'react'
import Signup from './pages/Signup'
import { Routes,Route } from 'react-router-dom'
import { Toaster } from 'sonner'; 
import { useSelector, useDispatch } from 'react-redux';
import { increment,decrement } from './redux/counterSlice';

export default function App() {
  const dispatch = useDispatch();
  const {count} = useSelector((state) => state.count);
  // console.log(state.count.count)

  const handleIncreament = () => {
    dispatch(increment());
  }
  const handleDecreament = () => {
    dispatch(decrement());
  }

  return (
    <div>
      {/* <p>count:{count}</p>
      <button onClick={handleIncreament}>Increament</button>
      <button onClick={() => dispatch(decrement())}>Decreament</button> */}
      <Routes>
        <Route path='/register' element={<Signup />} />
      </Routes>
      <Toaster position="bottom-right" />
    </div>
  );
}

//NOTE keywords in react-redux and @reduxtoolkit
//actions => actions are the javascript object which have type and payload property

//reducers => takes the previous state and returns new state

//useDispatch
//createSlice => it generally a function which manages the reducers and actions 

//store => store is like a container which have all the state we are using in our project

//initialState => initial value of the some value which is going to change

//useSelector
//provider