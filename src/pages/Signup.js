import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import firebaseContext from '../context/firebase'
import { auth } from '../lib/firebase'
import * as ROUTES from '../constants/Routes'
// import { async } from '@firebase/util'
// import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doesUsernameExist } from '../services/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'

export const Signup = () => {
    const navigate = useNavigate()
    const { db } = useContext(firebaseContext)
    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [error, setError] = useState('')
    const isInvalid = password === '' || emailAddress === '';

    const handleSignup = async (event) => {
        event.preventDefault();
        //usernameExist is an array 
        const usernameExist = await doesUsernameExist(username)
        // console.log('usernameExist:' , usernameExist)
        if (usernameExist.length === 0) {
            try {
                console.log('usernameDoesNotExist:')
                const createdResult = await createUserWithEmailAndPassword(auth, emailAddress, password)
                    .catch((err) => {
                        setError(err)
                    })

                await updateProfile(createdResult.user, {
                    displayName: username
                })
                addDoc(collection(db, 'users'), {

                    userId: createdResult.user.uid,
                    username: username.toLowerCase(),
                    fullName: fullName.toLowerCase(),
                    password: password,
                    emailAddress: emailAddress.toLowerCase(),
                    following: [],
                    followers:[]
                })

                navigate(ROUTES.DASHBOARD)
            } catch (error) {
                setFullName('')
                setEmailAddress('')
                setPassword('')
                setUsername('')
            }
        } else {
            console.log('usernameExist', usernameExist.map((user) => user.username))
            setError("username is exist!")
        }
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

                    <form onSubmit={handleSignup} method="POST">
                        <input
                            aria-label='Enter Your Email'
                            type="text"
                            placeholder='Username'
                            className='text-sm text-gray-primary w-full mr-3 py-5 px-4 h-2 border rounded mb-2 border-gray-300'
                            value={username}
                            onChange={({ target }) => { setUsername(target.value) }} />

                        <input
                            aria-label='Enter Your Email'
                            type="emailAddress"
                            placeholder='Enter Full Name'
                            className='text-sm text-gray-primary w-full mr-3 py-5 px-4 h-2 border rounded mb-2 border-gray-300'
                            value={fullName}
                            onChange={({ target }) => { setFullName(target.value) }} />

                        <input
                            aria-label='Enter Your Email'
                            type="emailAddress"
                            placeholder='Enter email address'
                            className='text-sm text-gray-primary w-full mr-3 py-5 px-4 h-2 border rounded mb-2 border-gray-300'
                            value={emailAddress}
                            onChange={({ target }) => { setEmailAddress(target.value) }} />


                        <input
                            aria-label='Enter Your Password'
                            type="password"
                            placeholder='Enter password'
                            className='text-sm text-gray-primary w-full mr-3 py-5 px-4 h-2 border rounded mb-2 border-gray-300'
                            value={password}
                            onChange={({ target }) => { setPassword(target.value) }} />

                        <button disabled={isInvalid} type="submit"
                            className={`bg-blue-500 w-full rounded text-white h-8 font-bold ${isInvalid && 'opacity-50'} `} >Sign Up</button>
                    </form>
                </div>
                <div className='flex items-center justify-center w-full py-5 pc-4 h-2 border border-gray-primary mb-2 text-sm'>
                    <p className='text-sm'>Have an account? {' '}
                        <Link to={ROUTES.Login} className="font-bold text-blue-500">Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
