import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import firebaseContext from '../context/firebase'
// import { auth } from '../lib/firebase'
import * as ROUTES from '../constants/Routes'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const Login = () => {
  const navigate = useNavigate()
  console.log(navigate)
  const { db, auth } = useContext(firebaseContext)
  const [password, setPassword] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [error, setError] = useState('')
  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = async (event) => {
    event.preventDefault();
    // const navigate = useNavigate();

    console.log('try to auth!')
    await signInWithEmailAndPassword(auth, emailAddress, password)
      .then((userConditional) => {
        navigate(ROUTES.DASHBOARD)
        console.log(userConditional.user)
      }).catch((error) => {
        setEmailAddress('');
        setPassword('');
        console.log(error.message)
        setError(error.message)
      })
  }
  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">

      <div className="flex w-3/5">
        <img src="./images/iphone-with-profile.png" alt="iphone" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col gap-8 items-center bg-white p-4 border border-gray-primary mb-4">
          <h1 className="flex justify-center w-full">
            <img src="./images/logo.png" alt="" className='my-2 wx-612' />
          </h1>
          {error && <p className="mb-4 text-base text-red-500">{error}</p>}

          <form onSubmit={handleLogin} method="POST">
            <input
              aria-label='Enter Your Email'
              type="emailAddress"
              placeholder='Enter email address'
              className='text-sm text-gray-primary w-full mr-3 py-5 px-4 h-2 border rounded mb-2 border-gray-300'
              onChange={({ target }) => { setEmailAddress(target.value) }} />
            <input
              aria-label='Enter Your Password'
              type="password"
              placeholder='Enter password'
              className='text-sm text-gray-primary w-full mr-3 py-5 px-4 h-2 border rounded mb-2 border-gray-300'
              onChange={({ target }) => { setPassword(target.value) }} />

            <button disabled={isInvalid} type="submit"
              className={`bg-blue-500 w-full rounded text-white h-8 font-bold ${isInvalid && 'opacity-50'} `} >Log In</button>
          </form>
        </div>
        <div className='flex items-center justify-center w-full py-5 pc-4 h-2 border border-gray-primary mb-2 text-sm'>
          <p className='text-sm'>Don't you have an account? {' '}
            <Link to={ROUTES.Sign_Up} className="font-bold text-blue-500">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
