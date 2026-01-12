import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNavbar from '../components/MainHeader'
import MainFooter from '../components/MainFooter'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 transition-colors">
        <MainNavbar/>
        <main className="grow">
            <Outlet/>
        </main>
        <MainFooter/>
    </div>
  )
}

export default MainLayout
