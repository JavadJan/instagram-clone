import React,{memo} from 'react'
import { useUser } from '../../hooks/use-user'
import { Suggestions } from './Suggestions'
import {User} from './User'

const Sidebar = () => {
  const{ user:{username , fullName,userId,id ,following}} = useUser()
  console.log('x',username , fullName,userId,id ,following)
  console.log('userLogged:' ,id)
  
  return (
    <div className='mr-3'>
      <User username={username} fullName={fullName}/>
      <Suggestions userId={userId} following={following} loggedUserIdDoc={id}/>
    </div>
  )
}
export default memo(Sidebar)
User.whyDidYouRender = true
