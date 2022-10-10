import {useState , useEffect} from 'react'
import {useParams , useNavigate} from "react-router-dom";
import {doesUsernameExist} from '../services/firebase'
import * as ROUTES from '../constants/Routes'
import { Header } from '../components/Header';
import { UserProfile } from '../components/profile';


export const Profile = () => {
    const {username} = useParams()
    const [userExist , setUserExist] = useState(false)
    const [user , setUser] = useState([])
    const navigate = useNavigate()

    useEffect (()=>{
        async function checkingUserExist() {
            const doesUserExist = await doesUsernameExist(username)
            if (doesUserExist.length>0 ) {
                setUserExist(true)
                setUser(doesUserExist)
            } else {
                setUserExist(false)
                setUser(null)
                navigate(ROUTES.Not_Found)
            }
            
        }
        
        //every time this page leaded(rendered this checking function will execute that new user exit or not)
        checkingUserExist()
    },[username , navigate])
    
    console.log('doesUserExist:', user , userExist)
  return user.length>0 ? (
    <div className='bg-gray-200'>
        <Header/>
        <div className='mx-auto max-w-screen-lg'>
            <UserProfile/>
        </div>
    </div>
  )
  : (<div>nist</div>)
}
