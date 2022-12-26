import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { doesUsernameExist} from '../services/firebase'
import * as ROUTES from '../constants/Routes'
import { Header } from '../components/Header'
import { UserProfile } from '../components/profile';
import { useUser } from '../hooks/use-user';
import UserContext from '../context/userContext';
import Skeleton from 'react-loading-skeleton'


export const Profile = () => {
    //useParams will help you to pull out username from url
    const { username } = useParams()
    const [userExist, setUserExist] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    //useEffect is sensitive to user and rendering page/by changing and rendering page all the code line inside of useEffect will execute again
    //if user does not exist the page will lead to not-found page
    console.log('params:', username, user)
    useEffect(() => {
        async function checkingUserExist() {
            console.log('check function is running!')
            await doesUsernameExist(username).then((user) => {
                setCurrentUser(user[0])
                setUserExist(true)
                console.log('this is user who clicked on it =====>:', user)

            }, (err) => {
                setUserExist(false)
                setCurrentUser(null)
                console.log('something went wrong!')
                //if the user is not logged 

            })



        }
        //every time this page loaded(rendered this checkingUserExist() function will execute that new user exit or not)

        checkingUserExist()

    }, [username, navigate])

    return user ? (
        <div>
            <Header />
            <div className='mx-auto max-w-screen-lg'>
                {currentUser && <UserProfile currentUser={currentUser} />}
            </div>
        </div>
    )
        : (navigate(ROUTES.Not_Found))
}
