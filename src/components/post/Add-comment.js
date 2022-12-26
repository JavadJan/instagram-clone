import { useState, useContext } from 'react'
import firebaseContext from '../../context/firebase'
import UserContext from '../../context/userContext'
import PropTypes from 'prop-types'
import { arrayUnion, doc, FieldValue, updateDoc } from 'firebase/firestore'


export const AddComment = ({ docId, comments, setComments, commentInput }) => {
  const [comment, setComment] = useState('')
  const { db } = useContext(firebaseContext)
  const { user: { displayName } } = useContext(UserContext)

  console.log('displayName who put comment:', displayName)

  const handleSubmitComment = (event) => {
    event.preventDefault()
    setComments([{ displayName, comment }, ...comments])
    setComment('')

    //add new comment 'FieldValue' is firestore key
    return updateDoc(doc(db, 'photos', docId), {
      comments: FieldValue.arrayUnion(displayName, comment)
    })
  };

  return <>

    <div className='border-t border-gray-400'>
      <form
        className='flex justify-between pl-0 pr-5'
        action="POST" onSubmit={(event) => comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()}>

        <input type="text"
          aria-label='Add a comment'
          autoComplete='off'
          className='text-sm text-gray-500 w-full mr-3 py-5 px-4'
          name='add-comment'
          placeholder='Add a comment'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          // e.target == {target}
          ref={commentInput}
        />
        <button className={`text-sm font-bold text-blue-500 ${!comment && 'opacity-25'}`}
          type='button' disabled={comment.length < 1} onClick={handleSubmitComment}>Post</button>
      </form>
    </div>
  </>

}

AddComment.prototypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object.isRequired
}
