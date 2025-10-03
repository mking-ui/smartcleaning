'use client'
import Navbar from '@/components/report/Navbar'
import SideBar from '@/components/report/Sidebar'
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