import React, { useContext } from 'react'
import firebaseContext from '../context/firebase'
import UserContext from '../context/userContext'
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/Routes'
import { signOut } from 'firebase/auth'
export const Header = () => {
    const { user } = useContext(UserContext)
    const { auth } = useContext(firebaseContext)

    console.log(user?.uid, 'uuuuuuuuuuuuuuuuu')
    return (
        <header className='h-16 bg-white border-b border-gray-primary mb-8'>
            <div className="container mx-auto max-w-screen-lg h-full">
                <div className="flex justify-between h-full">
                    <div className="text-gray-700 text-center flex items-center align-items">
                        <h1 className='flex justify-center w-full'>
                            <Link to={ROUTES.DASHBOARD} aria-label="instagram logo">
                                <img src="./images/logo.png" alt="instagram" className='mt-2 w-6/12' />
                            </Link>
                        </h1>
                    </div>
                    <div className='text-gray-700 text-center flex items-center align-items mx-2'>
                        {
                            user ?
                                (
                                    <>
                                        <Link to={ROUTES.DASHBOARD} title="Home">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                            </svg>
                                        </Link>
                                        <button type='button' title='Sign Out' onClick={() => signOut(auth)}
                                            onKeyDown={((event) => {
                                                if (event.key === 'Enter') {
                                                    signOut(auth)
                                                }
                                            })}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                            </svg>

                                        </button>
                                        <div className='flex items-center cursor-pointer'>
                                            <Link to={`/p/${user.displayName}`}>
                                                <img src={`/images/avatars/javad.jpg`} alt={`${user.username} profile`} className="rounded-full h-8 w-8 flex" />
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Link to={ROUTES.Login}>
                                            <button className='bg-blue-500 font-bold text-sm rounded text-white w-20 h-8'>Log In</button>
                                        </Link>
                                        <Link to={ROUTES.Sign_Up}>
                                            <button className='font-bold text-sm rounded text-black w-20 h-8 mx-2' >Sign Up</button>
                                        </Link>
                                    </>
                                )
                        }
                    </div>
                </div>

            </div>
        </header>
    )
}
