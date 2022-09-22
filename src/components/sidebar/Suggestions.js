import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { suggestedUser } from '../../services/firebase'
import PropTypes from 'prop-types';
import { SuggestedProfile } from './Suggested-profile'

export const Suggestions = ({ userId, following, loggedUserIdDoc }) => {
  const [profiles, setProfiles] = useState(null)
  console.log('f:', following)
  useEffect(() => {
    async function suggestedProfiles() {
      //suggestedUser() => get query with pull users who is not followed before and expect of itself
      const response = await suggestedUser(userId, following)
      setProfiles(response)
    }
    if (userId) {
      suggestedProfiles()
    }

  }, [userId])
  return !profiles ?
    (
      <SkeletonTheme highlightColor='bg-slate-100' baseColor='bg-black' borderRadius={90}>
        <p>
          <Skeleton count={10} height={350} className="mt-5 bg-slate-50" />
        </p>
      </SkeletonTheme>
    )
    :
    (profiles.length > 0 ? (
      <div className='rounded flex flex-col'>
        <div className='text-sm flex items-center align-items justify-between mb-2'>
          <p className='font-bold text-black-200'>Suggestion for you</p>
        </div>
        <div className='mt-4 grid gap-4'>
          {
            profiles.map((profile) => (
              <SuggestedProfile
                key={profile.id}
                username={profile.username}
                // with this id users are authenticated then stored as field into doc
                spUserDocId={profile.id}
                userIdCurLogged={userId}
                loggedUserIdDoc={loggedUserIdDoc}
                profileId={profile.userId}/>
            ))
          }
        </div>
      </div>
    ) : null)
}

Suggestions.ReactPropTypes = {
  username: PropTypes.string,
  following: PropTypes.array
}