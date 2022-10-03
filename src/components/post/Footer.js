import React from 'react'
import PropTypes from 'prop-types'
export const Footer = ({caption , username}) => {
  return (
    <div>
        <span className='p-4 pt-2 pb-0 font-bold'>{username}</span>
        <span>{caption}</span>
    </div>
  )
}

Footer.propTypes = {
    caption: PropTypes.string,
    username: PropTypes.string,
    handleFocus: PropTypes.func
    
}
