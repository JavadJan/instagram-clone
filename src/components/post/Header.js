import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
export const Header = ({ username }) => {
    return (
        <div className='flex border border-stone-300 h-3 p-4 py-8'>
            <div className='flex items-content'>
                <Link to={`/p/${username}`} className="flex items-center">
                    <img src={`/images/avatars/${username}.jpg`} alt="" className='rounded-full h-8 w-8 flex mr-3'/>
                    <p className='font-bold'>{username}</p>
                </Link>
            </div>
        </div>
    )
}

Header.propTypes = {
    username: PropTypes.string.isRequired
}
