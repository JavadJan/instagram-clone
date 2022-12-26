import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatDistance } from 'date-fns'
import { AddComment } from './Add-comment'

export const Comments = ({ comments: allComments, posted, docId, commentInput }) => {
    const [comments, setComments] = useState(allComments)
    console.log('comments all: ', comments)

    
    return (
        <>
            <div className='p-4 pt-1 pb-4'>
                {
                    comments.length >= 2 && (
                        <p className='text-sm text-gray-500 mb-1 cursor-pointer'>
                            view all {comments.length} comment
                        </p>
                    )
                }

                {
                    comments.slice(0, 5).map((item ,index) => (
                        <p key={index} className="mb-1">
                            <Link to={`/p/${item.displayName}`}>
                                <span className='mr-1 font-bold'>{item.displayName}</span>
                            </Link>
                            <span>{item.comment}</span>
                        </p>
                    ))
                }

                <p className='text-gray-500 uppercase text-xs mt-2'>{formatDistance(posted, new Date())} ago</p>
                <AddComment
                    docId={docId}
                    commentInput={commentInput}
                    comments={allComments}
                    setComments={setComments}
                />
            </div>
        </>
    )
}

Comments.propTypes = {
    commentInput: PropTypes.object.isRequired,
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    posted: PropTypes.number.isRequired
}

