import React,{useRef} from 'react'
import PropTypes  from 'prop-types'
import { Header } from './Header'
import { Image } from './Image'
import { Actions } from './Actions'


export const Post = ({content}) => {
    //components -> header, image, actions (like , comments icons), footer, comments
  return (
    <div className='rounded col-span-4 border bg-white border-stone-50 mb-8'>
        <Header username={content.username}/>
        <Image src={content.imageSrc} caption={content.caption}/>
        <Actions like={content.likes} comments={content.comments}/>
    </div>
  )
}

Post.propTypes={
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