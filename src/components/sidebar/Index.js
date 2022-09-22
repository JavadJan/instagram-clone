import React,{memo} from 'react'
import { useUser } from '../../hooks/use-user'
import { Suggestions } from './Suggestions'
import {User} from './User'

const Sidebar = () => {
  const{ user:{username ,fullName , userId, following, id}} = useUser()
  // console.log('x', ur.user.username , ur.user.fullName,ur.user.userId,ur.user.id , ur.user.following)
  console.log('userLogged:',username,id, fullName, userId,following)
  return (
    <div className='mr-3'>
      <User username={username} fullName={fullName}/>
      <Suggestions userId={userId} following={following} loggedUserIdDoc={id}/>
    </div>
  )
}
export default memo(Sidebar)
User.whyDidYouRender = true
