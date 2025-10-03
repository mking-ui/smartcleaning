'use client'
import Navbar from '@/components/cleaner/Navbar'
import SideBar from '@/components/cleaner/Sidebar'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className='flex w-full'>
        <SideBar />
        {children}
      </div>
    </div>
  )
}

export default Layout