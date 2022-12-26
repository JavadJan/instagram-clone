import React from 'react'
import propTypes from 'prop-types'
import { useState } from 'react'
import { useContext } from 'react'
import { useUser } from '../../hooks/use-user'
import { useEffect } from 'react'
import { isUserFollowersProfile, isUserFollowingProfile, ToggleFollow } from '../../services/firebase'
import { useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'


export const Header = ({ photosCount,
  profile: {
    id: profileDocId,
    userId: profileUserId,
    username: profileUsername,
    following: followings,
    followers: followerss,
    fullname: fullName,
  }, followerCount, setFollowCount, pro }) => {

  const { username } = useParams()

  const { user } = useUser()
  const [isFollowingProfile, setIsFollowingProfile] = useState(false)
  const [follow, setFollow] = useState(false)
  const activeBtnFollow = user.username && user.username !== profileUsername

  console.log("photosCount", photosCount, followerCount)
  useEffect(() => {
    const isLoggedUserFollowingProfile = async () => {
      //following
      const isFollowing = await isUserFollowingProfile(user.username, profileUsername)
      setIsFollowingProfile(isFollowing)
      //followers
      // const isFollower = await isUserFollowersProfile(user.followers)
      // console.log('Followers: ', isFollower)
    }

    if (user.username && profileUsername) {
      return () => {
        isLoggedUserFollowingProfile()
      }
    }

  }, [user, profileUsername])

  const handleToggleFollow = async () => {
    setFollow(!follow)
    setFollowCount({
      profile: {},
      photoCollection: [],
      followerCount: follow ? (followerCount === 0 ? followerCount : followerCount - 1) : followerCount + 1
    })
    await ToggleFollow(!follow , user.id , profileDocId , profileUserId , user.userId )
  }
  return (
    <div className='grid grid-cols-3 gap-3 justify-start mx-auto max-w-screen-lg'>
      <div className='container flex justify-center col-span-1'>
        {user.username && <img className='rounded-full h-40 w-40 flex' src={`/images/avatars/${username}.jpg`} alt={`${profileUsername} profile`} />}
      </div>

      <div className='col-span-2 flex items-center justify-center flex-col'>
        <div className='container flex items-center'>
          <p className='text-2xl mr-4'>{profileUsername}</p>
          {
            activeBtnFollow && (
              <button className='bg-blue-500 font-bold text-sm rounded text-white p-2' type='button' onClick={handleToggleFollow}>{follow ? 'unfollow' : 'follow'}</button>
            )
          }
        </div>
        <div className='container flex mt-4'>
          {followerss === undefined || followings === undefined ? (<Skeleton width={677} height={24} />) : (
            <>
              <p className='mr-10'>
                <span className='font-bold'>{photosCount}</span>
                Photos
              </p>
              <p className='mr-10'>
                <span className='font-bold'>{followerCount}</span>
                {followerCount === 1 ? "follower" : "followers"}
              </p>
              <p className='mr-10'>
                <span className='font-bold'>{followings.length}</span>
                {followings.length === 1 ? "following" : "followings"}
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          {!fullName ? <Skeleton width={100} height={24} /> : <p className='font-medium'>
            {profileUsername +' '+ fullName}
          </p>}
        </div>
      </div>
    </div>
  )
}


Header.propTypes = {
  // photoCollection:propTypes.array.isRequired,
  profile: propTypes.shape({
    userId: propTypes.string,
    // docId:PropTypes.string,
    fullname: propTypes.string,
    following: propTypes.array,
    followers: propTypes.array
  }),
  followerCount: propTypes.number,
  setFollowCount: propTypes.func.isRequired,
  photosCount: propTypes.number
}