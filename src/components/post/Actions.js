import {useContext , useState} from 'react'
import UserContext from '../../context/userContext'
import firebaseContext from '../../context/firebase'
import { async } from '@firebase/util'
import { arrayRemove, arrayUnion, collection, doc, updateDoc, where } from 'firebase/firestore'

export const Actions = ({docId , totalLikes , likedPhoto, handleFocus}) => {
    
    const {user:{uid:userId = ""}} = useContext(UserContext)
    const{db}  = useContext(firebaseContext)
    console.log("FieldValue: " , db , userId)

    const[toggleLiked , setToggleLiked] = useState(likedPhoto)
    const[Likes , setLikes] = useState(totalLikes)

    const handleToggleLike = async () =>{
        setToggleLiked((toggleLiked)=> !toggleLiked)
        await updateDoc(doc(db , 'photos' ,docId) , {
            likes : toggleLiked ? arrayRemove(userId): arrayUnion(userId)
        })

        setLikes((likes) => (toggleLiked ? likes-1 :likes +1))
    }
  return (
    <div>
        {/* <ul>
            <li>{like}</li>
            <li>{comments[0].displayName}: {comments[0].comment}</li>
        </ul> */}
    </div>
  )
}
