import React from 'react'
import Skeleton from 'react-loading-skeleton'

import { usePhotos } from '../hooks/use-photos'
import { Post } from './post'

export const Timeline = () => {

  //we need to logged in user's photos (hook)
  //photos is the array of users' photos is followed
  const { photos } = usePhotos()

  return (
    <div className='mx-3 col-span-2'>
      {
        !photos ?
          (
            [...new Array(4)].map((_, index) => (
              <Skeleton
                width={320}
                height={100}
                key={index}
                className='mb-3'
                count={1} />
            ))
          ) : photos?.length > 0 ? (
            photos.map((content , index) => 
            <Post content={content}  key={index}/>
            ))
            : <p className='text-center text-2xl'>follow people to see photo</p>
      }
    </div>
  )
}
