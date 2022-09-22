import React from 'react'
import { Header } from '../components/Header'
import  Sidebar  from '../components/sidebar/Index'
import { Timeline } from '../components/Timeline'

export const Dashboard = () => {
  return (
    <div className=''>
      <Header />
      <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
        <Timeline />
        <Sidebar />
      </div>
    </div>
  )
}
