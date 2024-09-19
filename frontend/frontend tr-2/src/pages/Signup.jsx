import React from 'react'
import {useForm} from 'react-hook-form'
function Signup() {
    const {handleSubmit,register} = useForm()
    console.log(register('name'))
    const onsubmit = (data) => {
        console.log(data)
    }
  return (
    <div>
        <form onSubmit={handleSubmit(onsubmit)}>
            <label htmlFor='Name'>Name</label>
            <input {...register('name')} />
            <label htmlFor='email'>Email</label>
            <input {...register('email')} />
            <label htmlFor='password'>Password</label>
            <input {...register('password')} />
            <button type='Sumbit'>Signup</button>
            <button type='reset'>Reset</button>
        </form>
    </div>
  )
}

export default Signup