import React from 'react'

import UserProfile from '../features/user/components/UserProfile'
import NavBar from '../features/navbar/Navbar'

const UserprofilePage = () => {
  return (
    <div>
      <NavBar>
        <h1 className='mx-auto text-2xl'>My Profile</h1>
        <UserProfile/>
      </NavBar>
    </div>
  )
}

export default UserprofilePage