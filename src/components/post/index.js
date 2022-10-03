import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Header } from './Header'
import { Image } from './Image'
import { Actions } from './Actions'
import { Footer } from './Footer'
import { Comments } from './Comments'


export const Post = ({ content }) => {
  //components -> header, image, actions (like , comments icons), footer, comments
  const commentInput = useRef(null)
  
  //focus on like icon
  const handleFocus = () => commentInput.current.focus();

  return (
    <div className='rounded col-span-4 border bg-white border-stone-50 mb-8'>
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        likedPhoto={content.userLikedPhoto}
        comments={content.comments}
        docId={content.id}
        totalLikes={content.likes.length}
        handleFocus={handleFocus} />
      <Footer caption = {content.caption} username={content.username}/>
      <Comments 
      posted={content.dateCreated} 
      comments={content.comments} 
      docId={content.id} 
      commentInput={commentInput}/>

      
    </div>
  )
}

Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired,
    caption: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    comments: PropTypes.array.isRequired,
    dataCreated: PropTypes.number
  })
}