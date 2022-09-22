import React from 'react'
import PropTypes  from 'prop-types'
export const Image = ({src , caption}) => {
  return (
    <img src={src} alt={caption} />
  )
}

Image.prototype={
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired
}