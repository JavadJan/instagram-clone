import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { updateLoggedInUserFollowing } from '../../services/firebase'
import { updateFollowingUserFollowers } from '../../services/firebase'

export const SuggestedProfile = ({ username, spUserDocId, userIdCurLogged, loggedUserIdDoc, profileId }) => {

    const [followed, setFollowed] = useState(false)
    console.log('username: ', username, "spUserDocId:", spUserDocId, 'userIdCurLogged:', userIdCurLogged, 'loggedUserIdDoc:', loggedUserIdDoc, "profileId: ", profileId)
    async function handleFollowUser() {
        setFollowed(true)
        // firebase: create 2 service(2 functions)
        // update the following array of the current user who logged(in this case)
        // profileId is => docId.userId === user.uid
        await updateLoggedInUserFollowing(loggedUserIdDoc, profileId , true);
        // update the follower array of the user has been followed
        // spUserDocId is => doc.id 
        //userIdCurLogged is => user.uid of user who logged
        await updateFollowingUserFollowers(spUserDocId, loggedUserIdDoc , true)
    }


    return !followed ? (
        <div className='flex flex-row items-center align-items justify-between'>
            <div className='flex justify-between items-center'>
                <img className='rounded-full w-8 flex mr-3' src={`./images/avatars/${username}.jpg`} alt="" />
                <Link to={`./p/${username}`}>
                    <div className="font-bold text-sm">{username}</div>
                </Link>
            </div>
            <button className='text-xs font-bold text-blue-500' type='button' onClick={handleFollowUser}>Follow</button>
        </div>
    ) : null
}

SuggestedProfile.ReactPropTypes = {
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userIdCurLogged: PropTypes.string.isRequired,
    loggedUserIdDoc: PropTypes.string.isRequired,
    spUserDocId: PropTypes.string.isRequired
}
