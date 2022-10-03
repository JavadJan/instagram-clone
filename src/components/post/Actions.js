import { useContext, useState } from 'react'
import UserContext from '../../context/userContext'
import firebaseContext from '../../context/firebase'
import PropTypes from 'prop-types'
import { arrayRemove, arrayUnion, collection, doc, updateDoc, where } from 'firebase/firestore'
export const Actions = ({ docId, totalLikes, likedPhoto, handleFocus }) => {

    const { user: { uid: userId = "" } } = useContext(UserContext)
    const { db } = useContext(firebaseContext)
    const [toggleLiked, setToggleLiked] = useState(likedPhoto)
    const [Likes, setLikes] = useState(totalLikes)

    const handleToggleLike = async () => {
        setToggleLiked((toggleLike) => !toggleLike)
        //update likes array from firebase
        await updateDoc(doc(db, 'photos', docId), {
            likes: toggleLiked ? arrayRemove(userId) : arrayUnion(userId)
        })
        console.log('toggle liked: ', toggleLiked)

        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1))
    }
    return (
        <>
            <div className='flex justify-content p-4'>
                <div className='flex'>
                    <svg
                        onClick={handleToggleLike}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleToggleLike();
                            }
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        tabIndex={0}
                        className={`w-8 mr-4 select-none cursor-pointer focus:outline-none ${toggleLiked ? 'fill-red-500 text-red-500' : 'text-black-50'
                            }`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                    <svg
                        onClick={handleFocus}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleFocus();
                            }
                        }}
                        className="w-8 text-black-500 stroke-1	 select-none cursor-pointer focus:outline-none"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        tabIndex={0}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                </div>
            </div>

            <div className='p-4 py-0'>
                <p className='font-bold'>{Likes === 1
                    ? `${Likes} likes` : `${Likes} likes`}</p>
            </div>
        </>
    )
}
Actions.propTypes = {
    docId: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    likedPhoto: PropTypes.bool.isRequired,
    handleFocus: PropTypes.func.isRequired
}
