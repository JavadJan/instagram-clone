import React, { useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Header } from './Header'
import { getUserById, getUserPhotosByUserId } from '../../services/firebase'
import { Photos } from './Photos'
import Skeleton from 'react-loading-skeleton'

export const UserProfile = ({ currentUser }) => {
  const reducer = (state, newState) => ({ ...state, ...newState })
  const initialState = {
    profile: {},
    photoCollection: [],
    followerCount: 0
  }

  console.log(currentUser.userId)
  //dispatch do update the initialState
  //reducer => a reduce function action on initialState
  const [{ profile, photoCollection, followerCount }, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      await getUserPhotosByUserId(currentUser.userId).then((photos) => {
        console.log('dispatch foto:', photos, currentUser.userId, currentUser)

        dispatch({ profile: currentUser, photoCollection: photos , followerCount: currentUser.followers.length })
      })
      //photoCollection => those users who are in photos collection
      //profile => how is logged in? 
      //those is follow 
    }


     getProfileInfoAndPhotos() 
  }, [currentUser])
  return (

    <>
      {currentUser && <Header photosCount={photoCollection.length ? photoCollection.length : 0}
        profile={currentUser}
        followerCount={followerCount}
        setFollowCount={dispatch}
        pro={profile}
      /> }
      {/* ? (<Skeleton width={600} height={400} className='mb-3' count={3}/>): */}
      <Photos photos={photoCollection} />
    </>
  )
}
