import { onAuthStateChanged } from 'firebase/auth'
import { useContext, useEffect, useState } from 'react'
// import firebaseContext from '../context/firebase'
import { auth } from '../lib/firebase'

export const UserAuthListener = () => {
    // const { db } = useContext(firebaseContext)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')))

    useEffect(() => {
        const userListener = onAuthStateChanged(auth, (user) => {
            //when user pass authentication phase, here will give a tag that user is logged 
            //user a global state context
            if (user) {
                //signed in
                localStorage.setItem('authUser', JSON.stringify(user))
                setUser(user)
            } else {
                //signed out
                localStorage.removeItem('authUser')
                setUser(null)
            }
        })
        return () => userListener()
    }, [user])

    return { user }
}
